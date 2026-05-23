from csv import DictReader
from datetime import datetime
from html import escape
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from os import environ
from pathlib import Path
from sqlite3 import connect
from urllib.parse import parse_qs, urlparse


PORT = int(environ.get("PORT", "8080"))
ROOT = Path(__file__).resolve().parent
DATABASE_FILE = Path(environ.get("DATABASE_FILE", ROOT / "vedanix_submissions.db"))
LEGACY_SUBMISSIONS_FILE = ROOT / "submissions.csv"
ADMIN_PASSWORD = environ.get("ADMIN_PASSWORD", "vedanix2026")

FIELDS = [
    "submitted_at",
    "name",
    "mobile",
    "whatsapp",
    "email",
    "business_name",
    "business_type",
    "state",
    "service",
    "other_service",
    "requirements",
]


def init_database():
    with connect(DATABASE_FILE) as database:
      database.execute(
          """
          CREATE TABLE IF NOT EXISTS submissions (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              submitted_at TEXT NOT NULL,
              name TEXT NOT NULL,
              mobile TEXT NOT NULL,
              whatsapp TEXT NOT NULL,
              email TEXT NOT NULL,
              business_name TEXT NOT NULL,
              business_type TEXT NOT NULL,
              state TEXT NOT NULL,
              service TEXT NOT NULL,
              other_service TEXT,
              requirements TEXT NOT NULL
          )
          """
      )
      database.commit()


def import_legacy_csv_once():
    marker = ROOT / ".csv_imported"

    if marker.exists() or not LEGACY_SUBMISSIONS_FILE.exists():
        return

    with LEGACY_SUBMISSIONS_FILE.open("r", encoding="utf-8", newline="") as file:
        rows = list(DictReader(file))

    if not rows:
        marker.write_text("no rows", encoding="utf-8")
        return

    with connect(DATABASE_FILE) as database:
        for row in rows:
            database.execute(
                """
                INSERT INTO submissions (
                    submitted_at, name, mobile, whatsapp, email,
                    business_name, business_type, state, service,
                    other_service, requirements
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                tuple(row.get(field, "") for field in FIELDS),
            )

        database.commit()

    marker.write_text("imported", encoding="utf-8")


class VedanixFormHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        route = urlparse(self.path)

        if route.path == "/":
            self.path = "/index.html"
            super().do_GET()
            return

        if route.path == "/admin":
            self._send_admin_page(route.query)
            return

        if route.path == "/download-submissions.csv":
            self._send_csv_download(route.query)
            return

        super().do_GET()

    def do_POST(self):
        if self.path != "/submit":
            self.send_error(404, "Not found")
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length).decode("utf-8")
        parsed = parse_qs(raw_body)

        submission = {
            "submitted_at": datetime.now().isoformat(timespec="seconds"),
            "name": self._value(parsed, "name"),
            "mobile": self._value(parsed, "mobile"),
            "whatsapp": self._value(parsed, "whatsapp"),
            "email": self._value(parsed, "email"),
            "business_name": self._value(parsed, "business_name"),
            "business_type": self._value(parsed, "business_type"),
            "state": self._value(parsed, "state"),
            "service": self._value(parsed, "service"),
            "other_service": self._value(parsed, "other_service"),
            "requirements": self._value(parsed, "requirements"),
        }

        self._save_submission(submission)
        self.send_response(303)
        self.send_header("Location", "/thank-you.html")
        self.end_headers()

    def _value(self, parsed, key):
        return parsed.get(key, [""])[0].strip()

    def _is_admin_allowed(self, query):
        params = parse_qs(query)
        return params.get("password", [""])[0] == ADMIN_PASSWORD

    def _save_submission(self, submission):
        with connect(DATABASE_FILE) as database:
            database.execute(
                """
                INSERT INTO submissions (
                    submitted_at, name, mobile, whatsapp, email,
                    business_name, business_type, state, service,
                    other_service, requirements
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                tuple(submission[field] for field in FIELDS),
            )
            database.commit()

    def _get_submissions(self):
        with connect(DATABASE_FILE) as database:
            database.row_factory = lambda cursor, row: dict(
                zip([column[0] for column in cursor.description], row)
            )
            return database.execute(
                "SELECT * FROM submissions ORDER BY id DESC"
            ).fetchall()

    def _send_admin_page(self, query):
        if not self._is_admin_allowed(query):
            self._send_html(
                """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Vedanix Admin</title>
                  <style>
                    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Arial, sans-serif; background: #f6faff; color: #07111f; }
                    form { width: min(420px, calc(100% - 32px)); padding: 28px; background: #fff; border: 1px solid #d9e5f4; border-radius: 18px; box-shadow: 0 20px 50px rgba(7,17,31,.12); }
                    h1 { margin: 0 0 12px; }
                    p { color: #637087; line-height: 1.5; }
                    input, button { width: 100%; min-height: 48px; border-radius: 12px; font: inherit; }
                    input { padding: 0 12px; border: 1px solid #d9e5f4; }
                    button { margin-top: 14px; border: 0; color: #fff; background: linear-gradient(135deg, #0878ff, #044fb3); font-weight: 800; cursor: pointer; }
                  </style>
                </head>
                <body>
                  <form action="/admin" method="get">
                    <h1>Vedanix Admin</h1>
                    <p>Enter the admin password to view submitted form details.</p>
                    <input type="password" name="password" placeholder="Admin password" required>
                    <button type="submit">Open Submissions</button>
                  </form>
                </body>
                </html>
                """
            )
            return

        submissions = self._get_submissions()
        rows = "".join(self._submission_row(submission) for submission in submissions)
        download_url = f"/download-submissions.csv?password={ADMIN_PASSWORD}"

        self._send_html(
            f"""
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Vedanix Submissions</title>
              <style>
                body {{ margin: 0; font-family: Arial, sans-serif; color: #07111f; background: #f6faff; }}
                main {{ width: min(1180px, calc(100% - 28px)); margin: 28px auto; }}
                header {{ display: flex; justify-content: space-between; gap: 16px; align-items: center; margin-bottom: 18px; }}
                h1 {{ margin: 0; }}
                a {{ display: inline-flex; min-height: 42px; align-items: center; padding: 0 16px; color: #fff; background: #0878ff; border-radius: 10px; text-decoration: none; font-weight: 800; }}
                .table-wrap {{ overflow-x: auto; background: #fff; border: 1px solid #d9e5f4; border-radius: 16px; box-shadow: 0 18px 44px rgba(7,17,31,.1); }}
                table {{ width: 100%; border-collapse: collapse; min-width: 980px; }}
                th, td {{ padding: 12px; border-bottom: 1px solid #e7eef8; text-align: left; vertical-align: top; font-size: 14px; }}
                th {{ background: #eef6ff; color: #044fb3; }}
                tr:last-child td {{ border-bottom: 0; }}
                .empty {{ padding: 28px; color: #637087; }}
              </style>
            </head>
            <body>
              <main>
                <header>
                  <div>
                    <h1>Vedanix Form Submissions</h1>
                    <p>{len(submissions)} submission(s) saved in the database.</p>
                  </div>
                  <a href="{download_url}">Download CSV</a>
                </header>
                <div class="table-wrap">
                  {f"<table><thead>{self._table_header()}</thead><tbody>{rows}</tbody></table>" if submissions else '<div class="empty">No submissions yet.</div>'}
                </div>
              </main>
            </body>
            </html>
            """
        )

    def _submission_row(self, submission):
        cells = "".join(
            f"<td>{escape(str(submission.get(field, '')))}</td>"
            for field in ["id", *FIELDS]
        )
        return f"<tr>{cells}</tr>"

    def _table_header(self):
        headings = ["id", *FIELDS]
        cells = "".join(f"<th>{escape(heading.replace('_', ' ').title())}</th>" for heading in headings)
        return f"<tr>{cells}</tr>"

    def _send_csv_download(self, query):
        if not self._is_admin_allowed(query):
            self.send_error(403, "Forbidden")
            return

        submissions = self._get_submissions()
        lines = [",".join(["id", *FIELDS])]

        for submission in submissions:
            lines.append(",".join(self._csv_value(submission.get(field, "")) for field in ["id", *FIELDS]))

        content = "\r\n".join(lines) + "\r\n"
        self.send_response(200)
        self.send_header("Content-Type", "text/csv; charset=utf-8")
        self.send_header("Content-Disposition", 'attachment; filename="vedanix-submissions.csv"')
        self.end_headers()
        self.wfile.write(content.encode("utf-8"))

    def _csv_value(self, value):
        text = str(value).replace('"', '""')
        return f'"{text}"'

    def _send_html(self, content):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(content.encode("utf-8"))


if __name__ == "__main__":
    init_database()
    import_legacy_csv_once()
    server = ThreadingHTTPServer(("", PORT), VedanixFormHandler)
    print(f"Vedanix Python form is running at http://localhost:{PORT}")
    server.serve_forever()

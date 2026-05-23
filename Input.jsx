import { cn } from "../../lib/utils";

export function Input({ className, as: Comp = "input", ...props }) {
  return (
    <Comp
      className={cn(
        "min-h-12 w-full rounded-lg border border-cyan-200/20 bg-slate-950/45 px-4 text-sm text-cyan-50 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20 light:bg-white light:text-slate-950",
        className
      )}
      {...props}
    />
  );
}

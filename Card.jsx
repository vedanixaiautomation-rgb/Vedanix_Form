import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return <div className={cn("glass rounded-lg p-6", className)} {...props} />;
}

import { cn } from "../../lib/utils";

const variants = {
  primary: "bg-cyan-300 text-slate-950 shadow-glow hover:bg-white",
  outline: "border border-cyan-200/40 bg-white/5 text-cyan-50 hover:bg-cyan-300/10",
  ghost: "text-cyan-50 hover:bg-white/10",
  danger: "bg-rose-500 text-white hover:bg-rose-400"
};

export function Button({ className, variant = "primary", as: Comp = "button", ...props }) {
  return (
    <Comp
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/70 disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

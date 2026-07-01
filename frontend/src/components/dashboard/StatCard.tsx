import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) => {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/10
      bg-gradient-to-br
      from-zinc-900
      via-zinc-900
      to-black
      p-7
      shadow-2xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:scale-[1.02]
      hover:border-cyan-400/40
      hover:shadow-cyan-500/20
      group
      "
    >
      {/* Background Glow */}
      <div
        className="
        absolute
        -right-16
        -top-16
        h-48
        w-48
        rounded-full
        bg-cyan-500/10
        blur-3xl
        transition-all
        duration-500
        group-hover:scale-125
        "
      />

      {/* Top Border */}
      <div
        className="
        absolute
        left-0
        top-0
        h-1
        w-full
        bg-gradient-to-r
        from-cyan-400
        via-blue-500
        to-green-400
        "
      />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            {title}
          </p>

          <h2 className="mt-5 text-5xl font-black text-white">
            {value}
          </h2>

          <div className="mt-6 flex items-center gap-2">

            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
              ● Live
            </span>

            <span className="text-xs text-zinc-500">
              Updated Now
            </span>

          </div>

        </div>

        <div
          className={`
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          ${color}
          shadow-xl
          transition-all
          duration-300
          group-hover:rotate-6
          group-hover:scale-110
          `}
        >
          <Icon className="h-10 w-10 text-white" />
        </div>

      </div>

      <div className="relative mt-8 border-t border-zinc-800 pt-4 flex justify-between">

        <div>

          <p className="text-xs uppercase tracking-wider text-zinc-600">
            Status
          </p>

          <p className="text-sm font-semibold text-cyan-400">
            Operational
          </p>

        </div>

        <div className="text-right">

          <p className="text-xs uppercase tracking-wider text-zinc-600">
            Source
          </p>

          <p className="text-sm text-white">
            FastAPI
          </p>

        </div>

      </div>

    </div>
  );
};

export default StatCard;
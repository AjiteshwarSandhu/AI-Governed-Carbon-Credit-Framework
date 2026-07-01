import {
  Activity,
  BrainCircuit,
  ShieldCheck,
  Leaf,
  Blocks,
  CalendarDays,
} from "lucide-react";

const DashboardHeader = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-cyan-500/10
      bg-gradient-to-br
      from-slate-950
      via-[#071323]
      to-black
      p-8
      shadow-2xl
      mb-8
      "
    >
      {/* Background Glow */}

      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative flex flex-col xl:flex-row justify-between gap-8">

        {/* Left */}

        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

            <BrainCircuit className="h-4 w-4 text-cyan-300" />

            <span className="text-xs uppercase tracking-[0.25em] text-cyan-300">

              AI GOVERNANCE PLATFORM

            </span>

          </div>

          <h1 className="mt-6 text-6xl font-black leading-tight">

            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">

              CarbonShield AI

            </span>

          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">

            Intelligent carbon credit validation powered by Machine Learning,
            Large Language Models, Governance Review and Blockchain-based
            ERC-1155 tokenization.

          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-3">

              <div className="flex items-center gap-3">

                <Activity className="h-5 w-5 text-green-400" />

                <div>

                  <p className="text-xs text-green-300">

                    SYSTEM

                  </p>

                  <p className="font-semibold text-white">

                    Operational

                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3">

              <div className="flex items-center gap-3">

                <Blocks className="h-5 w-5 text-cyan-300" />

                <div>

                  <p className="text-xs text-cyan-300">

                    NETWORK

                  </p>

                  <p className="font-semibold text-white">

                    Polygon Amoy

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-5 min-w-[330px]">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <CalendarDays className="text-cyan-400 mb-4" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">

              Today

            </p>

            <p className="mt-2 font-semibold text-white">

              {today}

            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <ShieldCheck className="text-green-400 mb-4" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">

              Governance

            </p>

            <p className="mt-2 font-semibold text-green-400">

              Active

            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <Leaf className="text-emerald-400 mb-4" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">

              Carbon Credits

            </p>

            <p className="mt-2 text-3xl font-black text-white">

              ERC-1155

            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <BrainCircuit className="text-purple-400 mb-4" />

            <p className="text-xs uppercase tracking-wider text-zinc-500">

              AI Engine

            </p>

            <p className="mt-2 font-semibold text-white">

              XGBoost + Gemini

            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardHeader;
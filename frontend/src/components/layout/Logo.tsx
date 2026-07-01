import {
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const Logo = () => {
  return (
    <div className="relative overflow-hidden border-b border-white/10 px-6 py-6">

      {/* Glow */}

      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative flex items-center gap-4">

        <div
          className="
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-cyan-400
          via-blue-500
          to-indigo-600
          shadow-xl
          shadow-cyan-500/40
          "
        >

          <ShieldCheck className="h-7 w-7 text-white" />

          <div className="absolute -right-1 -top-1 rounded-full bg-green-500 p-1">

            <Sparkles className="h-3 w-3 text-white" />

          </div>

        </div>

        <div>

          <h1 className="bg-gradient-to-r from-white via-cyan-300 to-cyan-500 bg-clip-text text-2xl font-black text-transparent">

            CarbonShield AI

          </h1>

          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cyan-300">

            AI • Governance • Blockchain

          </p>

        </div>

      </div>

    </div>
  );
};

export default Logo;
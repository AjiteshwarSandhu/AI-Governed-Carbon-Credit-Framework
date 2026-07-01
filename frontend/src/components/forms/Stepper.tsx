import {
  FileText,
  BrainCircuit,
  ShieldCheck,
  Blocks,
  CheckCircle2,
} from "lucide-react";

interface Props {
  step: number;
}

const steps = [
  {
    title: "Project",
    subtitle: "Submission",
    icon: FileText,
  },
  {
    title: "AI",
    subtitle: "Risk Analysis",
    icon: BrainCircuit,
  },
  {
    title: "Governance",
    subtitle: "Review",
    icon: ShieldCheck,
  },
  {
    title: "Blockchain",
    subtitle: "ERC-1155",
    icon: Blocks,
  },
];

export default function Stepper({ step }: Props) {
  return (
    <div className="mb-10">

      {/* Header */}

      <div className="flex items-center justify-between mb-4">

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">
            Workflow Progress
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            AI Validation Pipeline
          </h3>

        </div>

        <div className="text-right">

          <p className="text-xs text-zinc-500">
            Progress
          </p>

          <p className="text-3xl font-black text-cyan-400">
            {Math.round((step / steps.length) * 100)}%
          </p>

        </div>

      </div>

      {/* Progress */}

      <div className="mb-10 h-2 rounded-full bg-zinc-800 overflow-hidden">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 transition-all duration-700"
          style={{
            width: `${(step / steps.length) * 100}%`,
          }}
        />

      </div>

      {/* Steps */}

      <div className="grid grid-cols-4 gap-5">

        {steps.map((item, index) => {

          const Icon = item.icon;

          const completed = index + 1 < step;
          const current = index + 1 === step;

          return (

            <div
              key={item.title}
              className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              transition-all
              duration-300
              p-6
              ${
                current
                  ? "border-cyan-400 bg-cyan-500/10 shadow-xl shadow-cyan-500/20"
                  : completed
                  ? "border-green-500/20 bg-green-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }
              `}
            >

              <div className="flex items-center justify-between">

                <div
                  className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  ${
                    completed
                      ? "bg-green-500 text-white"
                      : current
                      ? "bg-cyan-500 text-white"
                      : "bg-zinc-800 text-zinc-500"
                  }
                  `}
                >

                  {completed ? (
                    <CheckCircle2 size={26} />
                  ) : (
                    <Icon size={26} />
                  )}

                </div>

                <span
                  className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  ${
                    completed
                      ? "bg-green-500/20 text-green-400"
                      : current
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "bg-zinc-800 text-zinc-500"
                  }
                  `}
                >
                  {completed
                    ? "Done"
                    : current
                    ? "Current"
                    : "Waiting"}
                </span>

              </div>

              <h4 className="mt-6 text-lg font-bold text-white">
                {item.title}
              </h4>

              <p className="mt-1 text-sm text-zinc-400">
                {item.subtitle}
              </p>

            </div>

          );

        })}

      </div>

    </div>
  );
}
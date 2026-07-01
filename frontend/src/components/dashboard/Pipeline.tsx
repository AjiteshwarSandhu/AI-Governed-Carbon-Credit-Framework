import {
  CheckCircle2,
  Cpu,
  FileText,
  Gavel,
  Link2,
  Coins,
} from "lucide-react";

interface PipelineProps {
  currentStep?: number;
}

const Pipeline = ({ currentStep = 6 }: PipelineProps) => {
  const steps = [
    {
      title: "Submission",
      subtitle: "Project Uploaded",
      icon: FileText,
    },
    {
      title: "ML Validation",
      subtitle: "Numerical Analysis",
      icon: Cpu,
    },
    {
      title: "LLM Analysis",
      subtitle: "Document Verification",
      icon: CheckCircle2,
    },
    {
      title: "Governance",
      subtitle: "Reviewer Decision",
      icon: Gavel,
    },
    {
      title: "Blockchain",
      subtitle: "Mint ERC-1155",
      icon: Link2,
    },
    {
      title: "Carbon Credit",
      subtitle: "Issued",
      icon: Coins,
    },
  ];

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
      p-8
      shadow-2xl
      "
    >
      {/* Glow */}
      <div
        className="
        absolute
        -left-24
        top-0
        h-72
        w-72
        rounded-full
        bg-cyan-500/10
        blur-3xl
        "
      />

      <div className="relative">

        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              Workflow
            </p>

            <h2 className="text-2xl font-bold text-white mt-2">
              AI Governance Pipeline
            </h2>

          </div>

          <div className="rounded-xl bg-cyan-500/10 px-4 py-2">

            <p className="text-xs text-cyan-300">
              Progress
            </p>

            <p className="text-2xl font-bold text-white">
              {Math.round((currentStep / steps.length) * 100)}%
            </p>

          </div>

        </div>

        {/* Progress Bar */}

        <div className="mb-10">

          <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 transition-all duration-700"
              style={{
                width: `${(currentStep / steps.length) * 100}%`,
              }}
            />

          </div>

        </div>

        {/* Steps */}

        <div className="grid grid-cols-6 gap-4">

          {steps.map((step, index) => {

            const Icon = step.icon;

            const completed = index + 1 <= currentStep;

            return (

              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {index !== steps.length - 1 && (
                  <div
                    className={`
                    absolute
                    top-8
                    left-1/2
                    w-full
                    h-1
                    ${completed ? "bg-cyan-400" : "bg-zinc-700"}
                    `}
                  />
                )}

                <div
                  className={`
                  relative
                  z-10
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  transition-all
                  duration-300
                  ${
                    completed
                      ? "border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/40"
                      : "border-zinc-700 bg-zinc-800"
                  }
                  `}
                >
                  <Icon
                    className={`h-8 w-8 ${
                      completed ? "text-cyan-300" : "text-zinc-500"
                    }`}
                  />
                </div>

                <h3 className="mt-5 font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  {step.subtitle}
                </p>

                <div
                  className={`
                  mt-4
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  ${
                    completed
                      ? "bg-green-500/10 text-green-400"
                      : "bg-zinc-800 text-zinc-400"
                  }
                  `}
                >
                  {completed ? "Completed" : "Pending"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
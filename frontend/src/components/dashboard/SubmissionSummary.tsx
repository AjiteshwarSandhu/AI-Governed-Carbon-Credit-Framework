import {
  Activity,
  Blocks,
  BrainCircuit,
  Coins,
  ShieldCheck,
  Wallet,
} from "lucide-react";

interface Props {
  currentStep: number;
  completion: number;
  walletConnected?: boolean;
  estimatedCredits?: number;
}

const SubmissionSummary = ({
  currentStep,
  completion,
  walletConnected = true,
  estimatedCredits = 0,
}: Props) => {

  const steps = [
    "Project",
    "AI",
    "Governance",
    "Blockchain",
  ];

  return (

<div
className="
sticky
top-28
overflow-hidden
rounded-3xl
border
border-cyan-500/10
bg-gradient-to-br
from-zinc-900
via-zinc-900
to-black
p-6
shadow-2xl
">

<div
className="
absolute
-right-16
-top-0
h-52
w-52
rounded-full
bg-cyan-500/10
blur-3xl
"
/>

<div className="relative">

<p className="text-xs uppercase tracking-[0.3em] text-cyan-400">

AI SUMMARY

</p>

<h2 className="mt-3 text-3xl font-black text-white">

Submission Status

</h2>

{/* Progress */}

<div className="mt-8">

<div className="flex justify-between">

<span className="text-zinc-400">

Completion

</span>

<span className="font-bold text-white">

{completion}%

</span>

</div>

<div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">

<div
className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 transition-all duration-700"
style={{
width:`${completion}%`
}}
/>

</div>

</div>

{/* Current Step */}

<div className="mt-8 rounded-2xl bg-cyan-500/10 p-4">

<p className="text-xs text-cyan-300">

CURRENT STEP

</p>

<p className="mt-2 text-xl font-bold text-white">

{steps[currentStep-1]}

</p>

</div>

{/* Cards */}

<div className="mt-8 space-y-4">

<InfoCard
icon={<BrainCircuit size={20}/>}
title="AI Validation"
value="Ready"
/>

<InfoCard
icon={<ShieldCheck size={20}/>}
title="Governance"
value="Pending"
/>

<InfoCard
icon={<Blocks size={20}/>}
title="Blockchain"
value="Waiting"
/>

<InfoCard
icon={<Coins size={20}/>}
title="Estimated Credits"
value={estimatedCredits.toString()}
/>

<InfoCard
icon={<Wallet size={20}/>}
title="Wallet"
value={walletConnected ? "Connected":"Offline"}
/>

</div>

{/* Footer */}

<div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">

<div className="flex items-center gap-3">

<Activity
size={18}
className="text-green-400"
/>

<div>

<p className="text-xs text-green-300">

SYSTEM STATUS

</p>

<p className="font-semibold text-white">

Operational

</p>

</div>

</div>

</div>

</div>

</div>

  );

};

interface CardProps{

icon:React.ReactNode;

title:string;

value:string;

}

function InfoCard({

icon,

title,

value,

}:CardProps){

return(

<div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">

<div className="flex items-center gap-3">

<div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">

{icon}

</div>

<div>

<p className="text-xs uppercase tracking-wider text-zinc-500">

{title}

</p>

<p className="font-semibold text-white">

{value}

</p>

</div>

</div>

</div>

)

}

export default SubmissionSummary;
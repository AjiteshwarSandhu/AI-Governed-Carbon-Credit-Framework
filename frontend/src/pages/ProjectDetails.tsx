import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Building2,
  Fuel,
  Zap,
  Coins,
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Blocks,
} from "lucide-react";

const API = "http://127.0.0.1:8000";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(`${API}/projects/${id}`);
      const data = await response.json();
      setProject(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!project) {
    return (
      <div className="flex h-[80vh] items-center justify-center">

        <div className="rounded-3xl border border-cyan-500/20 bg-zinc-900 px-12 py-10 shadow-2xl">

          <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"/>

          <h2 className="text-center text-2xl font-bold text-white">

            Loading Project...

          </h2>

        </div>

      </div>
    );
  }

  return (

<div className="space-y-8">

{/* HERO */}

<div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-slate-950 via-[#081625] to-black p-10 shadow-2xl">

<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative flex flex-col xl:flex-row justify-between gap-8">

<div>

<p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

CARBON REGISTRY

</p>

<h1 className="mt-4 text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">

Project #{project.project.id}

</h1>

<p className="mt-5 max-w-2xl text-lg text-zinc-400">

Complete AI → Governance → Blockchain lifecycle of this carbon credit project.

</p>

</div>

<div
className={`rounded-3xl border px-8 py-6 ${
project.risk?.recommendation==="APPROVE"
?"border-green-500/20 bg-green-500/10"
:project.risk?.recommendation==="REJECT"
?"border-red-500/20 bg-red-500/10"
:"border-yellow-500/20 bg-yellow-500/10"
}`}
>

<p className="text-xs uppercase tracking-widest text-zinc-400">

STATUS

</p>

<h2
className={`mt-3 text-4xl font-black ${
project.risk?.recommendation==="APPROVE"
?"text-green-400"
:project.risk?.recommendation==="REJECT"
?"text-red-400"
:"text-yellow-400"
}`}
>

{project.risk?.recommendation}

</h2>

</div>

</div>

</div>

{/* PROJECT INFORMATION */}

<div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 shadow-2xl">

<div className="absolute -right-16 top-0 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative">

<p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

PROJECT INFORMATION

</p>

<h2 className="mt-3 text-3xl font-black text-white">

Project Overview

</h2>

<div className="mt-8 grid grid-cols-2 xl:grid-cols-4 gap-6">

<MetricCard
icon={<Building2 size={22}/>}
title="Industry"
value={project.project.industry_type}
/>

<MetricCard
icon={<Fuel size={22}/>}
title="Fuel"
value={project.project.fuel_type}
/>

<MetricCard
icon={<Zap size={22}/>}
title="Energy"
value={`${project.project.energy_demand_mwh} MWh`}
/>

<MetricCard
icon={<Coins size={22}/>}
title="Credits"
value={project.project.credits_traded_tco2}
/>

</div>

</div>

</div>

{/* AI VALIDATION */}

<div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 shadow-2xl">

<div className="absolute -right-20 top-0 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative">

<div className="flex items-center gap-3">

<Sparkles className="text-cyan-400"/>

<div>

<p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

AI VALIDATION

</p>

<h2 className="mt-2 text-3xl font-black text-white">

Risk Assessment

</h2>

</div>

</div>

<div className="mt-8 grid grid-cols-2 xl:grid-cols-4 gap-6">

<MetricCard
icon={<BrainCircuit size={22}/>}
title="ML Score"
value={project.risk?.ml_score}
/>

<MetricCard
icon={<BrainCircuit size={22}/>}
title="LLM Score"
value={project.risk?.llm_score}
/>

<MetricCard
icon={<ShieldCheck size={22}/>}
title="Overall Risk"
value={project.risk?.overall_score}
/>

<MetricCard
icon={<CheckCircle2 size={22}/>}
title="Recommendation"
value={project.risk?.recommendation}
/>

</div>

<div className="mt-10 rounded-2xl border border-cyan-500/10 bg-black/30 p-6">

<p className="text-sm uppercase tracking-[0.25em] text-cyan-400">

Governance Reason

</p>

<p className="mt-4 leading-8 text-zinc-300">

{project.risk?.reason}

</p>

</div>

</div>

</div>

      

      {/* BLOCKCHAIN */}

<div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 shadow-2xl">

<div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative">

<div className="flex items-center gap-3">

<Blocks className="text-cyan-400"/>

<div>

<p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

BLOCKCHAIN

</p>

<h2 className="mt-2 text-3xl font-black text-white">

ERC-1155 Carbon Registry

</h2>

</div>

</div>

<div className="mt-8 grid grid-cols-2 xl:grid-cols-4 gap-6">

<MetricCard
icon={<CheckCircle2 size={22}/>}
title="Minted"
value={project.blockchain?.minted ? "YES" : "NO"}
/>

<MetricCard
icon={<ShieldCheck size={22}/>}
title="Retired"
value={project.blockchain?.retired ? "YES" : "NO"}
/>

<MetricCard
icon={<Coins size={22}/>}
title="Token ID"
value={project.blockchain?.token_id}
/>

<MetricCard
icon={<Building2 size={22}/>}
title="Status"
value={
project.blockchain?.minted
? "ACTIVE"
: "WAITING"
}
/>

</div>

<div className="mt-10 space-y-6">

<BlockchainField
title="Owner Wallet"
value={project.blockchain?.owner_wallet}
/>

<BlockchainField
title="Unique Credit Identity (UCI)"
value={project.blockchain?.uci}
/>

<BlockchainField
title="Transaction Hash"
value={project.blockchain?.transaction_hash}
/>

<BlockchainField
title="Smart Contract"
value={project.blockchain?.contract_address}
/>

</div>

<div className="mt-10 rounded-3xl border border-green-500/20 bg-green-500/10 p-6">

<p className="text-xs uppercase tracking-[0.35em] text-green-300">

LIFECYCLE

</p>

<div className="mt-6 space-y-5">

<TimelineItem
title="Project Submitted"
/>

<TimelineItem
title="AI Validation Completed"
/>

<TimelineItem
title="Governance Approved"
/>

<TimelineItem
title="ERC-1155 Token Minted"
/>

</div>

</div>

</div>

</div>

</div>

);

};

interface MetricCardProps{

icon:React.ReactNode;

title:string;

value:any;

}

function MetricCard({

icon,

title,

value,

}:MetricCardProps){

return(

<div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-cyan-400/30 hover:bg-white/10">

<div className="flex items-center justify-between">

<div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">

{icon}

</div>

</div>

<p className="mt-5 text-xs uppercase tracking-[0.25em] text-zinc-500">

{title}

</p>

<h2 className="mt-3 break-all text-3xl font-black text-white">

{value}

</h2>

</div>

)

}

function BlockchainField({

title,

value,

}:{

title:string;

value:any;

}){

return(

<div>

<p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">

{title}

</p>

<div className="rounded-2xl border border-zinc-700 bg-black/40 p-5">

<p className="break-all font-mono text-cyan-300">

{value || "--"}

</p>

</div>

</div>

)

}

function TimelineItem({

title,

}:{

title:string;

}){

return(

<div className="flex items-center gap-4">

<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">

✓

</div>

<p className="text-lg text-white">

{title}

</p>

</div>

)

}

export default ProjectDetails;
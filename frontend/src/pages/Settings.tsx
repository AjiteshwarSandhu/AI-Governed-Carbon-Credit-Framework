import { Copy, CheckCircle2, Cpu, Wallet, Blocks } from "lucide-react";
import toast from "react-hot-toast";

const Settings = () => {

  const system = {

    version: "1.0",

    backend: "FastAPI",

    frontend: "React + TypeScript",

    blockchain: "Polygon Amoy",

    contract: "0x4e5E74AfB3A64a747143883e1B864a1720B851e4",

    wallet: "0x1A0826Fd05e898B4130E44Ea07c0437d87D1F6F2",

    ml: "XGBoost",

    llm: "Gemini",

    token: "ERC-1155",

    database: "PostgreSQL"

  };

  const copy = (text: string) => {

    navigator.clipboard.writeText(text);

    toast.success("Copied to Clipboard");

  };

  return (

<div className="space-y-8">

{/* HERO */}

<div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-slate-950 via-[#071522] to-black p-10 shadow-2xl">

<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative flex flex-col xl:flex-row justify-between gap-8">

<div>

<p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

SYSTEM CONTROL CENTER

</p>

<h1 className="mt-4 text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">

Settings

</h1>

<p className="mt-5 text-lg text-zinc-400">

Platform configuration and infrastructure overview.

</p>

</div>

<div className="grid grid-cols-2 gap-4">

<StatusCard title="System" value="ONLINE"/>

<StatusCard title="Version" value={system.version}/>

</div>

</div>

</div>

{/* GRID */}

<div className="grid xl:grid-cols-2 gap-8">

<Card title="Platform" icon={<Cpu className="text-cyan-400"/>}>

<Info title="Backend" value={system.backend}/>

<Info title="Frontend" value={system.frontend}/>

<Info title="Database" value={system.database}/>

</Card>

<Card title="Artificial Intelligence" icon={<Cpu className="text-cyan-400"/>}>

<Info title="ML Model" value={system.ml}/>

<Info title="LLM" value={system.llm}/>

<Status title="Governance" value="Operational"/>

</Card>

<Card title="Blockchain" icon={<Blocks className="text-cyan-400"/>}>

<Info title="Network" value={system.blockchain}/>

<Info title="Token Standard" value={system.token}/>

<CopyField
title="Contract Address"
value={system.contract}
copy={copy}
/>

</Card>

<Card title="Wallet" icon={<Wallet className="text-cyan-400"/>}>

<CopyField
title="Wallet Address"
value={system.wallet}
copy={copy}
/>

<Status title="Connection" value="Connected"/>

</Card>

</div>

<div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 shadow-xl">

<h2 className="mb-8 text-3xl font-black">

System Health

</h2>

<div className="grid grid-cols-2 xl:grid-cols-4 gap-6">

<Health icon="🤖" title="AI Ready"/>

<Health icon="⛓" title="Blockchain"/>

<Health icon="🛡" title="Governance"/>

<Health icon="🪙" title="ERC-1155"/>

</div>

</div>

</div>

);

};

function Card({title,icon,children}:any){

return(

<div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 shadow-xl">

<div className="mb-8 flex items-center gap-3">

{icon}

<h2 className="text-3xl font-black">

{title}

</h2>

</div>

<div className="space-y-6">

{children}

</div>

</div>

)

}

function Info({title,value}:any){

return(

<div>

<p className="text-sm uppercase tracking-wider text-zinc-500">

{title}

</p>

<h3 className="mt-2 text-xl font-bold break-all">

{value}

</h3>

</div>

)

}

function Status({title,value}:any){

return(

<div>

<p className="text-sm uppercase tracking-wider text-zinc-500">

{title}

</p>

<div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400 font-bold">

<CheckCircle2 size={18}/>

{value}

</div>

</div>

)

}

function CopyField({title,value,copy}:any){

return(

<div>

<p className="text-sm uppercase tracking-wider text-zinc-500">

{title}

</p>

<div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-zinc-700 bg-black/40 p-4">

<p className="truncate font-mono text-cyan-300">

{value}

</p>

<button

onClick={()=>copy(value)}

className="rounded-lg bg-cyan-500/10 p-2 hover:bg-cyan-500/20"

>

<Copy size={18}/>

</button>

</div>

</div>

)

}

function StatusCard({title,value}:any){

return(

<div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

<p className="text-xs uppercase tracking-widest text-green-300">

{title}

</p>

<h2 className="mt-3 text-4xl font-black">

{value}

</h2>

</div>

)

}

function Health({icon,title}:any){

return(

<div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:border-cyan-400/30 hover:bg-white/10">

<div className="text-5xl">

{icon}

</div>

<h3 className="mt-4 text-lg font-bold">

{title}

</h3>

<p className="mt-2 text-green-400">

Operational

</p>

</div>

)

}

export default Settings;
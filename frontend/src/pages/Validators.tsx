import { Copy, ShieldCheck, Network, Cpu, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";


const Validators = () => {

  const validator = {

    name: "Validator 1",

    wallet: "0x1A0826Fd05e898B4130E44Ea07c0437d87D1F6F2",

    network: "Polygon Amoy",

    contract: "0x4e5E74AfB3A64a747143883e1B864a1720B851e4",

    status: "ACTIVE",

    projectsApproved: 7,

    consensus: "1 / 1"

  };

  return (

<div className="space-y-8">

{/* HERO */}

<div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-slate-950 via-[#071522] to-black p-10 shadow-2xl">

<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative flex flex-col xl:flex-row justify-between gap-8">

<div>

<p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

AI GOVERNANCE NETWORK

</p>

<h1 className="mt-4 text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">

Validators

</h1>

<p className="mt-5 max-w-3xl text-lg text-zinc-400">

Multi-signature validator network securing carbon credit governance.

</p>

</div>

<div className="grid grid-cols-2 gap-4">

<div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

<p className="text-xs uppercase tracking-widest text-green-300">

STATUS

</p>

<h2 className="mt-3 text-4xl font-black text-white">

ONLINE

</h2>

</div>

<div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

<p className="text-xs uppercase tracking-widest text-cyan-300">

CONSENSUS

</p>

<h2 className="mt-3 text-4xl font-black text-white">

{validator.consensus}

</h2>

</div>

</div>

</div>

</div>

{/* GRID */}

<div className="grid xl:grid-cols-2 gap-8">

{/* Validator */}

<div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 shadow-xl">

<div className="flex items-center gap-3">

<ShieldCheck className="text-cyan-400"/>

<h2 className="text-3xl font-black">

Validator

</h2>

</div>

<div className="mt-8 space-y-6">

<Info title="Validator Name" value={validator.name}/>

<CopyField title="Wallet Address" value={validator.wallet}/>

<StatusField title="Validator Status" value={validator.status}/>

<Info title="Projects Approved" value={validator.projectsApproved}/>

</div>

</div>

{/* Network */}

<div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 shadow-xl">

<div className="flex items-center gap-3">

<Network className="text-cyan-400"/>

<h2 className="text-3xl font-black">

Blockchain Network

</h2>

</div>

<div className="mt-8 space-y-6">

<Info title="Network" value={validator.network}/>

<Info title="Consensus" value={validator.consensus}/>

<CopyField title="Smart Contract" value={validator.contract}/>

<StatusField title="Governance" value="Operational"/>

</div>

</div>

</div>

{/* Pipeline */}

<div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-8 shadow-xl">

<div className="flex items-center gap-3">

<Cpu className="text-cyan-400"/>

<h2 className="text-3xl font-black">

Governance Workflow

</h2>

</div>

<div className="mt-10 grid grid-cols-5 gap-4">

{[
"Project Submitted",
"AI Validation",
"Validator Approval",
"Blockchain Mint",
"Carbon Credit Issued"
].map((item,index)=>(

<div
key={item}
className="text-center"
>

<div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full font-black text-xl ${
index===4
?"bg-green-500"
:"bg-cyan-500"
}`}>

{index===4?<CheckCircle2/>:index+1}

</div>

<p className="mt-4 text-sm">

{item}

</p>

</div>

))}

</div>

</div>

</div>
  );

};

function Info({title,value}:any){

return(

<div>

<p className="text-sm uppercase tracking-wider text-zinc-500">

{title}

</p>

<h3 className="mt-2 text-xl font-bold text-white break-all">

{value}

</h3>

</div>

)

}

function StatusField({title,value}:any){

return(

<div>

<p className="text-sm uppercase tracking-wider text-zinc-500">

{title}

</p>

<div className="mt-2 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-green-400 font-bold">

🟢 {value}

</div>

</div>

)

}

function CopyField({title,value}:any){

const copy=()=>{

navigator.clipboard.writeText(value);

toast.success("Copied");

};

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

onClick={copy}

className="rounded-lg bg-cyan-500/10 p-2 hover:bg-cyan-500/20"

>

<Copy size={18}/>

</button>

</div>

</div>

)

}

export default Validators;
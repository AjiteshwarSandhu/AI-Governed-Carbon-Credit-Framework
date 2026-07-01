import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import {
  getCredits,
  retireCredits,
} from "@/services/blockchainService";

const Credits = () => {

  const [credits, setCredits] = useState<any[]>([]);
  const [selectedCredit,setSelectedCredit]=useState<any>(null);
const [retiring, setRetiring] = useState(false);
const [progress, setProgress] = useState(0);
const [progressText, setProgressText] = useState("");
  

  useEffect(() => {

    loadCredits();

  }, []);

  const loadCredits = async () => {

    try {

      const data = await getCredits();

      setCredits(data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleRetire = async (id:number) => {

    try{

      await retireCredits(id);

      toast.success("Carbon Credit Retired Successfully!");

      loadCredits();

    }catch(err){

      console.log(err);

    }

  };

  const copyToClipboard = async (text: string) => {

  await navigator.clipboard.writeText(text);

  toast.success("Copied to Clipboard");

};

const retireCredit = async () => {

  if (!selectedCredit) return;

  setRetiring(true);

  setProgressText("Submitting Transaction...");
  setProgress(25);

  await new Promise((r) => setTimeout(r, 900));

  setProgressText("Waiting for Validator Confirmation...");
  setProgress(55);

  await new Promise((r) => setTimeout(r, 1000));

  setProgressText("Writing Transaction to Blockchain...");
  setProgress(85);

  await new Promise((r) => setTimeout(r, 1200));

  await handleRetire(selectedCredit.submission_id);

  setProgressText("Transaction Confirmed ✔");
  setProgress(100);

  await new Promise((r) => setTimeout(r, 900));

  setRetiring(false);
  setSelectedCredit(null);
  setProgress(0);
  setProgressText("");

};


  return (

<div className="space-y-8">

{/* HERO */}

<div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-slate-950 via-[#071522] to-black p-10 shadow-2xl">

<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative flex flex-col xl:flex-row justify-between gap-8">

<div>

<p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

BLOCKCHAIN REGISTRY

</p>

<h1 className="mt-4 text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">

Carbon Credits

</h1>

<p className="mt-5 max-w-3xl text-lg text-zinc-400">

ERC-1155 tokenized carbon assets secured on blockchain.

</p>

</div>

<div className="grid grid-cols-2 gap-4">

<div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

<p className="text-xs uppercase tracking-[0.25em] text-cyan-300">

TOTAL TOKENS

</p>

<h2 className="mt-3 text-4xl font-black text-white">

{credits.length}

</h2>

</div>

<div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

<p className="text-xs uppercase tracking-[0.25em] text-green-300">

NETWORK

</p>

<h2 className="mt-3 text-4xl font-black text-white">

LIVE

</h2>

</div>

</div>

</div>

</div>

{/* TABLE */}

<div className="overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black shadow-2xl">

<table className="w-full">

<thead className="border-b border-zinc-800 bg-black/30">

<tr>

<th className="p-5 text-left text-xs uppercase tracking-[0.25em] text-cyan-300">

Token

</th>

<th className="p-5 text-left text-xs uppercase tracking-[0.25em] text-cyan-300">

Submission

</th>

<th className="p-5 text-left text-xs uppercase tracking-[0.25em] text-cyan-300">

Minted

</th>

<th className="p-5 text-left text-xs uppercase tracking-[0.25em] text-cyan-300">

Retired

</th>

<th className="p-5 text-left text-xs uppercase tracking-[0.25em] text-cyan-300">

Unique Credit Identity

</th>

<th className="p-5 text-right text-xs uppercase tracking-[0.25em] text-cyan-300">

Actions

</th>

</tr>

</thead>

<tbody>

{credits.map((credit)=>(

<tr
key={credit.id}
className="
border-t
border-zinc-800
transition-all
duration-300
hover:bg-cyan-500/5
"
>

<td className="p-5">

<div>

<p className="text-2xl font-black text-cyan-300">

#{credit.token_id}

</p>

<p className="text-xs text-zinc-500">

ERC-1155

</p>

</div>

</td>

<td className="p-5">

<div className="rounded-full bg-cyan-500/10 px-4 py-2 inline-flex">

{credit.submission_id}

</div>

</td>

<td className="p-5">

<span
className={`rounded-full px-4 py-2 font-bold ${
credit.minted
?"bg-green-500/10 text-green-400"
:"bg-red-500/10 text-red-400"
}`}
>

{credit.minted ? "MINTED":"NOT MINTED"}

</span>

</td>

<td className="p-5">

<span
className={`rounded-full px-4 py-2 font-bold ${
credit.retired
?"bg-red-500/10 text-red-400"
:"bg-green-500/10 text-green-400"
}`}
>

{credit.retired ? "RETIRED":"ACTIVE"}

</span>

</td>

<td className="p-5">

<div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-700 bg-black/40 px-4 py-3">

<p className="truncate font-mono text-cyan-300">

{credit.uci}

</p>

<button

onClick={()=>copyToClipboard(credit.uci)}

className="
rounded-lg
bg-cyan-500/10
p-2
transition
hover:bg-cyan-500/20
"

>

<Copy size={18}/>

</button>

</div>

</td>

<td className="p-5 text-right">

{!credit.retired && (

<button

onClick={()=>setSelectedCredit(credit)}

className="
rounded-xl
bg-gradient-to-r
from-red-500
to-red-600
px-5
py-3
font-bold
text-white
transition-all
hover:scale-105
hover:shadow-lg
hover:shadow-red-500/30
"

>

Retire Credit

</button>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* RETIRE MODAL */}

{selectedCredit && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">

<div className="w-full max-w-xl overflow-hidden rounded-3xl border border-red-500/20 bg-zinc-900 shadow-2xl">

{/* Header */}

<div className="border-b border-zinc-800 bg-gradient-to-r from-red-900/20 to-black p-8">

<p className="text-xs uppercase tracking-[0.35em] text-red-400">

BLOCKCHAIN CONFIRMATION

</p>

<h2 className="mt-3 text-4xl font-black text-white">

⚠ Confirm Retirement

</h2>

<p className="mt-4 text-zinc-400">

Retiring a carbon credit permanently removes it from circulation.

This action <span className="font-bold text-red-400">cannot be undone.</span>

</p>

</div>

{/* Body */}

<div className="space-y-6 p-8">

<div className="rounded-2xl border border-zinc-700 bg-black/40 p-5">

<p className="text-sm uppercase tracking-widest text-zinc-500">

TOKEN ID

</p>

<h2 className="mt-2 text-4xl font-black text-cyan-300">

#{selectedCredit.token_id}

</h2>

</div>

<div className="rounded-2xl border border-zinc-700 bg-black/40 p-5">

<p className="text-sm uppercase tracking-widest text-zinc-500">

UNIQUE CREDIT IDENTITY

</p>

<p className="mt-3 break-all rounded-xl bg-zinc-950 p-4 font-mono text-green-300">

{selectedCredit.uci}

</p>

</div>

{/* Progress */}

{retiring && (

<div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

<p className="font-semibold text-cyan-300">

{progressText}

</p>

<div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">

<div

className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 transition-all duration-700"

style={{ width: `${progress}%` }}

/>

</div>

<p className="mt-3 text-right text-sm text-zinc-400">

{progress}%

</p>

</div>

)}

{/* Buttons */}

<div className="flex justify-end gap-4 pt-4">

<button

disabled={retiring}

onClick={()=>setSelectedCredit(null)}

className="rounded-xl border border-zinc-700 px-6 py-3 text-white transition hover:bg-zinc-800 disabled:opacity-40"

>

Cancel

</button>

<button

disabled={retiring}

onClick={retireCredit}

className="rounded-xl bg-gradient-to-r from-red-500 to-red-700 px-7 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-70"

>

{retiring ? "Processing..." : "Retire Permanently"}

</button>

</div>

</div>

</div>

</div>

)}

</div>



  );

  

};




export default Credits;
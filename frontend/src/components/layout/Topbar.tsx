import {
  Bell,
  Search,
  UserCircle2,
  ShieldCheck,
  Wallet,
  CalendarDays,
  ChevronDown,
  LogOut,
  Settings,
  User,
  X,
  Activity,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Topbar = () => {

  const navigate = useNavigate();

  /* ----------------------------- CLOCK ----------------------------- */

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = time.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = time.toLocaleTimeString();

  /* --------------------------- DROPDOWNS --------------------------- */

  const [showWallet, setShowWallet] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  /* ----------------------------- SEARCH ---------------------------- */

  const [query, setQuery] = useState("");

  const searchableItems = [

    "Project #12",
    "Project #18",
    "Project #24",

    "Validator",

    "Carbon Credits",

    "Polygon",

    "Wallet",

    "Governance",

    "AI Validation",

    "Settings",

    "Dashboard",

    "Projects",

    "Submit Project",

  ];

  const results = searchableItems.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  /* --------------------------- WALLET ------------------------------ */

  const wallet =
    "0x1A0826Fd05e898B4130E44Ea07c0437d87D1F6F2";

  const copyWallet = () => {
    navigator.clipboard.writeText(wallet);
    toast.success("Wallet copied");
  };

  /* ---------------------- CLICK OUTSIDE CLOSE ---------------------- */

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    function handleClick(event: MouseEvent) {

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {

        setShowWallet(false);
        setShowProfile(false);
        setShowNotifications(false);
        setShowSearch(false);
        setShowNetwork(false);

      }

    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );

  }, []);

  /* ------------------------- NOTIFICATIONS ------------------------- */

  const notifications = [

    {
      title: "Carbon Credits Minted",
      time: "2 min ago",
    },

    {
      title: "AI Validation Completed",
      time: "5 min ago",
    },

    {
      title: "Validator Approved Project",
      time: "12 min ago",
    },

  ];

  /* --------------------------- PROFILE ----------------------------- */

  const logout = () => {

  localStorage.removeItem("isLoggedIn");

  toast.success("Logged Out Successfully");

  navigate("/login");

};

  return (

<div ref={wrapperRef}>

 <header
className="
sticky
top-0
z-50
border-b
border-cyan-500/10
bg-black/30
backdrop-blur-2xl
shadow-xl
shadow-cyan-500/5
px-10
py-5
flex
items-center
justify-between
overflow-visible
"
>

{/* LEFT */}

<div className="flex flex-col">

<p className="text-xs uppercase tracking-[0.4em] text-cyan-400">

AI GOVERNANCE PLATFORM

</p>

<h1 className="mt-2 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-4xl font-black text-transparent">

Welcome Back 👋

</h1>

<p className="mt-2 text-zinc-400">

Administrator • System Owner

</p>

<div className="mt-4 flex flex-wrap items-center gap-4">

<div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

<CalendarDays size={16} className="text-cyan-400"/>

<div>

<p className="text-sm font-semibold text-cyan-300">

{today}

</p>

<p className="text-[11px] text-zinc-500">

{currentTime}

</p>

</div>

</div>

<div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

<div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"/>

<span className="text-sm font-semibold text-green-300">

System Healthy

</span>

</div>

<div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">

<Activity size={16} className="text-blue-300"/>

<span className="text-sm font-semibold text-blue-300">

AI Online

</span>

</div>

</div>

</div>

{/* RIGHT */}

<div className="relative flex items-center gap-4">

<button

onClick={()=>setShowNetwork(!showNetwork)}

className="
hidden
xl:flex
items-center
gap-3
rounded-2xl
border
border-green-500/20
bg-gradient-to-r
from-green-500/10
to-emerald-500/10
px-5
py-3
transition-all
duration-300
hover:scale-105
hover:border-green-400
hover:shadow-lg
hover:shadow-green-500/20
"

>

<div className="relative">

<div className="h-3 w-3 rounded-full bg-green-400"/>

<div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-60"/>

</div>

<ShieldCheck size={18} className="text-green-400"/>

<div>

<p className="text-xs text-green-300">

Network

</p>

<p className="font-semibold text-white">

Polygon Amoy

</p>

</div>

<ChevronDown
size={16}
className={`transition-transform ${
showNetwork ? "rotate-180":""
}`}
/>

</button>

<button

onClick={()=>setShowWallet(!showWallet)}

className="
hidden
lg:flex
items-center
gap-3
rounded-2xl
border
border-cyan-500/20
bg-gradient-to-r
from-cyan-500/10
to-blue-500/10
px-5
py-3
transition-all
duration-300
hover:scale-105
hover:border-cyan-400
hover:shadow-lg
hover:shadow-cyan-500/20
"

>

<Wallet size={18} className="text-cyan-300"/>

<div>

<p className="text-xs text-cyan-300">

Wallet

</p>

<p className="font-semibold text-white">

Connected

</p>

</div>

<ChevronDown
size={16}
className={`transition-transform ${
showWallet ? "rotate-180":""
}`}
/>

</button>

<button

onClick={()=>setShowSearch(true)}

className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-white/5
transition-all
duration-300
hover:scale-110
hover:bg-cyan-500
hover:shadow-lg
hover:shadow-cyan-500/30
"

>

<Search size={20} className="text-white"/>

</button>

<button

onClick={()=>setShowNotifications(!showNotifications)}

className="
relative
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-white/5
transition-all
duration-300
hover:scale-110
hover:bg-cyan-500
hover:shadow-lg
hover:shadow-cyan-500/30
"

>

<div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">

{notifications.length}

</div>

<Bell size={20} className="text-white"/>

</button>

<button

onClick={()=>setShowProfile(!showProfile)}

className="
flex
items-center
gap-3
rounded-2xl
border
border-cyan-500/20
bg-gradient-to-r
from-cyan-500/10
to-blue-500/10
px-4
py-2
transition-all
duration-300
hover:scale-105
hover:border-cyan-400
hover:shadow-lg
hover:shadow-cyan-500/20
"

>

<UserCircle2
size={36}
className="text-cyan-300"
/>

<div className="hidden lg:block text-left">

<p className="font-semibold text-white">

Administrator

</p>

<p className="text-xs text-zinc-400">

System Owner

</p>

</div>

<ChevronDown
size={16}
className={`transition-transform ${
showProfile ? "rotate-180":""
}`}
/>

</button>

</div>

</header>

{/* ================= NETWORK POPUP ================= */}

{showNetwork && (

<div className="absolute right-[34rem] top-24 z-50 w-96 rounded-3xl border border-green-500/20 bg-zinc-900 p-6 shadow-2xl">

<div className="flex items-center justify-between">

<div>

<p className="text-xs uppercase tracking-[0.3em] text-green-400">

BLOCKCHAIN

</p>

<h2 className="mt-2 text-2xl font-black">

Polygon Amoy

</h2>

</div>

<X
className="cursor-pointer"
onClick={()=>setShowNetwork(false)}
/>

</div>

<div className="mt-8 grid grid-cols-2 gap-4">

<div className="rounded-xl bg-black/40 p-4">

<p className="text-xs text-zinc-500">

Chain ID

</p>

<h3 className="mt-2 text-xl font-bold">

80002

</h3>

</div>

<div className="rounded-xl bg-black/40 p-4">

<p className="text-xs text-zinc-500">

RPC Status

</p>

<h3 className="mt-2 text-green-400 font-bold">

ONLINE

</h3>

</div>

<div className="rounded-xl bg-black/40 p-4">

<p className="text-xs text-zinc-500">

Latest Block

</p>

<h3 className="mt-2">

28493128

</h3>

</div>

<div className="rounded-xl bg-black/40 p-4">

<p className="text-xs text-zinc-500">

Gas Fee

</p>

<h3 className="mt-2">

0.00003 POL

</h3>

</div>

</div>

</div>

)}

{/* ================= WALLET ================= */}

{showWallet && (

<div className="absolute right-56 top-24 z-50 w-96 rounded-3xl border border-cyan-500/20 bg-zinc-900 p-6 shadow-2xl">

<div className="flex items-center justify-between">

<div>

<p className="text-xs uppercase tracking-[0.3em] text-cyan-400">

CONNECTED WALLET

</p>

<h2 className="mt-2 text-2xl font-black">

Polygon Wallet

</h2>

</div>

<X

className="cursor-pointer"

onClick={()=>setShowWallet(false)}

/>

</div>

<div className="mt-6 rounded-2xl bg-black/40 p-5">

<p className="text-xs text-zinc-500">

Wallet Address

</p>

<p className="mt-3 truncate font-mono text-cyan-300">

{wallet}

</p>

</div>

<div className="mt-5 grid grid-cols-2 gap-4">

<div className="rounded-xl bg-black/40 p-4">

<p className="text-xs text-zinc-500">

Balance

</p>

<h3 className="mt-2 text-xl font-bold">

2.41 POL

</h3>

</div>

<div className="rounded-xl bg-black/40 p-4">

<p className="text-xs text-zinc-500">

Network

</p>

<h3 className="mt-2 text-green-400 font-bold">

Connected

</h3>

</div>

</div>

<div className="mt-6 flex gap-3">

<button

onClick={copyWallet}

className="flex-1 rounded-xl bg-cyan-500 py-3 font-bold transition hover:bg-cyan-400"

>

Copy Address

</button>

<button

onClick={()=>toast.success("Wallet Disconnected")}

className="flex-1 rounded-xl border border-red-500 py-3 font-bold text-red-400 transition hover:bg-red-500/10"

>

Disconnect

</button>

</div>

</div>

)}

{/* ================= NOTIFICATIONS ================= */}

{showNotifications && (

<div className="absolute right-20 top-24 z-50 w-96 rounded-3xl border border-cyan-500/20 bg-zinc-900 p-6 shadow-2xl">

<div className="flex items-center justify-between">

<div>

<p className="text-xs uppercase tracking-[0.3em] text-cyan-400">

NOTIFICATIONS

</p>

<h2 className="mt-2 text-2xl font-black">

Recent Activity

</h2>

</div>

<X

className="cursor-pointer"

onClick={()=>setShowNotifications(false)}

/>

</div>

<div className="mt-6 space-y-4">

{notifications.map((item,index)=>(

<div

key={index}

className="rounded-2xl border border-zinc-800 bg-black/40 p-4 transition hover:border-cyan-400"

>

<div className="flex justify-between">

<p className="font-semibold">

{item.title}

</p>

<span className="text-xs text-zinc-500">

{item.time}

</span>

</div>

<p className="mt-2 text-sm text-zinc-400">

System notification

</p>

</div>

))}

</div>

</div>

)}

{/* ================= SEARCH MODAL ================= */}

{showSearch && (

<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">

<div className="w-full max-w-2xl rounded-3xl border border-cyan-500/20 bg-zinc-900 shadow-2xl">

<div className="flex items-center justify-between border-b border-zinc-800 p-6">

<div>

<p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

GLOBAL SEARCH

</p>

<h2 className="mt-2 text-3xl font-black">

Search Dashboard

</h2>

</div>

<X

className="cursor-pointer"

onClick={()=>setShowSearch(false)}

/>

</div>

<div className="p-6">

<div className="relative">

<Search
size={20}
className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
/>

<input

autoFocus

value={query}

onChange={(e)=>setQuery(e.target.value)}

placeholder="Search Projects, Validators, Wallet, Settings..."

className="w-full rounded-2xl border border-zinc-700 bg-black/40 py-4 pl-14 pr-4 outline-none focus:border-cyan-400"

/>

</div>

<div className="mt-6 max-h-80 space-y-3 overflow-y-auto">

{results.length===0 && (

<div className="rounded-xl bg-black/40 p-6 text-center text-zinc-500">

No Results Found

</div>

)}

{results.map((item,index)=>(

<button

key={index}

onClick={()=>{

toast.success(`Opening ${item}`);

setShowSearch(false);

}}

className="flex w-full items-center justify-between rounded-2xl border border-zinc-800 bg-black/30 p-4 transition hover:border-cyan-400 hover:bg-cyan-500/10"

>

<span>

{item}

</span>

<Search
size={18}
/>

</button>

))}

</div>

</div>

</div>

</div>

)}

{/* ================= PROFILE ================= */}

{showProfile && (

<div className="absolute right-0 top-24 z-50 w-80 rounded-3xl border border-cyan-500/20 bg-zinc-900 p-6 shadow-2xl">

<div className="flex items-center gap-4">

<UserCircle2

size={60}

className="text-cyan-300"

/>

<div>

<h3 className="text-xl font-bold">

Administrator

</h3>

<p className="text-sm text-zinc-500">

System Owner

</p>

</div>

</div>

<div className="mt-6 rounded-2xl bg-black/40 p-4">

<p className="text-xs text-zinc-500">

Current Role

</p>

<h3 className="mt-2 text-cyan-300">

Blockchain Governance Administrator

</h3>

</div>

<div className="mt-6 space-y-3">

<button

onClick={()=>toast.success("Profile Loaded")}

className="flex w-full items-center gap-3 rounded-xl p-4 transition hover:bg-zinc-800"

>

<User size={18}/>

Profile

</button>

<button

onClick={()=>{

navigate("/settings");

setShowProfile(false);

}}

className="flex w-full items-center gap-3 rounded-xl p-4 transition hover:bg-zinc-800"

>

<Settings size={18}/>

Settings

</button>

<button

onClick={logout}

className="flex w-full items-center gap-3 rounded-xl p-4 text-red-400 transition hover:bg-red-500/10"

>

<LogOut size={18}/>

Logout

</button>

</div>

</div>

)}

</div>

);

};

export default Topbar;
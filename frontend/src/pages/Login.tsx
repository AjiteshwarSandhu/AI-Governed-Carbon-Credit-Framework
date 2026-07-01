import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const login = async () => {

    if (!username || !password) {

      toast.error("Please enter username and password");

      return;

    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 1500));

    if (
      username === "CapstoneFinal" &&
      password === "Group_89"
    ) {

      localStorage.setItem("isLoggedIn", "true");

      toast.success("Welcome Administrator");

      navigate("/");

    } else {

      toast.error("Invalid Credentials");

    }

    setLoading(false);

  };

  return (

<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#06111d] to-black">

{/* Background */}

<div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

<div className="absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-blue-600/10 blur-[140px]" />

<div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[180px]" />

{/* Login Card */}

<div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-2xl shadow-2xl">

<div className="flex justify-center">

<div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30">

<ShieldCheck size={42} className="text-white"/>

</div>

</div>

<h1 className="mt-8 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-center text-4xl font-black text-transparent">

Carbon Governance

</h1>

<p className="mt-3 text-center text-zinc-400">

AI-Governed Blockchain Carbon Credit Validation

</p>

<div className="mt-10 space-y-6">

{/* Username */}

<div>

<label className="mb-2 block text-sm text-zinc-400">

Username

</label>

<div className="flex items-center rounded-2xl border border-zinc-700 bg-black/30 px-4">

<User className="text-cyan-400" size={18}/>

<input

value={username}

onChange={(e)=>setUsername(e.target.value)}

placeholder="Enter Username"

className="w-full bg-transparent px-4 py-4 text-white placeholder:text-zinc-500 outline-none caret-cyan-400"

/>

</div>

</div>

{/* Password */}

<div>

<label className="mb-2 block text-sm text-zinc-400">

Password

</label>

<div className="flex items-center rounded-2xl border border-zinc-700 bg-black/30 px-4">

<Lock className="text-cyan-400" size={18}/>

<input

type={showPassword ? "text":"password"}

value={password}

onChange={(e)=>setPassword(e.target.value)}

placeholder="Enter Password"

className="w-full bg-transparent px-4 py-4 text-white placeholder:text-zinc-500 outline-none caret-cyan-400"
/>

<button

onClick={()=>setShowPassword(!showPassword)}

type="button"

className="text-zinc-500"

>

{showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}

</button>

</div>

</div>

{/* Remember */}

<div className="flex items-center justify-between">

<label className="flex items-center gap-3 text-sm text-zinc-400">

<input
type="checkbox"
className="h-4 w-4 accent-cyan-500"
/>

Remember Me

</label>

<button
type="button"
className="text-sm text-cyan-400 hover:underline"
onClick={() =>
toast("Demo Login • admin / admin123")
}
>

Forgot Password?

</button>

</div>

{/* Demo Credentials */}

<div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

<p className="text-xs uppercase tracking-[0.3em] text-cyan-400">

Demo Credentials

</p>

<div className="mt-4 space-y-2 text-sm">

<p>

<span className="text-zinc-500">

Username :

</span>{" "}

<span className="font-bold text-white">

carboadmin

</span>

</p>

<p>

<span className="text-zinc-500">

Password :

</span>{" "}

<span className="font-bold text-white">

C@rbon2026!

</span>

</p>

</div>

</div>

{/* Login Button */}

<button

onClick={login}

disabled={loading}

className="
group
mt-2
flex
w-full
items-center
justify-center
gap-3
rounded-2xl
bg-gradient-to-r
from-cyan-500
to-blue-600
py-4
text-lg
font-bold
text-white
transition-all
duration-300
hover:scale-[1.02]
hover:shadow-xl
hover:shadow-cyan-500/30
disabled:opacity-60
"

>

{loading ? (

<div className="flex items-center gap-3">

<div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"/>

Signing In...

</div>

) : (

<>

Sign In

<ArrowRight
className="transition-transform group-hover:translate-x-1"
/>

</>

)}

</button>

</div>

<div className="mt-10 border-t border-white/10 pt-6 text-center">

<p className="text-sm text-zinc-500">

AI-Governed Blockchain Carbon Credit Validation Framework

</p>

<p className="mt-2 text-xs text-zinc-600">

Version 1.0 • Capstone Project

</p>

</div>

</div>

</div>

);

};

export default Login;
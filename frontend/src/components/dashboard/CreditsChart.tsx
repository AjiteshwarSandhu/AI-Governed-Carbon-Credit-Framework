import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

interface Props {
  minted: number;
  retired: number;
}

const CreditsChart = ({
  minted,
  retired,
}: Props) => {

  const data = [
    {
      name: "Minted",
      value: minted,
      color: "#22c55e",
    },
    {
      name: "Retired",
      value: retired,
      color: "#ef4444",
    },
  ];

  const total = minted + retired;

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
p-7
shadow-2xl
transition-all
duration-300
hover:border-cyan-400/30
hover:shadow-cyan-500/20
group
h-[430px]
">

{/* Background Glow */}

<div
className="
absolute
-left-20
-bottom-0
h-60
w-60
rounded-full
bg-green-500/10
blur-3xl
group-hover:scale-125
transition
duration-500
"
/>

<div className="relative flex items-center justify-between mb-6">

<div>

<p className="text-xs uppercase tracking-[0.3em] text-cyan-400">

Blockchain

</p>

<h2 className="text-2xl font-bold text-white mt-2">

Carbon Credits

</h2>

</div>

<div className="rounded-2xl bg-cyan-500/10 px-4 py-2">

<p className="text-xs text-cyan-300">

Total Credits

</p>

<p className="text-2xl font-bold text-white">

{total}

</p>

</div>

</div>

<div className="h-[300px]">

<ResponsiveContainer width="100%" height="100%">

<BarChart
data={data}
barCategoryGap={50}
>

<CartesianGrid
strokeDasharray="4 4"
stroke="#1f2937"
/>

<XAxis
dataKey="name"
stroke="#94A3B8"
tickLine={false}
axisLine={false}
/>

<YAxis
stroke="#94A3B8"
tickLine={false}
axisLine={false}
/>

<Tooltip
contentStyle={{
background:"#111827",
border:"1px solid #22d3ee",
borderRadius:"14px",
color:"#fff"
}}
cursor={{
fill:"rgba(34,211,238,.08)"
}}
/>

<Bar
dataKey="value"
radius={[12,12,0,0]}
animationDuration={1200}
>

{data.map((entry,index)=>(

<Cell
key={index}
fill={entry.color}
/>

))}

</Bar>

</BarChart>

</ResponsiveContainer>

</div>

<div className="mt-5 grid grid-cols-2 gap-4">

<div className="rounded-xl bg-zinc-800/40 p-3">

<p className="text-xs uppercase tracking-wider text-zinc-500">

Minted

</p>

<p className="mt-2 text-2xl font-bold text-green-400">

{minted}

</p>

</div>

<div className="rounded-xl bg-zinc-800/40 p-3">

<p className="text-xs uppercase tracking-wider text-zinc-500">

Retired

</p>

<p className="mt-2 text-2xl font-bold text-red-400">

{retired}

</p>

</div>

</div>

</div>

  );
};

export default CreditsChart;
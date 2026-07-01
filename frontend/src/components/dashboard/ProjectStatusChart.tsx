import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  approved: number;
  review: number;
  rejected: number;
}

const COLORS = [
  "#22c55e",
  "#facc15",
  "#ef4444",
];

const ProjectStatusChart = ({
  approved,
  review,
  rejected,
}: Props) => {

  const data = [
    {
      name: "Approved",
      value: approved,
    },
    {
      name: "Review",
      value: review,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  const total =
    approved +
    review +
    rejected;

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

{/* Glow */}

<div
className="
absolute
-right-16
-top-16
h-56
w-56
rounded-full
bg-cyan-500/10
blur-3xl
group-hover:scale-125
transition
duration-500
"
/>

<div className="relative flex items-center justify-between mb-6">

<div>

<p className="text-xs uppercase tracking-[0.3em] text-cyan-400">

Analytics

</p>

<h2 className="text-2xl font-bold text-white mt-2">

Project Status

</h2>

</div>

<div className="rounded-2xl bg-cyan-500/10 px-4 py-2">

<p className="text-xs text-cyan-300">

Total Projects

</p>

<p className="text-2xl font-bold text-white">

{total}

</p>

</div>

</div>

<div className="h-[300px] relative">

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie
data={data}
dataKey="value"
nameKey="name"
innerRadius={75}
outerRadius={115}
paddingAngle={5}
stroke="#111827"
strokeWidth={3}
animationDuration={1200}
animationBegin={200}
>

{data.map((_, index) => (

<Cell
key={index}
fill={COLORS[index]}
/>

))}

</Pie>

<Tooltip
contentStyle={{
background:"#111827",
border:"1px solid #22d3ee",
borderRadius:"14px",
color:"#fff"
}}
/>

<Legend
verticalAlign="bottom"
iconType="circle"
wrapperStyle={{
paddingTop:"20px",
fontSize:"14px",
color:"#fff"
}}
/>

</PieChart>

</ResponsiveContainer>

{/* Center Glow */}

<div
className="
pointer-events-none
absolute
left-1/2
top-1/2
-translate-x-1/2
-translate-y-1/2
text-center
">

<p className="text-xs tracking-widest text-zinc-500">

TOTAL

</p>

<h2 className="text-4xl font-black text-white">

{total}

</h2>

</div>

</div>

</div>

  );
};

export default ProjectStatusChart;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Eye, Leaf } from "lucide-react";

interface Project {
  id: number;
  industry: string;
  fuel: string;
  credits: number;
  created_at: string;
}

interface Props {
  projects: Project[];
}

const RecentProjectsTable = ({ projects }: Props) => {

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
hover:border-cyan-500/30
transition-all
duration-300
">

{/* Glow */}

<div
className="
absolute
-right-20
-bottom-0
h-72
w-72
rounded-full
bg-cyan-500/10
blur-3xl
"
/>

<div className="relative flex items-center justify-between mb-8">

<div>

<p className="text-xs uppercase tracking-[0.3em] text-cyan-400">

Latest Activity

</p>

<h2 className="mt-2 text-2xl font-bold text-white">

Recent Projects

</h2>

</div>

<div className="rounded-xl bg-cyan-500/10 px-4 py-2">

<span className="text-cyan-300 font-semibold">

{projects.length} Projects

</span>

</div>

</div>

<Table>

<TableHeader>

<TableRow className="border-zinc-800">

<TableHead>ID</TableHead>

<TableHead>Industry</TableHead>

<TableHead>Fuel</TableHead>

<TableHead>Credits</TableHead>

<TableHead>Date</TableHead>

<TableHead className="text-right">

Status

</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{projects.map((project)=>(

<TableRow
key={project.id}
className="
border-zinc-800
hover:bg-cyan-500/5
transition
duration-200
">

<TableCell>

<div className="flex items-center gap-3">

<div
className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-cyan-500/10
">

<Leaf className="h-5 w-5 text-cyan-400"/>

</div>

<div>

<p className="font-semibold text-white">

#{project.id}

</p>

</div>

</div>

</TableCell>

<TableCell className="text-white">

{project.industry}

</TableCell>

<TableCell className="text-zinc-300">

{project.fuel}

</TableCell>

<TableCell>

<span
className="
rounded-full
bg-green-500/10
px-3
py-1
text-green-400
font-semibold
">

{project.credits}

</span>

</TableCell>

<TableCell className="text-zinc-400">

{new Date(project.created_at).toLocaleDateString()}

</TableCell>

<TableCell className="text-right">

<button
className="
inline-flex
items-center
gap-2
rounded-xl
bg-cyan-500/10
px-3
py-2
text-cyan-300
hover:bg-cyan-500
hover:text-white
transition
">

<Eye className="h-4 w-4"/>

View

</button>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</div>

  );

};

export default RecentProjectsTable;
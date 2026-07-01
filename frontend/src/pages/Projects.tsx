import { useEffect, useState } from "react";
import { getProjects } from "@/services/projectService";
import { useNavigate } from "react-router-dom";

const Projects = () => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((project) => {

  const query = search.toLowerCase();

  return (

    project.id.toString().includes(query) ||

    project.industry_type?.toLowerCase().includes(query) ||

    project.fuel_type?.toLowerCase().includes(query)

  );

});

  return (

<div className="space-y-8">

{/* HERO */}

<div className="relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-slate-950 via-[#081522] to-black p-10 shadow-2xl">

<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"/>

<div className="relative flex flex-col xl:flex-row justify-between gap-8">

<div>

<p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

CARBON CREDIT REGISTRY

</p>

<h1 className="mt-4 text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-transparent">

Projects

</h1>

<p className="mt-5 max-w-3xl text-lg text-zinc-400">

View every submitted carbon project that has passed through the AI validation,
governance review and blockchain lifecycle.

</p>

</div>

<div className="grid grid-cols-2 gap-4">

<div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

<p className="text-xs uppercase tracking-[0.25em] text-cyan-300">

TOTAL PROJECTS

</p>

<h2 className="mt-3 text-4xl font-black text-white">

{projects.length}

</h2>

</div>

<div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

<p className="text-xs uppercase tracking-[0.25em] text-green-300">

REGISTRY

</p>

<h2 className="mt-3 text-4xl font-black text-white">

LIVE

</h2>

</div>

</div>

</div>

</div>

{/* SEARCH */}

<div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-6 shadow-xl">

<div className="relative">

<svg
className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
xmlns="http://www.w3.org/2000/svg"
width="20"
height="20"
fill="none"
stroke="currentColor"
strokeWidth="2"
viewBox="0 0 24 24"
>

<circle cx="11" cy="11" r="8"/>

<path d="m21 21-4.3-4.3"/>

</svg>

<input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search by Project ID, Industry or Fuel..."
  className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 py-4 pl-14 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
/>

</div>

</div>

{/* TABLE */}

<div className="overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black shadow-2xl">

<table className="w-full">

<thead className="border-b border-zinc-800 bg-black/30">

<tr>

<th className="p-5 text-left text-cyan-300 uppercase text-xs tracking-[0.25em]">

Project

</th>

<th className="p-5 text-left text-cyan-300 uppercase text-xs tracking-[0.25em]">

Industry

</th>

<th className="p-5 text-left text-cyan-300 uppercase text-xs tracking-[0.25em]">

Fuel

</th>

<th className="p-5 text-left text-cyan-300 uppercase text-xs tracking-[0.25em]">

Energy

</th>

<th className="p-5 text-left text-cyan-300 uppercase text-xs tracking-[0.25em]">

Credits

</th>

<th className="p-5 text-right text-cyan-300 uppercase text-xs tracking-[0.25em]">

Actions

</th>

</tr>

</thead>

<tbody>

{loading && (

<tr>

<td
colSpan={6}
className="p-20 text-center text-zinc-400"
>

<div className="flex flex-col items-center gap-5">

<div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"/>

<p>

Loading Carbon Registry...

</p>

</div>

</td>

</tr>

)}

            {!loading &&
filteredProjects.map((project: any) => (

<tr
key={project.id}
className="
border-t
border-zinc-800
transition-all
duration-300
hover:bg-cyan-500/5
hover:scale-[1.002]
"
>

<td className="p-5">

<div className="flex items-center gap-4">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

🌿

</div>

<div>

<p className="text-lg font-bold text-white">

Project #{project.id}

</p>

<p className="text-xs text-zinc-500">

Carbon Registry

</p>

</div>

</div>

</td>

<td className="p-5">

<span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300 font-semibold">

{project.industry_type}

</span>

</td>

<td className="p-5">

<span className="rounded-full bg-orange-500/10 px-4 py-2 text-orange-300 font-semibold">

{project.fuel_type}

</span>

</td>

<td className="p-5">

<div>

<p className="text-2xl font-black text-yellow-400">

{project.energy_demand_mwh}

</p>

<p className="text-xs text-zinc-500">

MWh

</p>

</div>

</td>

<td className="p-5">

<div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">

<div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"/>

<p className="font-bold text-green-300">

{project.credits_traded_tco2}

</p>

</div>

</td>

<td className="p-5 text-right">

<button
onClick={() => navigate(`/projects/${project.id}`)}
className="
group
inline-flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-cyan-500
to-blue-600
px-5
py-3
font-bold
text-white
shadow-lg
shadow-cyan-500/20
transition-all
duration-300
hover:scale-105
hover:shadow-cyan-500/50
"
>

View Details

<span className="transition-transform group-hover:translate-x-1">

→

</span>

</button>

</td>

</tr>

))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Projects;
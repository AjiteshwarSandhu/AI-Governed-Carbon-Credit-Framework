import { useEffect, useState } from "react";

import {
  FolderOpen,
  CheckCircle,
  Coins,
  RotateCcw,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";

import { getDashboard } from "@/services/dashboardService";
import type { DashboardData } from "@/services/dashboardService";
import ProjectStatusChart from "@/components/dashboard/ProjectStatusChart";
import CreditsChart from "@/components/dashboard/CreditsChart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import RecentProjectsTable from "../components/dashboard/RecentProjectsTable";
import Pipeline from "../components/dashboard/Pipeline";
import {
  getRecentProjects,
  type RecentProject,
} from "../services/projectService";

const Dashboard = () => {

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [projects, setProjects] = useState<RecentProject[]>([]); 

  const [loading, setLoading] = useState(true);
  

  useEffect(() => {

    const loadDashboard = async () => {

  try {

    const [dashboardData, recentProjects] = await Promise.all([
      getDashboard(),
      getRecentProjects(),
    ]);

    setDashboard(dashboardData);
    setProjects(recentProjects);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

};

    loadDashboard();

  }, []);

  if (loading) {

    return (

      <div className="text-white text-xl">

        Loading Dashboard...

      </div>

    );

  }

  return (

    <div className="space-y-8">

     
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
 

        <StatCard
          title="Total Projects"
          value={dashboard!.total_projects}
          icon={FolderOpen}
          color="bg-cyan-500"
        />

        <StatCard
          title="Approved"
          value={dashboard!.approved}
          icon={CheckCircle}
          color="bg-green-500"
        />

        <StatCard
          title="Credits Minted"
          value={dashboard!.minted}
          icon={Coins}
          color="bg-yellow-500"
        />

        <StatCard
          title="Credits Retired"
          value={dashboard!.retired}
          icon={RotateCcw}
          color="bg-red-500"
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

       <ProjectStatusChart
    approved={dashboard!.approved}
    review={dashboard!.review}
    rejected={dashboard!.rejected}
  />

  <CreditsChart
    minted={dashboard!.minted}
    retired={dashboard!.retired}
  />

</div>

<div className="mt-8">
    <Pipeline />
</div>


<div className="mt-8">
    <RecentProjectsTable projects={projects} />
</div>

    </div>

    

  );

};

export default Dashboard;
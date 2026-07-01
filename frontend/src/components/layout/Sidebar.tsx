import {
  LayoutDashboard,
  FilePlus2,
  FolderOpen,
  Coins,
  ShieldCheck,
  Settings,
  Sparkles,
  Activity,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Submit Project",
    icon: FilePlus2,
    path: "/submit",
  },
  {
    name: "Projects",
    icon: FolderOpen,
    path: "/projects",
  },
  {
    name: "Carbon Credits",
    icon: Coins,
    path: "/credits",
  },
  {
    name: "Validators",
    icon: ShieldCheck,
    path: "/validators",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  return (
    <aside
      className="
      w-72
      h-screen
      shrink-0
      flex
      flex-col
      border-r
      border-cyan-500/10
      bg-gradient-to-b
      from-[#070b18]
      via-[#090f1f]
      to-black
      backdrop-blur-xl
      relative
      overflow-hidden
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -top-24
        -left-24
        h-72
        w-72
        rounded-full
        bg-cyan-500/10
        blur-3xl
        "
      />

      {/* Logo */}

      <div className="relative p-6 border-b border-white/5">

        <Logo />

        <div className="mt-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500 p-2">

              <Sparkles size={18} className="text-white" />

            </div>

            <div>

              <p className="text-sm font-semibold text-white">

                AI Governance

              </p>

              <p className="text-xs text-cyan-300">

                Carbon Platform

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="relative flex-1 px-4 py-6 space-y-3">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                group
                flex
                items-center
                gap-4
                rounded-2xl
                px-5
                py-4
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-cyan-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/20 text-cyan-300"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
                }
                `
              }
            >
              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-white/5
                group-hover:bg-cyan-500/20
                transition
                "
              >
                <Icon size={20} />
              </div>

              <span className="font-medium tracking-wide">

                {item.name}

              </span>

            </NavLink>

          );

        })}

      </nav>

      {/* Bottom Status */}

      <div className="relative border-t border-white/5 p-5">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-widest text-zinc-400">

                Blockchain

              </p>

              <h3 className="mt-2 text-lg font-bold text-white">

                Polygon Amoy

              </h3>

            </div>

            <Activity className="text-green-400" size={22} />

          </div>

          <div className="mt-5 flex items-center gap-2">

            <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

            <span className="text-sm text-green-400">

              Network Online

            </span>

          </div>

          <div className="mt-5 h-2 rounded-full bg-zinc-800 overflow-hidden">

            <div className="h-full w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400"></div>

          </div>

          <p className="mt-3 text-xs text-zinc-500">

            AI • Governance • Blockchain

          </p>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;
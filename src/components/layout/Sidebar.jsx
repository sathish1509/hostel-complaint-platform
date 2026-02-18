import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Users,
  CheckSquare,
  BarChart2,
  Home,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  const roleLinks = {
    student: [
      { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
      { name: "Raise Complaint", path: "/student/raise-complaint", icon: PlusCircle },
      { name: "My Complaints", path: "/student/my-complaints", icon: FileText },
    ],
    warden: [
      { name: "Dashboard", path: "/warden/dashboard", icon: LayoutDashboard },
      { name: "Supervision", path: "/warden/supervision", icon: CheckSquare },
      { name: "Analytics", path: "/warden/analytics", icon: BarChart2 },
    ],
    admin: [
      { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Users", path: "/admin/users", icon: Users },
      { name: "Complaints", path: "/admin/complaints", icon: FileText },
    ],
  };

  const links = roleLinks[user?.role] || [];

  const roleColors = {
    student: "from-blue-500 to-indigo-600",
    warden: "from-emerald-500 to-teal-600",
    admin: "from-purple-500 to-pink-600",
  };
  const gradientClass = roleColors[user?.role] || "from-primary-500 to-primary-700";

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 sidebar transition-transform duration-300 transform lg:translate-x-0",
        !isOpen && "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100/50 dark:border-gray-800/50">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg`}>
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              HostelFix
            </span>
          </div>
        </div>

        {/* Role Badge */}
        <div className="px-4 pt-4 pb-2">
          <div className={`text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-gradient-to-r ${gradientClass} text-white/90 inline-block`}>
            {user?.role} Portal
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {links.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={link.path}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                    isActive
                      ? `bg-gradient-to-r ${gradientClass} text-white shadow-lg`
                      : "nav-link-inactive"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={cn("w-5 h-5 mr-3 transition-transform group-hover:scale-110", isActive ? "text-white" : "")} />
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100/50 dark:border-gray-800/50">
          <div className={cn("flex items-center p-3 rounded-xl", user?.role === 'warden' ? 'bg-emerald-50 dark:bg-emerald-900/20' : user?.role === 'admin' ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-blue-50 dark:bg-blue-900/20')}>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0`}>
              {initials}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

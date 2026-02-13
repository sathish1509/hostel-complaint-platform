import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  CheckSquare, 
  BarChart2, 
  Home 
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();

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

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl transition-transform duration-300 transform lg:translate-x-0",
        !isOpen && "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-8 border-b border-gray-100 dark:border-gray-800">
          <Home className="w-6 h-6 text-primary-600 mr-2" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
            HostelFix
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                "flex items-center px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                isActive 
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 shadow-sm" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              <link.icon className="w-5 h-5 mr-3" />
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center p-3 mb-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <img 
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700"
            />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

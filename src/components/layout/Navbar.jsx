import { Bell, Menu, Sun, Moon, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NotificationDropdown from "./NotificationDropdown";
import ProfileModal from "../ui/ProfileModal";
import SettingsModal from "../ui/SettingsModal";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const roleColors = {
    student: "from-blue-500 to-indigo-600",
    warden: "from-emerald-500 to-teal-600",
    admin: "from-purple-500 to-pink-600",
  };
  const gradientClass = roleColors[user?.role] || "from-primary-500 to-primary-700";

  return (
    <>
    <header className="h-16 fixed top-0 right-0 left-0 lg:left-64 z-40 navbar px-6 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="hidden md:block text-lg font-semibold text-gray-800 dark:text-gray-200 ml-4">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h2>
      </div>

      <div className="flex items-center space-x-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900 animate-pulse" />
          </button>
          <AnimatePresence>
            {isNotifOpen && (
              <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
              {initials}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
              {user?.name?.split(" ")[0]}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
              >
                {/* Profile Header */}
                <div className={`p-4 bg-gradient-to-r ${gradientClass}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                      {initials}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{user?.name}</p>
                      <p className="text-white/70 text-xs capitalize">{user?.role}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={() => { setIsProfileModalOpen(true); setIsProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <User size={16} className="text-gray-400" />
                    View Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); }}
                  >
                    <Settings size={16} className="text-gray-400" />
                    Settings
                  </button>
                  <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <ProfileModal user={user} onClose={() => setIsProfileModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal
            user={user}
            onClose={() => setIsSettingsOpen(false)}
            onUpdateUser={(updated) => { updateUser(updated); }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

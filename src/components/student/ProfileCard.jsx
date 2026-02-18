
import { User, Phone, MapPin, Users, Building } from "lucide-react";
import { Card } from "../ui/Card";

const ProfileCard = ({ user }) => {
    if (!user) return null;

    return (
        <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden relative border border-gray-100 dark:border-gray-700">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10 p-6">
                
                {/* Avatar Section */}
                <div className="flex-shrink-0 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 blur transition duration-500"></div>
                    <div className="relative w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-2xl">
                        <img 
                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
                            alt={user.name} 
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                     <div className="absolute bottom-1 right-1 md:right-3 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full z-20" title="Active"></div>
                </div>

                {/* Info Section */}
                <div className="flex-1 w-full text-center md:text-left space-y-4">
                    <div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                            {user.name}
                        </h2>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-gray-400 mt-1">
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-full text-xs font-medium flex items-center gap-1.5 border border-gray-200 dark:border-gray-600">
                                <Building className="w-3.5 h-3.5" /> Block {user.block}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-full text-xs font-medium flex items-center gap-1.5 border border-gray-200 dark:border-gray-600">
                                <User className="w-3.5 h-3.5" /> Room {user.room}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                        {/* Mobile */}
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:border-primary-200 dark:hover:border-primary-800 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mobile</p>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.phone || "Not Added"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Parents */}
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:border-green-200 dark:hover:border-green-800 transition-colors group">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg group-hover:scale-110 transition-transform">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Parents</p>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.parentPhone || "Not Added"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                         <div className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-800 transition-colors group sm:col-span-2 lg:col-span-1">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg group-hover:scale-110 transition-transform">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</p>
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.currentStatus || "Unknown"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProfileCard;

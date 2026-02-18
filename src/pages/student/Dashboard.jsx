import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { AlertCircle, CheckCircle, Clock, List } from "lucide-react";
import { useComplaint } from "../../context/ComplaintContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import ComplaintDetailModal from "../../components/complaints/ComplaintDetailModal";
import ProfileCard from "../../components/student/ProfileCard";

const StudentDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { complaints } = useComplaint();
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    
    // Filter complaints for current user
    const myComplaints = complaints.filter(c => c.studentId === (user?.id || 's1'));
    
    // Calculate Stats
    const stats = [
        { label: "Total Complaints", value: myComplaints.length, icon: List, color: "bg-blue-500" },
        { label: "Pending", value: myComplaints.filter(c => c.status === 'Pending').length, icon: Clock, color: "bg-yellow-500" },
        { label: "Resolved", value: myComplaints.filter(c => c.status === 'Resolved').length, icon: CheckCircle, color: "bg-green-500" },
        { label: "Escalated", value: myComplaints.filter(c => c.status === 'Escalated').length, icon: AlertCircle, color: "bg-red-500" },
    ];

    return (
        <div className="space-y-8">
            {/* Profile Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ProfileCard user={user} />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, index) => (
                    <Card key={index} hover className="stat-card border-l-4" style={{borderLeftColor: stat.color}}> 
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
                            </div>
                            <div className={cn("p-3 rounded-xl shadow-inner", stat.color, "bg-opacity-20 dark:bg-opacity-10")}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')} dark:text-white`} />
                            </div>
                        </div>
                    </Card>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Recent Complaints</h2>
                    {myComplaints.slice(0, 3).map((complaint) => (
                        <div key={complaint.id} onClick={() => setSelectedComplaint(complaint)}>
                            <Card hover className="flex items-center justify-between p-4 cursor-pointer">
                                <div>
                                    <h4 className="font-semibold text-lg">{complaint.title}</h4>
                                    <p className="text-sm text-gray-500">{complaint.date} • {complaint.category}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                                      complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`
                                }>
                                    {complaint.status}
                                </span>
                            </Card>
                        </div>
                    ))}
                </div>
                
                <div>
                     <Card className="h-full bg-gradient-to-br from-primary-600 to-indigo-700 text-white">
                        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                        <p className="mb-6 opacity-90">Facing an issue in your room? Raise a complaint instantly.</p>
                        <button 
                            onClick={() => navigate('/student/raise-complaint')}
                            className="w-full py-3 bg-white text-primary-700 font-bold rounded-xl shadow-lg hover:bg-gray-50 transition-colors"
                        >
                            Raise Complaint
                        </button>
                     </Card>
                </div>
            </div>

            {/* Complaint Detail Modal */}
            {selectedComplaint && (
                <ComplaintDetailModal 
                    complaint={selectedComplaint} 
                    onClose={() => setSelectedComplaint(null)} 
                />
            )}
        </div>
    );
};

export default StudentDashboard;

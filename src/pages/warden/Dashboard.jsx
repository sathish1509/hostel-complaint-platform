import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { AlertTriangle, Clock, Activity, CheckCircle2 } from "lucide-react";
import { useComplaint } from "../../context/ComplaintContext";

const WardenDashboard = () => {
    const { complaints } = useComplaint();
    // Filter for warden's block (mock: Block A)
    const blockComplaints = complaints.filter(c => c.block === 'A');

    const stats = [
        { label: "Pending Actions", value: blockComplaints.filter(c => c.status === 'Pending').length, icon: AlertTriangle, color: "text-orange-500" },
        { label: "In Progress", value: blockComplaints.filter(c => c.status === 'In Progress').length, icon: Activity, color: "text-blue-500" },
        { label: "Resolved Today", value: 2, icon: CheckCircle2, color: "text-green-500" },
        { label: "SLA Breached", value: 1, icon: Clock, color: "text-red-500" },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Warden Dashboard - Block A</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} hover className="border-t-4 border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full bg-gray-50 dark:bg-gray-800 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="font-bold text-lg mb-4">Pending Approvals</h3>
                    <div className="space-y-4">
                        {blockComplaints.filter(c => c.status === 'Pending').map(c => (
                            <div key={c.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{c.title}</h4>
                                    <p className="text-sm text-gray-500">{c.room} • {c.studentName}</p>
                                </div>
                                <button className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700">
                                    Review
                                </button>
                            </div>
                        ))}
                        {blockComplaints.filter(c => c.status === 'Pending').length === 0 && (
                            <p className="text-center text-gray-500 py-4">No pending approvals</p>
                        )}
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                    {/* Mock Activity Feed */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                            <div>
                                <p className="text-sm text-gray-800 dark:text-gray-200">New complaint raised in Room 102</p>
                                <p className="text-xs text-gray-400">2 hours ago</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                            <div>
                                <p className="text-sm text-gray-800 dark:text-gray-200">Resolved Plumbing issue in Room 305</p>
                                <p className="text-xs text-gray-400">5 hours ago</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default WardenDashboard;

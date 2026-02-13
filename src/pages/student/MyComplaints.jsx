import { useState } from "react";
import ComplaintDetailModal from "../../components/complaints/ComplaintDetailModal";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { useComplaint } from "../../context/ComplaintContext";
import { Search, Filter, Clock, CheckCircle2, ChevronRight } from "lucide-react";

const MyComplaints = () => {
    const { complaints } = useComplaint();
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const myComplaints = complaints.filter(c => c.studentId === 's1'); // Mock ID
    
    // Filter Logic
    const filtered = myComplaints.filter(c => {
        const matchesStatus = filter === "All" || c.status === filter;
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const statusColors = {
        'Pending': 'warning',
        'In Progress': 'info',
        'Resolved': 'success',
        'Escalated': 'danger'
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Complaints</h1>
                
                <div className="flex gap-2">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search ID or Title..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
                        />
                    </div>
                    <select 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filtered.map((complaint) => (
                    <div key={complaint.id} onClick={() => setSelectedComplaint(complaint)}>
                        <Card hover className="group transition-all cursor-pointer">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-mono text-xs text-gray-400">#{complaint.id}</span>
                                        <Badge variant={statusColors[complaint.status] || 'default'}>{complaint.status}</Badge>
                                        <span className="text-xs text-gray-400">• {complaint.date}</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition-colors">
                                        {complaint.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                                        {complaint.description}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <p className="text-xs font-medium text-gray-500">Priority</p>
                                        <p className={`text-sm font-semibold ${
                                            complaint.priority === 'High' ? 'text-red-500' : 
                                            complaint.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
                                        }`}>
                                            {complaint.priority}
                                        </p>
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 group-hover:text-primary-600 transition-colors">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}

                {filtered.length === 0 && (
                     <div className="py-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                            <Filter className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No complaints found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                )}
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

export default MyComplaints;

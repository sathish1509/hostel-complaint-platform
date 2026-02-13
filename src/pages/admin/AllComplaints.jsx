import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { useComplaint } from "../../context/ComplaintContext";
import { Search, Trash2, Eye } from "lucide-react";
import { toast } from "react-hot-toast";

const AllComplaints = () => {
    const { complaints } = useComplaint();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filtered = complaints.filter(c => {
        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                              c.studentName.toLowerCase().includes(search.toLowerCase()) ||
                              c.block.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleDelete = (id) => {
        toast.success(`Complaint ${id} deleted`);
        // In real app, call delete API
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Global Complaints</h1>
                
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            placeholder="Search complaints..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Escalated">Escalated</option>
                    </select>
                </div>
            </div>

            <Card noPadding className="overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase font-semibold text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Block / Room</th>
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {filtered.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">{complaint.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{complaint.title}</td>
                                <td className="px-6 py-4">{complaint.block}-{complaint.room}</td>
                                <td className="px-6 py-4">{complaint.studentName}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={
                                        complaint.status === 'Resolved' ? 'success' : 
                                        complaint.status === 'Escalated' ? 'danger' :
                                        complaint.status === 'Pending' ? 'warning' : 'info'
                                    }>{complaint.status}</Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                            <Eye size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(complaint.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-8 text-gray-400">No complaints found.</div>
                )}
            </Card>
        </div>
    );
};

export default AllComplaints;

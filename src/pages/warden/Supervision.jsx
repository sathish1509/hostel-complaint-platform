import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useComplaint } from "../../context/ComplaintContext";
import { CheckCircle, XCircle, Clock, MessageSquare, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";

const Supervision = () => {
    const { complaints, updateStatus, escalateComplaint } = useComplaint();
    const [filter, setFilter] = useState("Pending");

    // Filter mainly for pending/approved to take action
    const blockComplaints = complaints.filter(c => c.block === 'A' && (filter === "All" || c.status === filter));

    const handleAction = (id, action) => {
        if (action === 'Approve') {
            updateStatus(id, 'Approved', 'Approved by Warden. Maintenance assigned.');
        } else if (action === 'Reject') {
            updateStatus(id, 'Rejected', 'Rejected by Warden. Reason: Invalid complaint.');
        } else if (action === 'Resolve') {
            updateStatus(id, 'Resolved', 'Issue resolved verified by Warden.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Supervision Panel</h1>
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    {['Pending', 'Approved', 'In Progress', 'Resolved'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                filter === status 
                                ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {blockComplaints.map((complaint) => (
                    <Card key={complaint.id} hover className="border-l-4" style={{ borderLeftColor: complaint.priority === 'High' ? 'red' : 'blue' }}>
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-mono text-xs text-gray-400">#{complaint.id}</span>
                                    <Badge variant={complaint.priority === 'High' ? 'danger' : 'default'}>{complaint.priority}</Badge>
                                    <span className="text-xs text-gray-500">• Block {complaint.block}, Room {complaint.room}</span>
                                </div>
                                <h3 className="font-semibold text-lg">{complaint.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{complaint.description}</p>
                                
                                <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{complaint.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare size={14} />
                                        <span>{complaint.studentName}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {complaint.status === 'Pending' && (
                                    <>
                                        <Button size="sm" onClick={() => handleAction(complaint.id, 'Approve')} className="bg-green-600 hover:bg-green-700">
                                            <CheckCircle size={16} className="mr-1" /> Approve
                                        </Button>
                                        <Button size="sm" variant="danger" onClick={() => handleAction(complaint.id, 'Reject')}>
                                            <XCircle size={16} className="mr-1" /> Reject
                                        </Button>
                                    </>
                                )}
                                {complaint.status === 'Approved' && (
                                     <Button size="sm" onClick={() => updateStatus(complaint.id, 'In Progress')} className="bg-blue-600 hover:bg-blue-700">
                                        Start Work
                                    </Button>
                                )}
                                {(complaint.status === 'In Progress' || complaint.status === 'Approved') && (
                                    <Button size="sm" onClick={() => handleAction(complaint.id, 'Resolve')} className="bg-indigo-600 hover:bg-indigo-700">
                                        Mark Resolved
                                    </Button>
                                )}
                                {complaint.status !== 'Resolved' && complaint.status !== 'Rejected' && (
                                     <Button size="sm" variant="outline" onClick={() => escalateComplaint(complaint.id)} className="text-red-500 border-red-500 hover:bg-red-50">
                                        <AlertTriangle size={16} className="mr-1" /> Escalate
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}

                 {blockComplaints.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No complaints found with status "{filter}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default Supervision;

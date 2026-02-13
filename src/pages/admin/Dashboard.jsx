import { Card } from "../../components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useComplaint } from "../../context/ComplaintContext";

const AdminDashboard = () => {
    const { complaints } = useComplaint();

    const data = [
        { name: 'Jan', complaints: 40 },
        { name: 'Feb', complaints: 30 },
        { name: 'Mar', complaints: 20 },
        { name: 'Apr', complaints: 27 },
        { name: 'May', complaints: 18 },
        { name: 'Jun', complaints: 23 },
    ];

    const pieData = [
        { name: 'Pending', value: complaints.filter(c => c.status === 'Pending').length },
        { name: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length },
        { name: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length },
    ];

    const COLORS = ['#FBBF24', '#3B82F6', '#10B981', '#EF4444'];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Overview</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-lg font-bold mb-6">Monthly Complaints Trend</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    cursor={{ fill: '#F3F4F6' }}
                                />
                                <Bar dataKey="complaints" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-bold mb-6">Complaint Status Distribution</h3>
                    <div className="h-64 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                        {pieData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                                {entry.name}: {entry.value}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="text-lg font-bold mb-4">Recent Escalations</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                         <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase font-semibold text-gray-700 dark:text-gray-300">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Issue</th>
                                <th className="px-6 py-3">Block</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium">C-1005</td>
                                <td className="px-6 py-4">WiFi Not Working</td>
                                <td className="px-6 py-4">B</td>
                                <td className="px-6 py-4">Oct 26, 2023</td>
                                <td className="px-6 py-4"><span className="text-red-500 font-semibold">Escalated</span></td>
                                <td className="px-6 py-4"><button className="text-primary-600 hover:underline">View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;

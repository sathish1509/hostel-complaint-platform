import { Card } from "../../components/ui/Card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const WardenAnalytics = () => {
    // Mock analytics data
    const categoryData = [
        { name: 'Electrical', value: 12 },
        { name: 'Plumbing', value: 8 },
        { name: 'Cleaning', value: 5 },
        { name: 'Wifi', value: 15 },
    ];
    
    const timeData = [
        { name: 'Week 1', resolved: 10, pending: 5 },
        { name: 'Week 2', resolved: 15, pending: 3 },
        { name: 'Week 3', resolved: 8, pending: 8 },
        { name: 'Week 4', resolved: 20, pending: 2 },
    ];

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Block A Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="font-bold text-lg mb-6">Complaints by Category</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={categoryData} 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={80} 
                                    dataKey="value" 
                                    label 
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-lg mb-6">Resolution Performance</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={timeData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="resolved" fill="#82ca9d" name="Resolved" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="pending" fill="#ff7f50" name="Pending" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default WardenAnalytics;

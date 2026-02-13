import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Search, MoreHorizontal, Shield, ShieldOff, Trash2 } from "lucide-react";

// Mock User Data
const MOCK_USERS = [
    { id: 1, name: "John Student", email: "student@hostel.com", role: "student", status: "Active" },
    { id: 2, name: "Mr. Warden", email: "warden@hostel.com", role: "warden", status: "Active" },
    { id: 3, name: "Alice Smith", email: "alice@hostel.com", role: "student", status: "Blocked" },
    { id: 4, name: "Bob Jones", email: "bob@hostel.com", role: "student", status: "Active" },
];

const Users = () => {
    const [users, setUsers] = useState(MOCK_USERS);
    const [search, setSearch] = useState("");

    const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    const toggleStatus = (id) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                </div>
            </div>

            <Card noPadding className="overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase font-semibold text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {filtered.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 capitalize">{user.role}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>{user.status}</Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => toggleStatus(user.id)}
                                            className={`p-2 rounded-lg transition-colors ${user.status === 'Active' ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}
                                            title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                                        >
                                            {user.status === 'Active' ? <ShieldOff size={18} /> : <Shield size={18} />}
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default Users;

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useComplaint } from "../../context/ComplaintContext";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RaiseComplaint = () => {
    const { addComplaint } = useComplaint();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Electrical");
    const [priority, setPriority] = useState("Medium");
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newComplaint = {
            title,
            description,
            category,
            priority,
            image, // This would be a URL in real app
            studentName: "John Student", // Mock
            studentId: "s1",
            room: "101",
            block: "A"
        };

        // Simulate API call
        setTimeout(() => {
            addComplaint(newComplaint);
            setIsSubmitting(false);
            navigate('/student/dashboard');
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Raise New Complaint</h1>
            
            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input 
                        label="Complaint Title" 
                        placeholder="e.g., Leaking Tap in Bathroom" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary-500/20"
                        >
                            <option>Electrical</option>
                            <option>Plumbing</option>
                            <option>Carpentry</option>
                            <option>Cleaning</option>
                            <option>Internet</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority Level</label>
                        <div className="flex gap-4">
                            {['Low', 'Medium', 'High'].map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPriority(p)}
                                    className={`flex-1 py-2 rounded-lg border font-medium transition-all ${
                                        priority === p 
                                        ? p === 'High' ? 'bg-red-50 border-red-200 text-red-600' : p === 'Medium' ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-green-50 border-green-200 text-green-600'
                                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            rows="4"
                            placeholder="Describe the issue in detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer relative">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {image ? (
                                <div className="relative inline-block">
                                    <img src={image} alt="Preview" className="h-32 rounded-lg object-cover" />
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setImage(null); }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                    <Upload size={32} className="mb-2" />
                                    <p className="text-sm">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" isLoading={isSubmitting} className="w-full py-3">
                            Submit Complaint
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default RaiseComplaint;

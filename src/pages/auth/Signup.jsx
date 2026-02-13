import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { User, Mail, Lock, Building, Layers } from "lucide-react";
import { toast } from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate Signup
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Account created! Please login.");
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 relative overflow-hidden">
             {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-800"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create Account</h1>
                    <p className="text-gray-500 dark:text-gray-400">Join the hostel community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input icon={User} placeholder="First Name" required />
                        <Input icon={User} placeholder="Last Name" required />
                    </div>
                    
                    <Input icon={Mail} type="email" placeholder="Email Address" required />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <Input icon={Layers} placeholder="Block (e.g., A)" required />
                        <Input icon={Building} placeholder="Room No (e.g., 101)" required />
                    </div>

                    <Input icon={Lock} type="password" placeholder="Password" required />
                    <Input icon={Lock} type="password" placeholder="Confirm Password" required />

                    <div className="pt-4">
                        <Button type="submit" isLoading={isLoading} className="w-full py-3 text-lg">
                            Sign Up
                        </Button>
                    </div>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        Already have an account? 
                        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold ml-1">
                            Sign In
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;

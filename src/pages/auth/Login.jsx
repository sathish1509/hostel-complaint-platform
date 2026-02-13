import { useState } from "react";

import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Lock, User, AtSign, Building2 } from "lucide-react";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "student" });
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(formData.email, formData.password, formData.role);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-800"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-600 mb-6 shadow-lg shadow-primary-500/30">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to manage your complaints</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Tab Switcher */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl mb-6">
                {['student', 'warden', 'admin'].map((role) => (
                    <button
                        key={role}
                        type="button"
                        onClick={() => setFormData({ ...formData, role })}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all duration-200 ${
                            formData.role === role 
                            ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                        }`}
                    >
                        {role}
                    </button>
                ))}
            </div>

          <Input
            icon={AtSign}
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Button type="submit" isLoading={isSubmitting} className="w-full py-3 text-lg">
            Sign In
          </Button>

          {formData.role === 'student' && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Don't have an account? 
                <a href="/signup" className="text-primary-600 hover:text-primary-700 font-semibold ml-1">Sign up</a>
            </p>
          )}

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-center text-gray-400">
                    Use <span className="font-mono text-gray-500">
                        {formData.role === 'admin' ? 'admin@hostel.com' : 
                         formData.role === 'warden' ? 'warden@hostel.com' : 
                         'student@hostel.com'} / 123
                    </span> for demo
                </p>
            </div>
        </form>
      </motion.div>
    </div>
  );
};

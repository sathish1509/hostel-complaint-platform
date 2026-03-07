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
    <div className="min-h-screen flex items-center justify-center bg-dark-50 dark:bg-dark-950 p-6 relative overflow-hidden">
        {/* Advanced Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                x: [0, 100, 0],
                y: [0, -50, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[120px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -120, 0],
                x: [0, -80, 0],
                y: [0, 100, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]" 
            />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0,transparent_70%)]" />
        </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="w-full max-w-lg glass-panel rounded-[2.5rem] p-10 lg:p-12 border border-white/40 dark:border-white/5 shadow-premium relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-primary-600 to-indigo-600 mb-8 shadow-2xl shadow-primary-500/40 relative"
          >
            <div className="absolute inset-0 bg-white/20 rounded-[2rem] animate-pulse" />
            <Building2 className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          <h1 className="text-4xl font-extrabold tracking-tight text-dark-950 dark:text-white mb-3">
            Welcome Back
          </h1>
          <p className="text-dark-500 dark:text-dark-400 font-medium">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Role Tab Switcher */}
            <div className="bg-dark-100/50 dark:bg-dark-900/50 p-1.5 rounded-2xl flex items-center justify-between border border-dark-200/50 dark:border-dark-800/30">
                {['student', 'warden', 'admin'].map((role) => (
                    <button
                        key={role}
                        type="button"
                        onClick={() => setFormData({ ...formData, role })}
                        className={`flex-1 py-3 text-xs font-bold rounded-xl capitalize transition-all duration-300 tracking-widest ${
                            formData.role === role 
                            ? 'bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400 shadow-premium' 
                            : 'text-dark-400 dark:text-dark-500 hover:text-dark-600 dark:hover:text-dark-300'
                        }`}
                    >
                        {role}
                    </button>
                ))}
            </div>

            <div className="space-y-5">
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
            </div>

          <Button type="submit" isLoading={isSubmitting} className="w-full py-4 text-sm font-bold tracking-widest uppercase">
            Sign In to Account
          </Button>

          {formData.role === 'student' && (
            <p className="text-center text-sm text-dark-500 dark:text-dark-400 mt-8 font-medium">
                Don't have an account? 
                <a href="/signup" className="text-primary-600 dark:text-primary-400 hover:underline font-bold ml-1">Create free account</a>
            </p>
          )}

            <div className="mt-10 pt-8 border-t border-dark-100 dark:border-dark-800/50">
                <div className="bg-primary-50 dark:bg-primary-900/10 p-4 rounded-2xl border border-primary-100/50 dark:border-primary-800/20">
                  <p className="text-[10px] font-bold text-center text-primary-600 dark:text-primary-400 uppercase tracking-[0.15em] mb-1">
                      Demo Credentials
                  </p>
                  <p className="text-xs text-center font-mono text-primary-700/70 dark:text-primary-300/50">
                      {formData.role === 'admin' ? 'admin@hostel.com' : 
                       formData.role === 'warden' ? 'warden@hostel.com' : 
                       'student@hostel.com'} / 123
                  </p>
                </div>
            </div>
        </form>
      </motion.div>
    </div>
  );
};

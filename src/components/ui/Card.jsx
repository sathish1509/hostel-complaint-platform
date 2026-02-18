import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const Card = ({ children, className, hover = false, noPadding = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "card overflow-hidden",
        hover && "card-hover cursor-pointer",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ title, subtitle, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

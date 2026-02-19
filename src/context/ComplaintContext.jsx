import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const ComplaintContext = createContext();

export const useComplaint = () => useContext(ComplaintContext);

const DEMO_COMPLAINTS = [
  { 
    id: '1', 
    title: 'Water leakage in Room 101', 
    description: 'The tap in the bathroom is constantly leaking.', 
    category: 'Plumbing',
    status: 'Pending',
    createdAt: new Date().toISOString(),
    studentId: '1',
    studentName: 'Student Demo'
  },
  { 
    id: '2', 
    title: 'Fan not working', 
    description: 'The ceiling fan is making a loud noise and not spinning.', 
    category: 'Electrical',
    status: 'In Progress',
    createdAt: new Date().toISOString(),
    studentId: '1',
    studentName: 'Student Demo'
  },
];

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = () => {
    setLoading(true);
    const stored = localStorage.getItem("complaints");
    if (stored) {
      setComplaints(JSON.parse(stored));
    } else {
      setComplaints(DEMO_COMPLAINTS);
      localStorage.setItem("complaints", JSON.stringify(DEMO_COMPLAINTS));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const addComplaint = async (complaintData) => {
    const newComplaint = {
      ...complaintData,
      id: Date.now().toString(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      upvotes: 0
    };

    const updated = [newComplaint, ...complaints];
    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
    toast.success("Complaint raised successfully!");
    return newComplaint;
  };

  const updateStatus = async (id, newStatus, note = "") => {
    const updated = complaints.map(c => 
      c.id === id ? { ...c, status: newStatus, updateNote: note } : c
    );
    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
    toast.success(`Status updated to ${newStatus}`);
  };

  const escalateComplaint = async (id) => {
    await updateStatus(id, "Escalated", "Escalated to Admin due to delay");
  };
  
  const upvoteComplaint = async (id) => {
    const updated = complaints.map(c => 
      c.id === id ? { ...c, upvotes: (c.upvotes || 0) + 1 } : c
    );
    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  return (
    <ComplaintContext.Provider value={{ 
      complaints, 
      loading, 
      addComplaint, 
      updateStatus, 
      escalateComplaint, 
      upvoteComplaint,
      refreshComplaints: fetchComplaints 
    }}>
      {children}
    </ComplaintContext.Provider>
  );
};

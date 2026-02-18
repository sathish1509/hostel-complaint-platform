import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../utils/api";

const ComplaintContext = createContext();

export const useComplaint = () => useContext(ComplaintContext);

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await api.get('/complaints');
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const addComplaint = async (complaintData) => {
    try {
      const response = await api.post('/complaints', complaintData);
      setComplaints(prev => [response.data, ...prev]);
      toast.success("Complaint raised successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to raise complaint");
      throw error;
    }
  };

  const updateStatus = async (id, newStatus, note = "") => {
    try {
      const response = await api.patch(`/complaints/${id}/status`, { status: newStatus, note });
      setComplaints(prev => prev.map(c => c.id === id ? response.data : c));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const escalateComplaint = async (id) => {
    await updateStatus(id, "Escalated", "Escalated to Admin due to delay");
  };
  
  const upvoteComplaint = async (id) => {
    try {
      const response = await api.patch(`/complaints/${id}/upvote`);
      setComplaints(prev => prev.map(c => c.id === id ? response.data : c));
    } catch (error) {
      toast.error("Action failed");
    }
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

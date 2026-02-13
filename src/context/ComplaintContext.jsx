import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const ComplaintContext = createContext();

export const useComplaint = () => useContext(ComplaintContext);

// Mock Initial Data
const INITIAL_COMPLAINTS = [
  {
    id: "C-1001",
    title: "Leaking Tap in Room 101",
    description: "The bathroom tap is leaking continuously.",
    category: "Plumbing",
    priority: "High",
    status: "Pending", // Pending, Approved, In Progress, Resolved, Escalated
    date: "2023-10-25",
    studentName: "John Student",
    studentId: "s1",
    room: "101",
    block: "A",
    upvotes: 2,
    images: [],
    timeline: [
        { status: 'Submitted', date: '2023-10-25', note: 'Complaint raised by student' }
    ]
  },
  {
    id: "C-1002",
    title: "Broken Fan Regulator",
    description: "Fan regulator is loose and not working.",
    category: "Electrical",
    priority: "Medium",
    status: "In Progress",
    date: "2023-10-24",
    studentName: "Mike Ross",
    studentId: "s2",
    room: "102",
    block: "A",
    upvotes: 0,
    images: [],
    timeline: [
        { status: 'Submitted', date: '2023-10-24', note: 'Complaint raised' },
        { status: 'Approved', date: '2023-10-25', note: 'Approved by Warden' },
        { status: 'In Progress', date: '2023-10-26', note: 'Electrician assigned' }
    ]
  }
];

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem("complaints");
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  const addComplaint = (complaint) => {
    const newComplaint = {
      ...complaint,
      id: `C-${1000 + complaints.length + 1}`,
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      upvotes: 0,
      timeline: [{ status: 'Submitted', date: new Date().toISOString().split('T')[0], note: 'Complaint raised' }]
    };
    setComplaints([newComplaint, ...complaints]);
    toast.success("Complaint raised successfully!");
  };

  const updateStatus = (id, newStatus, note = "") => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const updatedTimeline = [...c.timeline, { 
            status: newStatus, 
            date: new Date().toISOString().split('T')[0], 
            note 
        }];
        return { ...c, status: newStatus, timeline: updatedTimeline };
      }
      return c;
    }));
    toast.success(`Complaint status updated to ${newStatus}`);
  };

  const escalateComplaint = (id) => {
      updateStatus(id, "Escalated", "Escalated to Admin due to delay");
  };
  
  const upvoteComplaint = (id) => {
      setComplaints(prev => prev.map(c => c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c));
  };

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint, updateStatus, escalateComplaint, upvoteComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
};

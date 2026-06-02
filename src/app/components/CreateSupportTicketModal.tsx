import { X, AlertCircle } from "lucide-react";
import { useState } from "react";

interface CreateSupportTicketModalProps {
  show: boolean;
  onClose: () => void;
  customerName: string;
  customerId: string;
  customerEmail: string;
  onCreateTicket?: (ticket: any) => void;
}

export function CreateSupportTicketModal({ show, onClose, customerName, customerId, customerEmail, onCreateTicket }: CreateSupportTicketModalProps) {
  const [subject, setSubject] = useState("");
  const [issueType, setIssueType] = useState<"Order Issue" | "Product Question" | "Shipping Delay" | "Return Request" | "Technical Issue" | "General Inquiry">("Order Issue");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");

  if (!show) return null;

  const issueTypes: Array<"Order Issue" | "Product Question" | "Shipping Delay" | "Return Request" | "Technical Issue" | "General Inquiry"> = [
    "Order Issue",
    "Product Question",
    "Shipping Delay",
    "Return Request",
    "Technical Issue",
    "General Inquiry",
  ];

  const priorities = ["Low", "Medium", "High", "Urgent"];

  const mockAgents = ["Sarah Johnson", "Michael Chen", "Emma Davis", "James Wilson"];

  const handleCreate = () => {
    if (!subject.trim() || !description.trim()) {
      return;
    }

    const newTicket = {
      id: `TICKET-${Math.floor(Math.random() * 100000)}`,
      customerId,
      customerName,
      customerEmail,
      subject,
      issueType,
      priority,
      description,
      status: "Open" as const,
      assignedTo: assignTo || "",
      createdDate: new Date().toISOString().split("T")[0],
      notes: [],
      tags: [],
    };

    if (onCreateTicket) {
      onCreateTicket(newTicket);
    }

    // Reset form
    setSubject("");
    setIssueType("Order Issue");
    setPriority("Medium");
    setDescription("");
    setAssignTo("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Create Support Ticket</h2>
            <p className="text-gray-600 mt-1">For customer: {customerName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Subject */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of the issue"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Issue Type and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {issueTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Assign To */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Assign To</label>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Unassigned</option>
              {mockAgents.map((agent) => (
                <option key={agent} value={agent}>{agent}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about the issue..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p>The customer will receive an email notification when this ticket is created. You can add internal notes that won't be visible to the customer.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!subject.trim() || !description.trim()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

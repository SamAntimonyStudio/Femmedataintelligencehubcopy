import { X, Calendar, User, AlertCircle, CheckCircle, Clock, MessageSquare, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { SupportTicket } from "../data/customerData";

interface SupportTicketModalProps {
  show: boolean;
  onClose: () => void;
  ticket: SupportTicket;
  onUpdate?: (ticket: SupportTicket) => void;
}

export function SupportTicketModal({ show, onClose, ticket, onUpdate }: SupportTicketModalProps) {
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [assignedTo, setAssignedTo] = useState(ticket.assignedTo);
  const [newNote, setNewNote] = useState("");

  if (!show) return null;

  const statusColors: Record<string, string> = {
    Open: "bg-blue-100 text-blue-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    "Waiting on Customer": "bg-orange-100 text-orange-800",
    Resolved: "bg-green-100 text-green-800",
    Closed: "bg-gray-100 text-gray-800",
  };

  const priorityColors = {
    Low: "bg-gray-100 text-gray-800",
    Medium: "bg-blue-100 text-blue-800",
    High: "bg-orange-100 text-orange-800",
    Urgent: "bg-red-100 text-red-800",
  };

  const mockAgents = ["Sarah Johnson", "Michael Chen", "Emma Davis", "James Wilson"];

  const mockNotes = [
    {
      id: "1",
      author: "Sarah Johnson",
      timestamp: "2026-04-27 14:30",
      content: "Customer contacted via email. Investigating the issue with their order.",
      type: "internal" as const,
    },
    {
      id: "2",
      author: "System",
      timestamp: "2026-04-27 15:15",
      content: "Order #12345 found. Payment processed successfully.",
      type: "system" as const,
    },
    {
      id: "3",
      author: "Sarah Johnson",
      timestamp: "2026-04-27 16:00",
      content: "Sent replacement order confirmation to customer.",
      type: "customer" as const,
    },
  ];

  const handleSaveChanges = () => {
    if (onUpdate) {
      onUpdate({
        ...ticket,
        status,
        priority,
        assignedTo,
      });
    }
    onClose();
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In real app, this would add to ticket notes
      setNewNote("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl">Ticket #{ticket.id}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
                  {status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${priorityColors[priority]}`}>
                  {priority}
                </span>
              </div>
              <p className="text-gray-600">{ticket.subject}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Ticket Metadata */}
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Customer</div>
                <div>{ticket.customerName}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Created</div>
                <div>{ticket.createdDate}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Resolved</div>
                <div>{ticket.resolvedDate || "Not yet resolved"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Category</div>
                <div>{ticket.issueType}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Ticket Details */}
            <div className="col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm mb-2 text-gray-500">Description</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{ticket.description}</p>
                </div>
              </div>

              {/* Notes/Activity Timeline */}
              <div>
                <h3 className="text-sm mb-3 text-gray-500">Activity & Notes</h3>
                <div className="space-y-3">
                  {mockNotes.map((note) => (
                    <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm">
                            {note.author.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm">{note.author}</div>
                            <div className="text-xs text-gray-500">{note.timestamp}</div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          note.type === "internal" ? "bg-purple-100 text-purple-800" :
                          note.type === "system" ? "bg-gray-100 text-gray-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {note.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Note */}
              <div>
                <h3 className="text-sm mb-2 text-gray-500">Add Note</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Type a note or message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onKeyPress={(e) => e.key === "Enter" && handleAddNote()}
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Settings */}
            <div className="space-y-4">
              {/* Status Update */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm mb-3 text-gray-500">Status</h3>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Waiting on Customer">Waiting on Customer</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Priority Update */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm mb-3 text-gray-500">Priority</h3>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              {/* Assign Agent */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm mb-3 text-gray-500">Assigned To</h3>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Unassigned</option>
                  {mockAgents.map((agent) => (
                    <option key={agent} value={agent}>{agent}</option>
                  ))}
                </select>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm mb-3 text-gray-500">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Mark Resolved
                  </button>
                  <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <Paperclip className="w-4 h-4" />
                    Add Attachment
                  </button>
                  <button className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Escalate
                  </button>
                </div>
              </div>
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
            onClick={handleSaveChanges}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

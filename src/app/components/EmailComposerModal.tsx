import { X, Send, FileText, Edit2, User, Mail } from "lucide-react";
import { useState } from "react";

interface EmailComposerModalProps {
  show: boolean;
  onClose: () => void;
  customerName: string;
  customerEmail: string;
  onSend?: (email: { template: string; subject: string; body: string }) => void;
}

const emailTemplates = [
  {
    id: "welcome",
    name: "Welcome Email",
    subject: "Welcome to Femme - Enjoy 15% Off Your First Order!",
    body: `Hi {{customerName}},

Welcome to the Femme family! We're thrilled to have you join our community of fashion-forward women.

As a special welcome gift, enjoy 15% off your first order with code: WELCOME15

Explore our latest collection and find pieces that speak to your unique style.

Best regards,
The Femme Team`,
  },
  {
    id: "thank_you",
    name: "Thank You for Purchase",
    subject: "Thank You for Your Order!",
    body: `Hi {{customerName}},

Thank you for your recent purchase! We're preparing your order and it will be on its way soon.

Your support means the world to us. We hope you love your new pieces as much as we loved curating them for you.

Track your order here: [Order Tracking Link]

Best regards,
The Femme Team`,
  },
  {
    id: "reengagement",
    name: "We Miss You",
    subject: "We Miss You! Here's 20% Off Just for You",
    body: `Hi {{customerName}},

We noticed it's been a while since your last visit, and we miss having you as part of our community!

We'd love to see you back. Here's an exclusive 20% off discount code just for you: WELCOME20

Check out what's new in our collection - we have some pieces we think you'll absolutely love.

Best regards,
The Femme Team`,
  },
  {
    id: "birthday",
    name: "Birthday Gift",
    subject: "Happy Birthday from Femme! 🎉",
    body: `Hi {{customerName}},

Happy Birthday! 🎂✨

To celebrate your special day, we're sending you a gift - enjoy 25% off your next purchase with code: BIRTHDAY25

Treat yourself to something special. You deserve it!

Best wishes,
The Femme Team`,
  },
  {
    id: "vip_upgrade",
    name: "VIP Tier Upgrade",
    subject: "Congratulations! You've Reached VIP Status",
    body: `Hi {{customerName}},

Congratulations on reaching VIP status in our loyalty program! 🌟

You now have access to exclusive benefits:
• Early access to new collections
• Free express shipping on all orders
• Exclusive VIP-only sales and events
• Dedicated customer service line
• Birthday surprise gifts

Thank you for being such a valued member of the Femme community.

Best regards,
The Femme Team`,
  },
  {
    id: "custom",
    name: "Custom Email",
    subject: "",
    body: "",
  },
];

export function EmailComposerModal({ show, onClose, customerName, customerEmail, onSend }: EmailComposerModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("welcome");
  const [subject, setSubject] = useState(emailTemplates[0].subject);
  const [body, setBody] = useState(emailTemplates[0].body);
  const [isEditMode, setIsEditMode] = useState(false);

  if (!show) return null;

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setBody(template.body);
      setIsEditMode(templateId === "custom");
    }
  };

  const handleSend = () => {
    const processedBody = body.replace(/\{\{customerName\}\}/g, customerName);
    const processedSubject = subject.replace(/\{\{customerName\}\}/g, customerName);

    if (onSend) {
      onSend({
        template: selectedTemplate,
        subject: processedSubject,
        body: processedBody,
      });
    }

    onClose();
  };

  const previewBody = body.replace(/\{\{customerName\}\}/g, customerName);
  const previewSubject = subject.replace(/\{\{customerName\}\}/g, customerName);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl">Compose Email</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {customerName}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {customerEmail}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Left - Template Selection */}
            <div>
              <h3 className="text-sm mb-3 text-gray-500">Select Template</h3>
              <div className="space-y-2">
                {emailTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      selectedTemplate === template.id
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{template.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Email Editor/Preview */}
            <div className="col-span-2 space-y-4">
              {/* Edit Mode Toggle */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-500">
                  {isEditMode ? "Edit Email" : "Preview"}
                </h3>
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditMode ? "Preview" : "Edit"}
                </button>
              </div>

              {isEditMode ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Email subject..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Message Body
                      <span className="text-xs text-gray-500 ml-2">
                        (Use {"{{customerName}}"} for personalization)
                      </span>
                    </label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={12}
                      placeholder="Type your message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm"
                    />
                  </div>
                </div>
              ) : (
                /* Preview Mode */
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Email Header */}
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Subject:</div>
                    <div className="text-sm">{previewSubject}</div>
                  </div>

                  {/* Email Body */}
                  <div className="p-6 bg-white">
                    <div className="prose prose-sm max-w-none">
                      {previewBody.split('\n').map((line, idx) => (
                        <p key={idx} className="mb-2">
                          {line || <br />}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Email Footer */}
                  <div className="bg-gray-50 p-4 border-t border-gray-200 text-xs text-gray-500">
                    <div>This email will be sent to: {customerEmail}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Tip:</span> Use {"{{customerName}}"} to personalize your message
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={!subject.trim() || !body.trim()}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

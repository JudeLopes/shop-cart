import { X, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface ChatbotWidgetProps {
  onClose: () => void;
}

const quickTips = [
  {
    trigger: ["stress", "stressed", "overwhelmed"],
    response: "Take a deep breath. Try the 4-7-8 technique: breathe in for 4 seconds, hold for 7, exhale for 8. Repeat 3-4 times."
  },
  {
    trigger: ["anxious", "anxiety", "worried", "panic"],
    response: "Ground yourself with 5-4-3-2-1: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste."
  },
  {
    trigger: ["sad", "depressed", "down", "hopeless"],
    response: "You're not alone. Try stepping outside for fresh air, or call a friend. Small actions can help. If feelings persist, please reach out to a professional."
  },
  {
    trigger: ["help", "crisis", "emergency"],
    response: "If you're in crisis, please contact: India: 9152987821 | US: 988 | UK: 116 123. You matter, and help is available."
  },
  {
    trigger: ["sleep", "insomnia", "tired"],
    response: "Try the 4-7-8 breathing before bed. Avoid screens 1 hour before sleep. A warm drink and dim lights can help signal your body it's time to rest."
  }
];

const defaultResponse = "I'm here to share quick coping tips. Try asking about stress, anxiety, or grounding techniques. For serious concerns, please use our Safe Check-In or contact a helpline.";

const ChatbotWidget = ({ onClose }: ChatbotWidgetProps) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! I'm here to share quick coping tips. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput("");

    // Find matching tip
    const matchedTip = quickTips.find(tip => 
      tip.trigger.some(t => userMessage.includes(t))
    );

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: matchedTip?.response || defaultResponse, 
        isUser: false 
      }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-card rounded-2xl shadow-elevated border border-border overflow-hidden z-50 animate-fadeIn">
      {/* Header */}
      <div className="calm-gradient px-4 py-3 flex items-center justify-between">
        <h3 className="font-medium text-primary-foreground">Quick Coping Tips</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-primary-foreground/20 transition-colors"
        >
          <X className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                msg.isUser
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl bg-muted border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <Button 
            onClick={handleSend}
            size="icon"
            className="rounded-xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;

import { useState } from "react";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatbotSearchBar() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setIsExpanded(true);

    // Add user message to chat
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: "ManYao Li is a Statistics student at Beijing Normal University specializing in Data Science and Natural Language Processing. He has research experience in Chinese sarcasm recognition using LLaMA-2 models, data mining, and machine learning. His contact email is manyaoli@berkeley.edu."
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again or use the contact form.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isExpanded) {
    return (
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 border-2 border-[hsl(var(--morandi-sage))] rounded-lg bg-white hover:shadow-md transition-shadow">
          <MessageSquare className="text-[hsl(var(--morandi-sage))]" size={20} />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about ManYao Li..."
            className="border-0 focus:ring-0 focus:outline-none"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            size="sm" 
            className="bg-[hsl(var(--morandi-rose))] hover:opacity-80"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border-2 border-[hsl(var(--morandi-sage))] shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium text-gray-800">AI Assistant</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setIsExpanded(false);
              setMessages([]);
            }}
          >
            <X size={16} />
          </Button>
        </div>
        
        <div className="h-64 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <p className="text-gray-500 text-center">Ask me anything about ManYao Li's background, projects, or experience!</p>
          )}
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-[hsl(var(--morandi-rose))] text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit"
              size="sm" 
              className="bg-[hsl(var(--morandi-rose))] hover:opacity-80"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ChatbotFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: "ManYao Li is a Statistics student at Beijing Normal University specializing in Data Science and Natural Language Processing. He has research experience in Chinese sarcasm recognition using LLaMA-2 models, data mining, and machine learning. His contact email is manyaoli@berkeley.edu."
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[hsl(var(--morandi-rose))] hover:opacity-80 shadow-lg"
      >
        <MessageSquare className="text-white" size={24} />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl border">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-medium text-gray-800">AI Assistant</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setIsOpen(false);
                setMessages([]);
              }}
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-gray-500 text-sm text-center">Ask me anything about ManYao Li!</p>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 text-sm rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-[hsl(var(--morandi-rose))] text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Loader2 size={14} className="animate-spin" />
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 text-sm"
                disabled={isLoading}
              />
              <Button 
                type="submit"
                size="sm" 
                className="bg-[hsl(var(--morandi-rose))] hover:opacity-80"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// 免费的本地知识库
const knowledgeBase = {
  // 教育背景
  education: "ManYao Li is currently a Statistics student at Beijing Normal University, specializing in Data Science and Natural Language Processing.",
  
  // 项目经验
  projects: "His main research project involves Chinese sarcasm recognition using LLaMA-2 models. He has experience in data mining, machine learning, and statistical modeling.",
  
  // 技能
  skills: "He specializes in Python, R, machine learning, natural language processing, data visualization, and statistical analysis.",
  
  // 联系方式
  contact: "You can reach ManYao Li at manyaoli@berkeley.edu or through the contact form on this website.",
  
  // 研究兴趣
  research: "His research interests include Natural Language Processing, Machine Learning, Statistical Modeling, and Data Science applications in social media analysis."
};

const getLocalResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // 教育相关
  if (lowerMessage.includes('education') || lowerMessage.includes('university') || lowerMessage.includes('study') || lowerMessage.includes('学历') || lowerMessage.includes('大学')) {
    return knowledgeBase.education;
  }
  
  // 项目相关
  if (lowerMessage.includes('project') || lowerMessage.includes('research') || lowerMessage.includes('sarcasm') || lowerMessage.includes('llama') || lowerMessage.includes('项目') || lowerMessage.includes('研究')) {
    return knowledgeBase.projects;
  }
  
  // 技能相关
  if (lowerMessage.includes('skill') || lowerMessage.includes('programming') || lowerMessage.includes('python') || lowerMessage.includes('技能') || lowerMessage.includes('编程')) {
    return knowledgeBase.skills;
  }
  
  // 联系方式
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('联系') || lowerMessage.includes('邮箱')) {
    return knowledgeBase.contact;
  }
  
  // 研究兴趣
  if (lowerMessage.includes('interest') || lowerMessage.includes('nlp') || lowerMessage.includes('machine learning') || lowerMessage.includes('data science') || lowerMessage.includes('兴趣')) {
    return knowledgeBase.research;
  }
  
  // 问候
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('你好') || lowerMessage.includes('您好')) {
    return "Hello! I'm an AI assistant here to help you learn about ManYao Li. Feel free to ask about his education, projects, skills, or research interests.";
  }
  
  // 默认回答
  return "Thank you for your question! I can help you with information about ManYao Li's education at Beijing Normal University, his research projects (especially Chinese sarcasm recognition), his technical skills, or how to contact him. What would you like to know more about?";
};

export function ChatbotSearchBar() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setIsExpanded(true);

    // Add user message to chat
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getLocalResponse(userMessage);
      setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
      setIsLoading(false);
    }, 800);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getLocalResponse(userMessage);
      setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
      setIsLoading(false);
    }, 800);
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
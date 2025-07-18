import { useEffect, useState, useRef } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

declare global {
  interface Window {
    Mendable: {
      initialize: (config: {
        anon_key: string;
        type: string;
        elementId?: string;
        [key: string]: any;
      }) => void;
    };
  }
}

export function ChatbotSearchBar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const loadMendable = () => {
      try {
        // Load Mendable script with error handling
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@mendable/search@0.0.205/dist/umd/mendable-bundle.min.js';
        script.async = true;
        
        script.onload = () => {
          timeoutId = setTimeout(() => {
            try {
              if (window.Mendable && containerRef.current) {
                window.Mendable.initialize({
                  anon_key: 'fb00560b-a370-4bee-9b53-9c40c5a45976',
                  type: "searchBar",
                  elementId: "mendable-search-component",
                  placeholder: "Ask me anything about ManYao Li...",
                  dialogPlaceholder: "How can I help you today?",
                  showSimpleSearch: true,
                  color: {
                    primary: "#B89B9B",
                    secondary: "#A8B5A8",
                  },
                  style: {
                    borderRadius: "8px",
                  }
                });
                setIsLoaded(true);
              }
            } catch (err) {
              console.warn("Mendable initialization failed:", err);
              setError(true);
            }
          }, 500);
        };

        script.onerror = () => {
          setError(true);
        };

        document.head.appendChild(script);
      } catch (err) {
        setError(true);
      }
    };

    loadMendable();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Clean up scripts
      const scripts = document.querySelectorAll('script[src*="mendable"]');
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center space-x-2 p-4 border-2 border-[hsl(var(--morandi-sage))] rounded-lg bg-white">
          <MessageSquare className="text-[hsl(var(--morandi-sage))]" size={20} />
          <Input
            placeholder="Ask me anything about ManYao Li..."
            className="border-0 focus:ring-0 focus:outline-none"
            disabled
          />
          <Button 
            size="sm" 
            className="bg-[hsl(var(--morandi-rose))] hover:opacity-80"
            disabled
          >
            <Send size={16} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI assistant temporarily unavailable. Please use the contact form below.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto" ref={containerRef}>
      <div id="mendable-search-component" className="mendable-search-bar"></div>
      {!isLoaded && (
        <div className="flex items-center space-x-2 p-4 border-2 border-[hsl(var(--morandi-sage))] rounded-lg bg-white animate-pulse">
          <MessageSquare className="text-[hsl(var(--morandi-sage))]" size={20} />
          <div className="flex-1 h-4 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
        </div>
      )}
    </div>
  );
}

export function ChatbotFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const loadMendable = () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@mendable/search@0.0.205/dist/umd/mendable-bundle.min.js';
        script.async = true;
        
        script.onload = () => {
          timeoutId = setTimeout(() => {
            try {
              if (window.Mendable) {
                window.Mendable.initialize({
                  anon_key: 'fb00560b-a370-4bee-9b53-9c40c5a45976',
                  type: "floatingButton",
                  dialogPlaceholder: "Ask me anything about ManYao Li's background, projects, or experience...",
                  showSimpleSearch: true,
                  color: {
                    primary: "#B89B9B",
                    secondary: "#A8B5A8",
                  },
                  style: {
                    borderRadius: "50%",
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 1000,
                  },
                  buttonStyle: {
                    backgroundColor: "#B89B9B",
                    color: "white",
                  }
                });
                setIsLoaded(true);
              }
            } catch (err) {
              console.warn("Mendable floating button failed:", err);
              setError(true);
            }
          }, 1000);
        };

        script.onerror = () => {
          setError(true);
        };

        document.head.appendChild(script);
      } catch (err) {
        setError(true);
      }
    };

    loadMendable();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[hsl(var(--morandi-rose))] hover:opacity-80 shadow-lg"
        >
          <MessageSquare className="text-white" size={24} />
        </Button>
        
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">AI Assistant</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              AI assistant is temporarily unavailable. Please use the contact form to reach out directly.
            </p>
            <Button 
              onClick={() => {
                setIsOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-[hsl(var(--morandi-rose))] hover:opacity-80"
            >
              Go to Contact Form
            </Button>
          </div>
        )}
      </div>
    );
  }

  return null;
}
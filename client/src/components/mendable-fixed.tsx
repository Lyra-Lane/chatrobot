import { useEffect, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";

// 修复方案1: 增强错误处理的Mendable组件
export function MendableFixed() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let retryCount = 0;
    const maxRetries = 3;

    const loadMendable = () => {
      try {
        // 清除之前的脚本
        if (scriptRef.current) {
          document.head.removeChild(scriptRef.current);
        }

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@mendable/search@0.0.205/dist/umd/mendable-bundle.min.js';
        script.async = true;
        script.defer = true;
        scriptRef.current = script;

        script.onload = () => {
          timeoutId = setTimeout(() => {
            try {
              if (window.Mendable && containerRef.current) {
                // 添加错误边界
                window.addEventListener('error', (e) => {
                  if (e.message.includes('Mendable') || e.filename?.includes('mendable')) {
                    console.warn('Mendable error caught and handled:', e.message);
                    e.preventDefault();
                  }
                });

                window.Mendable.initialize({
                  anon_key: 'fb00560b-a370-4bee-9b53-9c40c5a45976',
                  type: "searchBar",
                  elementId: "mendable-search-fixed",
                  placeholder: "Ask me anything about ManYao Li...",
                  dialogPlaceholder: "How can I help you today?",
                  showSimpleSearch: true,
                  color: {
                    primary: "#B89B9B",
                    secondary: "#A8B5A8",
                  },
                  style: {
                    borderRadius: "8px",
                    fontFamily: "Inter, sans-serif",
                  },
                  // 添加错误处理
                  onError: (error: any) => {
                    console.warn('Mendable internal error:', error);
                    setError('Chat temporarily unavailable');
                  }
                });
                
                setIsLoaded(true);
                setError(null);
              } else {
                throw new Error('Mendable not available');
              }
            } catch (err) {
              console.warn(`Mendable initialization failed (attempt ${retryCount + 1}):`, err);
              
              if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(loadMendable, 2000 * retryCount); // 递增延迟重试
              } else {
                setError('AI chat unavailable');
              }
            }
          }, 1000);
        };

        script.onerror = () => {
          console.warn('Failed to load Mendable script');
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(loadMendable, 2000 * retryCount);
          } else {
            setError('Chat service unavailable');
          }
        };

        document.head.appendChild(script);
      } catch (err) {
        console.warn('Script loading error:', err);
        setError('Chat initialization failed');
      }
    };

    // 延迟加载以避免冲突
    setTimeout(loadMendable, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-4 border-2 border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center space-x-2 text-red-600">
          <MessageSquare size={20} />
          <span className="text-sm">{error}</span>
        </div>
        <p className="text-xs text-red-500 mt-2">
          Please use the contact form below to reach out directly.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto" ref={containerRef}>
      <div id="mendable-search-fixed"></div>
      
      {!isLoaded && (
        <div className="flex items-center space-x-2 p-4 border-2 border-gray-200 rounded-lg bg-gray-50 animate-pulse">
          <MessageSquare className="text-gray-400" size={20} />
          <div className="flex-1 h-4 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
        </div>
      )}
    </div>
  );
}

// 修复方案2: 使用iframe隔离的Mendable
export function MendableIframe() {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; font-family: Inter, sans-serif; }
          #mendable-container { width: 100%; }
        </style>
      </head>
      <body>
        <div id="mendable-container"></div>
        <script src="https://unpkg.com/@mendable/search@0.0.205/dist/umd/mendable-bundle.min.js"></script>
        <script>
          window.addEventListener('load', function() {
            if (window.Mendable) {
              window.Mendable.initialize({
                anon_key: 'fb00560b-a370-4bee-9b53-9c40c5a45976',
                type: "searchBar",
                elementId: "mendable-container",
                placeholder: "Ask me anything about ManYao Li...",
                color: {
                  primary: "#B89B9B",
                  secondary: "#A8B5A8",
                },
                style: {
                  borderRadius: "8px",
                }
              });
              parent.postMessage('mendable-loaded', '*');
            }
          });
        </script>
      </body>
      </html>
    `;

    iframe.onload = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(iframeContent);
        doc.close();
      }
    };

    // 监听iframe消息
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'mendable-loaded') {
        setIsLoaded(true);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <iframe
        ref={iframeRef}
        style={{
          width: '100%',
          height: '60px',
          border: 'none',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
        title="AI Chat Assistant"
      />
      
      {!isLoaded && (
        <div className="flex items-center space-x-2 p-4 border-2 border-gray-200 rounded-lg bg-gray-50 animate-pulse">
          <MessageSquare className="text-gray-400" size={20} />
          <span className="text-sm text-gray-500">Loading AI assistant...</span>
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    Mendable: {
      initialize: (config: any) => void;
    };
  }
}
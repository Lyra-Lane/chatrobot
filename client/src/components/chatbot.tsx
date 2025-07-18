import { useEffect } from "react";

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
  useEffect(() => {
    // Load Mendable script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@mendable/search@0.0.205/dist/umd/mendable-bundle.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.Mendable) {
        window.Mendable.initialize({
          anon_key: 'fb00560b-a370-4bee-9b53-9c40c5a45976',
          type: "searchBar",
          elementId: "mendable-search-component",
          placeholder: "Ask me anything about ManYao Li...",
          dialogPlaceholder: "How can I help you today?",
          showSimpleSearch: true,
          color: {
            primary: "#B89B9B", // Morandi rose color
            secondary: "#A8B5A8", // Morandi sage color
          },
          style: {
            borderRadius: "8px",
          }
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div id="mendable-search-component" className="mendable-search-bar"></div>
    </div>
  );
}

export function ChatbotFloatingButton() {
  useEffect(() => {
    // Load Mendable script for floating button
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@mendable/search@0.0.205/dist/umd/mendable-bundle.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.Mendable) {
        window.Mendable.initialize({
          anon_key: 'fb00560b-a370-4bee-9b53-9c40c5a45976',
          type: "floatingButton",
          dialogPlaceholder: "Ask me anything about ManYao Li's background, projects, or experience...",
          showSimpleSearch: true,
          color: {
            primary: "#B89B9B", // Morandi rose color
            secondary: "#A8B5A8", // Morandi sage color
          },
          style: {
            borderRadius: "50%",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          },
          buttonStyle: {
            backgroundColor: "hsl(var(--morandi-rose))",
            color: "white",
          }
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // Floating button doesn't need a container
}
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const chatRequestSchema = z.object({
  message: z.string().min(1, "Message is required"),
  context: z.string().optional()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, context } = chatRequestSchema.parse(req.body);

      // Check if PERPLEXITY_API_KEY is available
      const apiKey = process.env.PERPLEXITY_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "AI service is not configured. Please contact the administrator." 
        });
      }

      // Prepare the system prompt with context
      const systemPrompt = `You are an AI assistant helping visitors learn about ManYao Li. ${context || ''}

Please provide helpful, accurate responses about ManYao Li's background, education, projects, and experience. Keep responses concise and professional. If you don't have specific information, suggest contacting ManYao Li directly via the provided contact information.`;

      // Call Perplexity API
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 150,
          temperature: 0.2,
          top_p: 0.9,
          return_images: false,
          return_related_questions: false,
          search_recency_filter: 'month',
          stream: false
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Perplexity API error:', errorText);
        return res.status(500).json({ 
          error: "Failed to get AI response. Please try again later." 
        });
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your question right now.";

      res.json({ response: aiResponse });
    } catch (error) {
      console.error('Chat endpoint error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request format" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

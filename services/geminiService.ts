import { GoogleGenAI } from "@google/genai";

// Helper to get the client instance safely. 
// We initialize it lazily to prevent top-level crashes if the key is missing at module load time.
const getAIClient = () => {
  // Note: In a real deployment, ensure process.env.API_KEY is set.
  const apiKey = process.env.API_KEY || ''; 
  
  if (!apiKey) {
    return null;
  }
  
  return new GoogleGenAI({ apiKey });
};

export const sendMessageToGemini = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string,
  context?: string
): Promise<string> => {
  const ai = getAIClient();

  if (!ai) {
    return "Error: API Key is missing. Please check your environment variables or project settings.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    // Construct system instruction
    const systemInstruction = `You are an enthusiastic and helpful SQL Tutor for a coding bootcamp. 
    The student is currently working on a lesson about: ${context || 'General SQL'}.
    
    Your goals:
    1. Help them debug their SQL queries.
    2. Explain concepts like SELECT, WHERE, COUNT, SUM, GROUP BY.
    3. If they ask for the answer to a challenge, guide them with hints first, don't just give the code immediately unless they seem very stuck.
    4. Keep responses concise and formatted with Markdown.
    5. Assume they are using PostgreSQL (Supabase).
    `;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I couldn't generate a response.";
    
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Error: ${error.message || 'Something went wrong with the AI service.'}`;
  }
};
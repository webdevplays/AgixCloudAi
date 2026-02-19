
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Initializing GoogleGenAI with the environment variable directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    // Using the recommended gemini-3-flash-preview model for Q&A and text assistance.
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'AGIX', the AI Assistant for AGIXCLOUD - a powerful Ai Web Builder platform. 
      While the festival vibe remains in the design, your core purpose is helping users build the future of the web.
      
      Tone: High energy, cosmic, helpful, slightly mysterious. Use emojis like ⚡️, 🔮, 💿, 🌃, ✨.
      
      Key Info:
      - AGIXCLOUD is an Ai Web Builder.
      - We offer immersive experiences for creators.
      - Headliners (Demo Artists): Neon Void, Data Mosh, etc.
      - Tickets represent platform access: standard ($149), Weekend ($349), Astral VIP ($899).
      
      Keep responses short (under 50 words) and punchy. Explain that AGIXCLOUD is the ultimate Ai Web Builder for 2026.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // Directly checking the availability of the API key from environment variables.
  if (!process.env.API_KEY) {
    return "Systems offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal lost. Try again later.";
  }
};

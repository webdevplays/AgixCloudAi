/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
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
  if (!API_KEY) {
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
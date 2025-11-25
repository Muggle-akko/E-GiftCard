import { GoogleGenAI } from "@google/genai";
import { BrandConfig } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateGreeting = async (
  occasion: string,
  brand: BrandConfig,
  sender: string,
  recipient: string
): Promise<string> => {
  if (!apiKey) {
    // Fallback if no API key is provided for demo purposes
    return `To ${recipient}: ${occasion}！Enjoy your ${brand.name} time. From ${sender}`;
  }

  try {
    const prompt = `
      Write a short, elegant, and warm gift card message in Chinese.
      Context:
      - Occasion: ${occasion}
      - Brand: ${brand.name}
      - Sender: ${sender || 'A Friend'}
      - Recipient: ${recipient || 'You'}
      
      Requirements:
      - Max 30 words.
      - Tone: Classy, thoughtful, slightly poetic.
      - Format: Plain text only, no markdown.
      - Output language: Chinese (Simplified).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for speed on simple text
      }
    });

    return response.text?.trim() || `${occasion}！请你喝${brand.name}。`;
  } catch (error) {
    console.error("Gemini generation error:", error);
    return `${occasion}！小小礼物，不成敬意。`;
  }
};
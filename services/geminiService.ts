import { ProposalData } from "../types";

export const generateProposalContent = async (
  clientName: string,
  projectType: string
): Promise<ProposalData> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const { GoogleGenAI, Type } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a professional commercial proposal for a client named "${clientName}" regarding a project about "${projectType}". The language must be Russian. Tone: Professional, minimalistic, confident.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          meta: {
            type: Type.OBJECT,
            properties: {
              clientName: { type: Type.STRING },
              projectTitle: { type: Type.STRING },
              date: { type: Type.STRING },
              providerName: { type: Type.STRING },
            },
            required: ["clientName", "projectTitle", "date", "providerName"],
          },
          understanding: {
            type: Type.OBJECT,
            properties: {
              currentSituation: { type: Type.STRING },
              problemToSolve: { type: Type.STRING },
            },
            required: ["currentSituation", "problemToSolve"],
          },
          stages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
              },
              required: ["title", "description", "duration"],
            },
          },
          timeline: {
            type: Type.OBJECT,
            properties: {
              totalDuration: { type: Type.STRING },
              milestones: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["totalDuration", "milestones"],
          },
          pricing: {
            type: Type.OBJECT,
            properties: {
              mainCost: { type: Type.STRING },
              additionalCosts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    description: { type: Type.STRING },
                    amount: { type: Type.STRING },
                    isOptional: { type: Type.BOOLEAN },
                  },
                },
              },
            },
            required: ["mainCost", "additionalCosts"],
          },
          nextSteps: {
            type: Type.OBJECT,
            properties: {
              callToAction: { type: Type.STRING },
              contactEmail: { type: Type.STRING },
              contactPhone: { type: Type.STRING },
            },
            required: ["callToAction", "contactEmail", "contactPhone"],
          },
        },
        required: ["meta", "understanding", "stages", "timeline", "pricing", "nextSteps"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as ProposalData;
};

import { GoogleGenAI, Type } from "@google/genai";
import { PLACEMENT_DATA } from "../constants";

export const getPlacementInsights = async (year: string, branch?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const currentYearData = PLACEMENT_DATA.find(d => d.year === year);
  if (!currentYearData) return "No data available for the selected year.";

  const contextData = branch 
    ? currentYearData.branches.find(b => b.branch === branch)
    : currentYearData;

  const prompt = `
    Analyze the following placement data for Vignan Institute of Information Technology (VIIT) for the year ${year}.
    Data: ${JSON.stringify(contextData)}
    
    Provide a professional summary including:
    1. Key highlights (High performers, top package).
    2. Comparison or trend insights.
    3. Areas of improvement or notable strengths.
    4. A concise forward-looking statement for aspiring students.
    
    Keep the tone academic yet encouraging. Limit to 3-4 paragraphs.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Error generating AI insights. Please check your connectivity.";
  }
};

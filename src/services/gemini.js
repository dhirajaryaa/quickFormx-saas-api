import { GoogleGenAI } from "@google/genai";
import {GEMINI_API_KEY} from "../config/env.js"

// modal initialized
const aiModal = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const prompt = `Generate a representing a form fields structure based on a Mongoose schema for a SaaS project. The schema should include a form with a title, optional description, authentication flag, public URL, pro form status, branding is string, draft status, user ID reference, and a list of fields. Each field should have a label, name, type (from a predefined list: text, textarea, email, number, radio, checkbox, select, date, file), required status, optional placeholder, and options for select, checkbox, or radio types (with value and checked status). Incorporate user input specifying the type of form to build: [USER_INPUT]. Output the schema in full JSON format, using concise content and minimal descriptions, ensuring it reflects the structure and constraints of the provided Mongoose schema.`

async function aiAgent(userPrompt) {
    const res = await aiModal.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${prompt.replace("[USER_INPUT]", userPrompt)}`
    });
    return res
};
export default aiAgent;

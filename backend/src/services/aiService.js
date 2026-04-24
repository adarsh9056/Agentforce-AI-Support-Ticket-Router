const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const allowedCategories = ["Billing", "Technical", "General", "Escalate"];

async function classifyTicket({ title, description, priority }) {
  if (!process.env.OPENAI_API_KEY || process.env.NODE_ENV === "test") {
    return {
      category: "General",
      confidence: 0.7,
      reasoning: "Fallback classifier used due to missing API key or test mode.",
    };
  }

  const prompt = `Classify this support ticket into exactly one category:
- Billing
- Technical
- General
- Escalate

Title: ${title}
Description: ${description}
Priority: ${priority}

Return strict JSON:
{"category":"Billing|Technical|General|Escalate","confidence":0-1,"reasoning":"short explanation"}`;

  const completion = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.2,
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.choices?.[0]?.message?.content || "{}";
  let parsed = {};
  try {
    parsed = JSON.parse(content);
  } catch (_error) {
    parsed = { category: "Escalate", confidence: 0.5, reasoning: content };
  }

  const category = allowedCategories.includes(parsed.category)
    ? parsed.category
    : "Escalate";
  const confidence = Number(parsed.confidence) || 0.5;

  return {
    category,
    confidence,
    reasoning: parsed.reasoning || "No reasoning provided.",
  };
}

module.exports = {
  classifyTicket,
};

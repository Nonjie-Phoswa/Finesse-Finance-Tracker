exports.handler = async function (event) {
  let API_KEY = process.env.SheCodes_AI_API;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: "Error: Missing SheCodes_AI_API key",
    };
  }

  let topic = event.queryStringParameters.topic.trim();

  let prompt = `
You are Fin, an AI financial assistant.
Analyze the user's monthly spending summary and give one short insight that helps them improve their financial habits.
Spending summary: ${topic}.
`;

  let context = `
Keep the tone positive, encouraging and professional.
Focus on a single useful observation, not a list.
Reply in 1–2 sentences (under 50 words).
Avoid generic advice — base your insight directly on the spending summary provided.
`;

  let url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${API_KEY}`;

  try {
    let response = await fetch(url);

    let data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Server error: ${error.message}`,
    };
  }
};

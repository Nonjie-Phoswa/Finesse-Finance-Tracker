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
You are Fin, a friendly and knowledgeable personal finance chatbot.
Respond conversationally to the following message from the user: ${topic}.
`;

  let context = `
Make your tone warm, encouraging, and easy to understand.
Avoid sounding robotic or overly formal.
Keep answers under 120 words unless the user requests more detail.
Include examples or simple steps when possible.
End responses with a short motivational or practical note.
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

exports.handler = async function (event) {
  let API_KEY = process.env.SheCodes_AI_API;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: "Error: Missing SheCodes_AI_API key",
    };
  }

  let topic = event.queryStringParameters.topic.trim();

  let prompt = `You are a financial advisor. Provide concise and clear financial advice on the following topic: ${topic}.`;

  let context =
    "Make it professional and less than 120 words.";

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

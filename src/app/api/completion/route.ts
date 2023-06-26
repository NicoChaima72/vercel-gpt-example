import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request

  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream

  const stream = OpenAIStream(response, {
    onStart: async () => {
      console.log("Started streaming");
    },
    onToken: async (token) => {
      console.log("Received token", token);
    },
    onCompletion: async (completion) => {
      console.log("Completed streaming", completion);
    },
  });

  // Respond with the stream

  return new StreamingTextResponse(stream);
}

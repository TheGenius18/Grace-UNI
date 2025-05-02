
import axios from "axios";


const CHATBOT_API_URL = "http://127.0.0.1:8000/api/chatbot/message/";

export const sendMessageToChatbot = async (message, token) => {
  try {
    const response = await axios.post(
      CHATBOT_API_URL,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Chatbot API error:", error);
    return [
      {
        text: " Sorry, I couldn’t connect to the chatbot. Please try again later.",
      },
    ];
  }
};

import axios from "axios";

const GRAPH_API = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}`;

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!;

export interface WhatsAppResponse {
  messaging_product: string;
  contacts?: {
    input: string;
    wa_id: string;
  }[];
  messages?: {
    id: string;
  }[];
}

async function sendRequest(payload: any): Promise<WhatsAppResponse> {
  const response = await axios.post(
    `${GRAPH_API}/${PHONE_NUMBER_ID}/messages`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

export async function sendTextMessage(
  phone: string,
  message: string
): Promise<WhatsAppResponse> {
  return sendRequest({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: phone,
    type: "text",
    text: {
      preview_url: false,
      body: message,
    },
  });
}

export async function sendTemplateMessage(
  phone: string,
  templateName: string,
  languageCode: string = "en_US",
  parameters: string[] = []
): Promise<WhatsAppResponse> {
  return sendRequest({
    messaging_product: "whatsapp",
    to: phone,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: languageCode,
      },
      components:
        parameters.length > 0
          ? [
              {
                type: "body",
                parameters: parameters.map((value) => ({
                  type: "text",
                  text: value,
                })),
              },
            ]
          : [],
    },
  });
}
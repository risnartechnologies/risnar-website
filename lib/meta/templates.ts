import { metaRequest } from "./client";

export async function fetchTemplates() {
  const wabaId =
    process.env.META_WABA_ID;

  if (!wabaId) {
    throw new Error(
      "META_WABA_ID is missing."
    );
  }

  const response =
    await metaRequest(
      `/${wabaId}/message_templates`
    );

  console.log(
    "META_WABA_ID:",
    wabaId
  );

  console.log(
    "META TEMPLATES:",
    JSON.stringify(
      response?.data ?? [],
      null,
      2
    )
  );

  return response;
}
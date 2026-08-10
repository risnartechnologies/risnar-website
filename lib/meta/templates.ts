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

  return {
    ...response,

    data: (response.data ?? []).filter(
      (template: any) =>
        template.status === "APPROVED"
    ),
  };
}
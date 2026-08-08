const GRAPH_VERSION =
  "v23.0";

const BASE_URL =
  `https://graph.facebook.com/${GRAPH_VERSION}`;

export async function metaRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token =
    process.env
      .META_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      "META_ACCESS_TOKEN is missing."
    );
  }

  const response =
    await fetch(
      `${BASE_URL}${endpoint}`,
      {
        ...options,

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "application/json",

          ...(options.headers ??
            {}),
        },

        cache: "no-store",
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      JSON.stringify(data)
    );
  }

  return data;
}
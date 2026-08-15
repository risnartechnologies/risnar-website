export interface MetaWebhook {
  object: string;

  entry: {
    id: string;

    changes: {
      field: string;

      value: {
        messaging_product: string;

        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };

        contacts?: {
          profile: {
            name: string;
          };

          wa_id: string;
        }[];

        messages?: MetaMessage[];

        statuses?: {
          id: string;

          status: string;

          timestamp: string;

          recipient_id: string;
        }[];
      };
    }[];
  }[];
}

/**
 * Represents an inbound WhatsApp message received
 * from Meta Cloud API.
 *
 * WhatsApp can send several different message types.
 * The common fields are kept here, while type-specific
 * payloads are optional because Meta only sends the
 * relevant property for the current message type.
 */
export interface MetaMessage {
  id: string;

  from: string;

  timestamp: string;

  type: string;

  text?: {
    body: string;
  };

  button?: {
    text: string;
    payload?: string;
  };

  interactive?: {
    type: string;

    button_reply?: {
      id: string;
      title: string;
    };

    list_reply?: {
      id: string;
      title: string;
      description?: string;
    };
  };

  image?: {
    id: string;
    caption?: string;
    mime_type?: string;
  };

  video?: {
    id: string;
    caption?: string;
    mime_type?: string;
  };

  audio?: {
    id: string;
    mime_type?: string;
  };

  document?: {
    id: string;
    filename?: string;
    caption?: string;
    mime_type?: string;
  };

  sticker?: {
    id: string;
    mime_type?: string;
  };

  location?: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };

  contacts?: {
    name?: {
      formatted?: string;
      first_name?: string;
      last_name?: string;
    };

    phones?: {
      phone?: string;
      type?: string;
      wa_id?: string;
    }[];
  }[];

  reaction?: {
    message_id: string;
    emoji: string;
  };
}
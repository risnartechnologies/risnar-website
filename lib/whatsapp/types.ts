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

        messages?: {
          id: string;

          from: string;

          timestamp: string;

          type: string;

          text?: {
            body: string;
          };
        }[];

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
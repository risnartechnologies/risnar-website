import { db } from "@/lib/prisma/db";

async function main() {
  const recipients =
    await db.campaignRecipient.findMany({
      where: {
        metaMessageId: {
          not: null,
        },
      },
      select: {
        metaMessageId: true,
        campaign: {
          select: {
            templateName: true,
          },
        },
      },
    });

  let fixed = 0;

  for (const recipient of recipients) {
    if (!recipient.metaMessageId) continue;

    const result =
      await db.message.updateMany({
        where: {
          metaMessageId:
            recipient.metaMessageId,
        },
        data: {
          type: "TEMPLATE",
          body:
            recipient.campaign.templateName,
        },
      });

    fixed += result.count;
  }

  console.log(
    `Fixed ${fixed} campaign messages.`
  );
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());

import PageHeader from "@/components/whatsapp/ui/page-header";
import SectionCard from "@/components/whatsapp/ui/section-card";
import EmptyState from "@/components/whatsapp/ui/empty-state";

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        title="Contacts"
        description="Manage all your WhatsApp contacts."
      />

      <SectionCard title="Contact List">
        <EmptyState
          title="No Contacts Yet"
          description="Import contacts or add one manually."
        />
      </SectionCard>
    </>
  );
}
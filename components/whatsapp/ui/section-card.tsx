interface Props {
  title: string;
  children: React.ReactNode;
}

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        {title}
      </h2>

      {children}
    </div>
  );
}
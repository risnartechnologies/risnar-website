import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <main
      className={cn(
        "flex-1 overflow-y-auto bg-background",
        className
      )}
    >
      <div className="mx-auto w-full max-w-screen-2xl p-6">
        {children}
      </div>
    </main>
  );
}
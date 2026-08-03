
export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto grid min-h-screen grid-cols-12 gap-8 py-8">
    

      <main className="col-span-9">
        {children}
      </main>
    </div>
  );
}
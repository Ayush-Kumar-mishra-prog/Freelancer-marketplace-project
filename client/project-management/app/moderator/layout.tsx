
import ModeratorSidebar from "@/components/moderator/ModeratorSidebar";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
        <div className="flex min-h-screen">
          <ModeratorSidebar />
          <main className="flex-1 pt-14 lg:pt-0 p-6 w-full">
            {children}
          </main>
        </div>
      
  );
}
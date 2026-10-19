
import "../globals.css";
import SidebarAdmin from "@/components/admin/Sidebar";
import DialogsProvider from "@/hooks/useDialogs/DialogsProvider";
import NotificationsProvider from "@/hooks/useNotifications/NotificationsProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
        <NotificationsProvider>
          <DialogsProvider>
            <div className="flex min-h-screen">
              <SidebarAdmin />
              <main className="flex-1 pt-14 lg:pt-0 p-6 w-full">
                {children}
              </main>
            </div>
          </DialogsProvider>
        </NotificationsProvider>
      
  );
}
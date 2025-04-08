import { Header, Sidebar } from "../_components";
import { SidebarProvider } from "../_context/sidebar-context";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto text-gray-100">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

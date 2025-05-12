import { Header, Sidebar } from "../_components";
import { SidebarProvider } from "../_context/sidebar-context";

export default function LayoutAuthenticatedAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-hidden">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

import { AuthProvider } from "./_context/auth-context";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}

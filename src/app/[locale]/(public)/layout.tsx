import { Navbar } from "./_components/navbar";

export default function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}

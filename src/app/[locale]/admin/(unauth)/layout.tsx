export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <main>{children}</main>
    </div>
  );
}

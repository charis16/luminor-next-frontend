export type NavItem = {
  label: string;
  href: string;
  submenu?: NavItem[]; // Tambahkan support submenu (Opsional)
};

export type SiteConfig = {
  name: string;
  description: string;
  navItems: NavItem[]; // Menggunakan type `NavItem` agar bisa memiliki submenu
  links?: {
    instagram?: string;
    tiktok?: string;
  };
};

// ✅ Config untuk PUBLIC (Halaman umum)
export const siteConfigPublic = {
  name: "Luminor - Wedding Photography Blora, Semarang & Destination",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/by-team" },
    { label: "Farid", href: "/farid" },
    { label: "Herman", href: "/herman" },
    { label: "Fredo", href: "/fredo" },
    { label: "Film", href: "/film" },
  ],
  links: {
    instagram: "https://www.instagram.com/yourinstagram",
    tiktok: "https://www.tiktok.com/@yourtiktok",
  },
};

// ✅ Config untuk ADMIN (Halaman khusus admin)
export const siteConfigAdmin: SiteConfig = {
  name: "Luminor Admin Panel",
  description: "Admin panel for managing Luminor photography services.",
  navItems: [
    { label: "Dashboard", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: "Orders", href: "/admin/orders" },
    { label: "Settings", href: "/admin/settings" },
    { label: "Reports", href: "/admin/reports" },
  ],
};

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Image, 
  Settings, 
  LogOut,
  FolderOpen,
  Tags,
  Calendar,
  Mic
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/posts", icon: FileText, label: "Posts" },
    { href: "/admin/sermons", icon: Mic, label: "Sermons" },
    { href: "/admin/events", icon: Calendar, label: "Events" },
    { href: "/admin/categories", icon: FolderOpen, label: "Categories" },
    { href: "/admin/tags", icon: Tags, label: "Tags" },
    { href: "/admin/media", icon: Image, label: "Media" },
    { href: "/admin/users", icon: Users, label: "Users", adminOnly: true },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly && session?.user.role !== "SUPER_ADMIN") {
      return false;
    }
    return true;
  });

  return (
    <aside className="w-64 bg-dark text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dark-light">
        <Link href="/" className="text-2xl font-heading font-bold">
          <span className="text-primary">[</span>Finsweet
        </Link>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-dark-light">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-dark font-bold">
            {session?.user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{session?.user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{session?.user?.role?.replace("_", " ")}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-dark font-semibold"
                      : "text-gray-300 hover:bg-dark-light hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-dark-light">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-dark-light hover:text-white transition-colors w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

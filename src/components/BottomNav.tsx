import { Home, BookOpen, ShoppingBag, Trophy, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { path: "/", icon: Home, label: "Ana Sayfa" },
  { path: "/learn", icon: BookOpen, label: "Öğren" },
  { path: "/shop", icon: ShoppingBag, label: "Mağaza" },
  { path: "/league", icon: Trophy, label: "Lig" },
  { path: "/profile", icon: User, label: "Profil" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                isActive
                  ? "text-flamingo"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-bold">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

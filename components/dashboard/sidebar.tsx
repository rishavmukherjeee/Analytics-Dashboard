"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Settings,
  PieChart,
  Calendar,
  FileText,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Overview", href: "#", icon: BarChart3, current: true },
  { name: "Analytics", href: "#", icon: PieChart, current: false },
  { name: "Campaigns", href: "#", icon: Target, current: false },
  { name: "Revenue", href: "#", icon: DollarSign, current: false },
  { name: "Users", href: "#", icon: Users, current: false },
  { name: "Reports", href: "#", icon: FileText, current: false },
  { name: "Calendar", href: "#", icon: Calendar, current: false },
  { name: "Settings", href: "#", icon: Settings, current: false },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 transform bg-background border-r transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">ADmyBRAND</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant={item.current ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11 transition-all duration-200",
                  item.current
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "hover:bg-secondary/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground">
              Upgrade to Pro
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Unlock advanced analytics and reporting features
            </p>
            <Button size="sm" className="w-full mt-3">
              Upgrade Now
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
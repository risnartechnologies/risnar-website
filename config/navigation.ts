import {
  BarChart3,
  Bot,
  Home,
  Inbox,
  LayoutTemplate,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

export type NavigationItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const navigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Inbox",
    href: "/inbox",
    icon: MessageSquare,
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: Users,
  },
  {
    title: "Campaigns",
    href: "/campaigns",
    icon: Inbox,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: LayoutTemplate,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Automations",
    href: "/automations",
    icon: Bot,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
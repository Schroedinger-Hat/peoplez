export interface MenuItem {
  url: string;
  label: string;
  id: string;
  children?: MenuItem[];
}

export const adminMenuTreeConfig: MenuItem[] = [
  {
    id: "membership",
    label: "Membership",
    url: "/admin/membership",
  },
  {
    id: "users",
    label: "Users",
    url: "/admin/users",
  },
  {
    children: [
      {
        id: "general",
        label: "General",
        url: "/admin/settings",
      },
      {
        id: "branding",
        label: "Branding",
        url: "/admin/settings/branding",
      },
      {
        id: "statute",
        label: "Statute & Legal",
        url: "/admin/settings/statute",
      },
      {
        id: "advanced",
        label: "Advanced",
        url: "/admin/settings/advanced",
      },
    ],
    id: "settings",
    label: "Settings",
    url: "/admin/settings",
  },
];

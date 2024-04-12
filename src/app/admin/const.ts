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
    children: [
      {
        id: "membership-all",
        label: "Active",
        url: "/admin/membership",
      },
      {
        id: "membership-pending-review",
        label: "Pending Review",
        url: "/admin/membership/pending-review",
      },
      {
        id: "membership-manage",
        label: "Manage",
        url: "/admin/membership/manage",
      },
    ],
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

import { NavBarMetaDataType } from "components/navigation";

export const metaData: NavBarMetaDataType = {
  config: {
    rel: "noopener noreferrer",
    target: "_blank",
  },
  navItems: [
    {
      label: "Dashboard",
      href: "./home",
      isRouterLink: true,
      icon: "hashtag",
    },
    {
      label: "Registration",
      icon: "plus",
      children: [
        {
          label: "Form1",
          href: "./newInquiry",
        },
        {
          label: "Form2",
          href: "./newInquiry",
        },
        {
          label: "Documents",
          href: "./newInquiry",
        },
      ],
    },
    {
      label: "Profile",
      href: "./profile",
      isRouterLink: true,
      icon: "user-circle",
    },
  ],
};

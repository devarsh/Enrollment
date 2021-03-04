import { NavBarMetaDataType } from "components/navigation";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const siteNav: NavBarMetaDataType = {
  config: {
    rel: "noopener noreferrer",
    target: "_blank",
  },
  navItems: [
    {
      label: "About Us",
      href: "https://ratnaafin.com/about-us/",
      children: [
        {
          label: "Who We Are",
          href: "https://ratnaafin.com/who-we-are/",
        },
        {
          label: "Vision & Mission",
          href: "https://ratnaafin.com/vision-mission/",
        },
        {
          label: "Core Values",
          href: "https://ratnaafin.com/core-values/",
        },
        {
          label: "Clients",
          href: "https://ratnaafin.com/clients/",
        },
        {
          label: "Testimonials",
          href: "https://ratnaafin.com/testimonials/",
        },
        {
          label: "Team",
          href: "https://ratnaafin.com/team/",
        },
        {
          label: "Company Profile",
          href: "https://ratnaafin.com/company-profile/",
        },
      ],
    },
    {
      label: "Team",
      href: "https://ratnaafin.com/team/",
    },
    {
      label: "Insights",
      href: "https://ratnaafin.com/insights/",
    },
    {
      label: "Events",
      href: "https://ratnaafin.com/events/",
      children: [
        {
          label: "Professional Events",
          href: "https://ratnaafin.com/professional-events/",
        },
        {
          label: "Social Events",
          href: "https://ratnaafin.com/social-events/",
        },
      ],
    },
    {
      label: "Tools",
      href: "https://ratnaafin.com/tools/",
      children: [
        {
          label: "GST Calculator",
          href: "https://ratnaafin.com/gst-calculator/",
        },
        {
          label: "EMI Calculator",
          href: "https://ratnaafin.com/emi-calculator/",
        },
        {
          label: "CIBIL",
          href: "https://ratnaafin.com/cibil/",
        },
      ],
    },
    {
      label: "Careers",
      href: "https://ratnaafin.com/careers/",
    },
    {
      label: "Contact Us",
      href: "https://ratnaafin.com/contact-us/",
    },
    {
      label: " Login",
      icon: AccountCircle,
      iconPosition: "before",
      href: "/dashboard",
      isRouterLink: true,
    },
  ],
};

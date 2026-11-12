import { IconType } from "react-icons";
import {
  FiBookOpen,
  FiCheckSquare,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiInbox,
  FiLayers,
  FiLink2,
  FiMapPin,
  FiSliders,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { LuBuilding, LuSparkles } from "react-icons/lu";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: IconType;
  active: boolean;
  superAdminOnly: boolean;
}

export function getAdminNavLinks(pathname: string): AdminNavItem[] {
  return [
    {
      label: "Administrators",
      href: "/admin/dashboard",
      icon: FiUsers,
      active: pathname === "/admin/dashboard",
      superAdminOnly: true,
    },
    {
      label: "Contact Inquiries",
      href: "/admin/contacts",
      icon: FiInbox,
      active: pathname.startsWith("/admin/contacts"),
      superAdminOnly: false,
    },
    {
      label: "Articles & Blogs",
      href: "/admin/blogs",
      icon: FiBookOpen,
      active: pathname.startsWith("/admin/blogs"),
      superAdminOnly: false,
    },
    {
      label: "Projects",
      href: "/admin/projects",
      icon: LuBuilding,
      active: pathname.startsWith("/admin/projects"),
      superAdminOnly: false,
    },
    {
      label: "Project Locations",
      href: "/admin/project-locations",
      icon: FiMapPin,
      active:
        pathname.startsWith("/admin/project-locations") ||
        pathname.startsWith("/admin/categories"),
      superAdminOnly: false,
    },
    {
      label: "Project Types",
      href: "/admin/project-types",
      icon: LuBuilding,
      active: pathname.startsWith("/admin/project-types"),
      superAdminOnly: false,
    },
    {
      label: "Project Facilities",
      href: "/admin/project-facilities",
      icon: LuSparkles,
      active: pathname.startsWith("/admin/project-facilities"),
      superAdminOnly: false,
    },
    {
      label: "Primary Units",
      href: "/admin/primary-units",
      icon: FiLayers,
      active: pathname.startsWith("/admin/primary-units"),
      superAdminOnly: false,
    },
    {
      label: "Resales",
      href: "/admin/resales",
      icon: FiTag,
      active: pathname.startsWith("/admin/resales"),
      superAdminOnly: false,
    },
    {
      label: "Property Services",
      href: "/admin/property-services",
      icon: FiSliders,
      active: pathname.startsWith("/admin/property-services"),
      superAdminOnly: false,
    },
    {
      label: "Rentals",
      href: "/admin/rentals",
      icon: FiHome,
      active: pathname.startsWith("/admin/rentals"),
      superAdminOnly: false,
    },
    {
      label: "Rental Categories",
      href: "/admin/rental-categories",
      icon: FiGrid,
      active:
        pathname.startsWith("/admin/rental-categories") ||
        pathname.startsWith("/admin/property-categories"),
      superAdminOnly: false,
    },
    {
      label: "Rental Items",
      href: "/admin/rental-items",
      icon: FiCheckSquare,
      active:
        pathname.startsWith("/admin/rental-items") ||
        pathname.startsWith("/admin/property-category-items"),
      superAdminOnly: false,
    },
    {
      label: "Rental Locations",
      href: "/admin/rental-locations",
      icon: FiMapPin,
      active:
        pathname.startsWith("/admin/rental-locations") ||
        pathname.startsWith("/admin/rentallocations"),
      superAdminOnly: false,
    },
    {
      label: "Rental Area Places",
      href: "/admin/rental-area-places",
      icon: FiMapPin,
      active: pathname.startsWith("/admin/rental-area-places"),
      superAdminOnly: false,
    },
    {
      label: "FAQ / Questions",
      href: "/admin/questions",
      icon: FiHelpCircle,
      active: pathname.startsWith("/admin/questions"),
      superAdminOnly: false,
    },
    {
      label: "Site Links / Keys",
      href: "/admin/site-links",
      icon: FiLink2,
      active: pathname.startsWith("/admin/site-links"),
      superAdminOnly: false,
    },
  ];
}


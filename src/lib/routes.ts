export const routes = {
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  pricing: "/pricing",
  billing: "/billing",
  contactSales: "/contact-sales",
  dashboard: "/dashboard",
  customers: "/customers",
  tasks: "/tasks",
  settings: "/settings",
  resolveComplaint: "/resolve-complaint",
} as const;

export const appNav = [
  { label: "Overview", href: routes.dashboard, icon: "dashboard" },
  { label: "Customers", href: routes.customers, icon: "group" },
  { label: "Tasks", href: routes.tasks, icon: "assignment" },
  { label: "Pricing / Billing", href: routes.billing, icon: "payments" },
  { label: "Settings", href: routes.settings, icon: "settings" },
];

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
  feedback: (slug: string) => `/f/${slug}`,
  feedbackComplaint: (slug: string, rating?: number) => `/f/${slug}/complaint${rating ? `?rating=${rating}` : ""}`,
  feedbackReview: (slug: string, rating?: number) => `/f/${slug}/review${rating ? `?rating=${rating}` : ""}`,
  feedbackDone: (slug: string, kind: "complaint" | "review", reward = false) =>
    `/f/${slug}/done?kind=${kind}${reward ? "&reward=1" : ""}`,
} as const;

export const appNav = [
  { label: "Overview", href: routes.dashboard, icon: "dashboard" },
  { label: "Customers", href: routes.customers, icon: "group" },
  { label: "Tasks", href: routes.tasks, icon: "assignment" },
  { label: "Pricing / Billing", href: routes.billing, icon: "payments" },
  { label: "Settings", href: routes.settings, icon: "settings" },
];

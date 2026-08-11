import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function AdminPage() {
  const user = await getCurrentUser();

  redirect(user ? "/admin/dashboard" : "/admin/login");
}

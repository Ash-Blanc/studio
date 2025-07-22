"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // In a real app, you would also invalidate the session on the server.
  cookies().delete("auth_token");
  redirect("/login");
}

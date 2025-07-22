"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // Clear the server-side session cookie
  cookies().delete("auth_token");
  redirect("/login");
}

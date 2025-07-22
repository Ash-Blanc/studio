"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// This is a placeholder for a real authentication function.
// In a real application, you would use the Firebase Admin SDK or a similar
// service to verify the user's credentials and create a session.
async function authenticateUser(mode: "login" | "signup", data: FormData) {
  const email = data.get("email");
  console.log(`Attempting ${mode} for:`, email);

  // Simulate a successful authentication
  // In a real app, you would get a session token from your auth provider
  const sessionToken = `fake-token-for-${email}-${Date.now()}`;

  // Set a session cookie
  cookies().set("auth_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return { success: true };
}

export async function login(formData: FormData) {
  await authenticateUser("login", formData);
  redirect("/studio");
}

export async function signup(formData: FormData) {
  await authenticateUser("signup", formData);
  redirect("/studio");
}

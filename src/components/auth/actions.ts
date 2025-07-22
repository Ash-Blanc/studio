"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin SDK
// This needs to be done once, so we check if it's already initialized.
if (!getApps().length) {
  initializeApp({
    // Your Firebase Admin SDK config here, or it can be auto-inferred 
    // from environment variables like GOOGLE_APPLICATION_CREDENTIALS
    // when deployed on Google Cloud.
  });
}

// This function takes the ID token from the client, verifies it,
// and creates a session cookie.
export async function createSession(idToken: string) {
  try {
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });

    // Set the session cookie.
    cookies().set("auth_token", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return { success: true };
    
  } catch (error) {
    console.error("Error creating session:", error);
    // You might want to handle this more gracefully
    return { success: false, error: "Failed to create session." };
  }
}

export async function clearSession() {
  cookies().delete("auth_token");
  redirect("/login");
}

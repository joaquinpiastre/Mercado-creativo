import { cookies } from "next/headers";
import { getIronSession, type IronSession } from "iron-session";

export interface SessionData {
  adminId?: string;
  username?: string;
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret || sessionSecret.length < 32) {
  throw new Error(
    "SESSION_SECRET debe estar definido en .env y tener al menos 32 caracteres"
  );
}

export const sessionOptions = {
  password: sessionSecret,
  cookieName: "feria_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

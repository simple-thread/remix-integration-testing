import type { User } from "@prisma/client";
import { installGlobals } from "@remix-run/node/globals";
import { parse } from "cookie";
import { createUserSession } from "~/auth.server";

installGlobals();

export async function setupUserSession(user: User) {
  const createSessionResponse = await createUserSession({
    request: new Request(""),
    userId: user.id,
    remember: false,
    redirectTo: "/",
  });
  const cookieValue = createSessionResponse.headers.get("Set-Cookie");
  if (!cookieValue)
    throw new Error("Cookies missing from createSessionResponse");

  const parsedCookie = parse(cookieValue);

  return parsedCookie.__session;
}

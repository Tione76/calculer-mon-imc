import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY?.trim().replace(/^["']|["']$/g, "");

/**
 * Sert le fichier de vérification IndexNow.
 * Chemins acceptés :
 *   - /indexnow.txt          (fichier public versionné + fallback env)
 *   - /{INDEXNOW_KEY}.txt    (Option 1 du protocole)
 */
export function middleware(request: NextRequest) {
  if (!INDEXNOW_KEY) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const isIndexNowAlias = pathname === "/indexnow.txt";
  const isKeyFile = pathname === `/${INDEXNOW_KEY}.txt`;

  if (!isIndexNowAlias && !isKeyFile) {
    return NextResponse.next();
  }

  return new NextResponse(INDEXNOW_KEY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}

export const config = {
  matcher: ["/indexnow.txt", "/:key.txt"],
};

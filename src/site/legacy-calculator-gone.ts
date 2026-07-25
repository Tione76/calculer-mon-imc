import { NextResponse } from "next/server";

const GONE_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Contenu retiré (410)</title>
</head>
<body>
  <main>
    <h1>Ce calculateur n&apos;est plus disponible</h1>
    <p>Cette page a été retirée du site Calculer Mon IMC.</p>
    <p><a href="/">Retour à l&apos;accueil</a></p>
  </main>
</body>
</html>`;

/** Réponse HTTP 410 Gone pour une URL de calculateur retirée du site. */
export function createLegacyCalculatorGoneResponse(): NextResponse {
  return new NextResponse(GONE_HTML, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

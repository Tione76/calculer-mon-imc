#!/usr/bin/env node
import { randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const key = randomBytes(16).toString("hex");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexNowPath = path.join(root, "public", "indexnow.txt");
const keyFilePath = path.join(root, "public", `${key}.txt`);

writeFileSync(indexNowPath, key, "utf8");
writeFileSync(keyFilePath, key, "utf8");

console.log("Clé IndexNow générée :\n");
console.log(key);
console.log("\nFichiers écrits (contenu = clé, sans retour à la ligne superflu) :");
console.log(`  - public/indexnow.txt`);
console.log(`  - public/${key}.txt`);
console.log("\nÉtapes suivantes :");
console.log("1. Secret GitHub INDEXNOW_KEY = cette clé (identique).");
console.log("2. Secret GitHub SITE_URL = https://calculer-mon-imc.fr");
console.log("3. Variable Vercel Production INDEXNOW_KEY = cette clé (recommandé).");
console.log("4. Committez public/indexnow.txt (et public/<clé>.txt), puis redéployez.");
console.log("5. Vérifiez : https://calculer-mon-imc.fr/indexnow.txt");
console.log("\nExemple local (.env.local, non versionné) :");
console.log(`INDEXNOW_KEY=${key}`);
console.log("SITE_URL=https://calculer-mon-imc.fr");

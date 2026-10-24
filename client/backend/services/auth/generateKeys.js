import crypto from "node:crypto";
import fs from "node:fs";

// const { publicKey, privetKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048,
//   publicKeyEncoding: {
//     type: "spki",
//     format: "pem",
//   },
//   privateKeyEncoding: {
//     type: "pkcs8",
//     format: "pem",
//   },
// });
// console.log(typeof privetKey,typeof publicKey)

// fs.writeFileSync("./privet.pem", privetKey, { mode: 0o600 });
// fs.writeFileSync("./public.pem", publicKey);
// console.log("RSA keys generated successfully");
// console.log("Privet key saved privet.pem");
// console.log("Public key saved to public.pem");

const keys = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

console.log(Object.keys(keys));
fs.writeFileSync("./private.pem", keys.privateKey, { mode: 0o600 });
fs.writeFileSync("./public.pem", keys.publicKey);
console.log("RSA keys generated successfully");

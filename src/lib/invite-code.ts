import { createHash, randomBytes } from "crypto";

export function hashInviteCode(code: string) {
  const pepper = process.env.INVITE_CODE_PEPPER ?? "";
  return createHash("sha256").update(`${code.trim().toUpperCase()}:${pepper}`).digest("hex");
}

export function generateInviteCode() {
  return randomBytes(4).toString("hex").toUpperCase();
}

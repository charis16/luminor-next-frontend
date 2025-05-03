import jwt from "jsonwebtoken";

interface JwtPayload {
  user_id: string;
  role: "admin" | "client"; // sesuaikan jika ada role lain
  exp: number;
  iat: number;
}

export function verifyJwtToken(token: string): JwtPayload {
  try {
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded || typeof decoded !== "object" || !("payload" in decoded)) {
      throw new Error("Invalid token structure");
    }

    return decoded.payload as JwtPayload;
  } catch (err) {
    throw new Error("Token invalid or expired");
  }
}

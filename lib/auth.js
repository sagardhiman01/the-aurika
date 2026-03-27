import jwt from "jsonwebtoken";
import prisma from "./prisma";

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}
export function verifyToken(token) {
  try { return jwt.verify(token, process.env.JWT_SECRET); }
  catch { return null; }
}
export function getTokenFromRequest(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) return authHeader.split(" ")[1];
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").reduce((acc, c) => {
      const [k, v] = c.trim().split("="); acc[k] = v; return acc;
    }, {});
    return cookies["auth-token"];
  }
  return null;
}
export async function authenticateUser(request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
export async function requireAuth(request) {
  const user = await authenticateUser(request);
  if (!user) throw new Error("Authentication required");
  return user;
}
export async function requireAdmin(request) {
  const user = await requireAuth(request);
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser || dbUser.role !== "admin") throw new Error("Admin access required");
  return dbUser;
}
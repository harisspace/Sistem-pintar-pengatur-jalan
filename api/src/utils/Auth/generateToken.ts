import jwt from "jsonwebtoken";

export function generateToken(user: { username: string; email: string }) {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export function verifyToken(token: string, jwtSecret: string, callback?: any) {
  if (callback) {
    return jwt.verify(token, jwtSecret, callback);
  } else {
    return jwt.verify(token, jwtSecret);
  }
}

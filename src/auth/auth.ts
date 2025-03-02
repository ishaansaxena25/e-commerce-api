import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "mysecretkey";

function createTokenForUser(user: any) {
  const payload = {
    id: user._id,
    email: user.email,
    role: "user",
  };
  return jwt.sign(payload, secret);
}

function createTokenForAdmin(admin: any) {
  const payload = {
    id: admin._id,
    email: admin.email,
    role: "admin",
  };
  return jwt.sign(payload, secret);
}

function verifyToken(token: string) {
  const payload = jwt.verify(token, secret);
  return payload;
}

export { createTokenForUser, createTokenForAdmin, verifyToken };

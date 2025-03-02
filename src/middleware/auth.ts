const verifyToken = require("../auth/auth").verifyToken;
function checkforAuthCookie(cookieName: string) {
  return (req: any, res: any, next: any) => {
    const tokenCookie = req.cookies[cookieName];
    if (!tokenCookie) {
      return next();
    }
    try {
      const userPayload = verifyToken(tokenCookie);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

function checkforAdmin(req: any, res: any, next: any) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

export { checkforAuthCookie, checkforAdmin };

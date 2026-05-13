export function extractUserId(req, res, next) {
  const userId = req.headers["x-user-id"];
  
  if (!userId) {
    return res.status(401).json({ error: "User ID not provided" });
  }
  
  req.userId = userId;
  next();
}
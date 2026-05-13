import { syncUserProfileForUser } from "../services/syncUserProfile.js";

export async function syncUserController(req, res) {
  try {
    const userId = req.userId;
    const { email, fullName, avatarUrl } = req.body ?? {};

    const result = await syncUserProfileForUser({
      userId,
      email,
      fullName,
      avatarUrl,
    });

    res.json(result);
  } catch (err) {
    const status = typeof err?.status === "number" ? err.status : 500;
    res
      .status(status)
      .json({ error: "Failed to sync user", details: err.message });
  }
}

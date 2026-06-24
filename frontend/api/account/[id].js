import { findAccount } from "../_data/accounts.js";
import { applyCors, sendError } from "../_lib/http.js";

// GET /api/account/:id  (id may be an account ID or phone number)
export default function handler(req, res) {
  applyCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return sendError(res, 405, "Method not allowed");

  const { id } = req.query;
  const account = findAccount(id);
  if (!account) {
    return sendError(res, 404, `No account found for identifier "${id}"`);
  }
  return res.status(200).json({ data: account });
}

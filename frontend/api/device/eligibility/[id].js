import {
  eligibilityByAccount,
  recommendedDevices,
  resolveAccountId
} from "../../_data/devices.js";
import { applyCors, sendError } from "../../_lib/http.js";

// GET /api/device/eligibility/:id  (id may be an account ID or phone number)
export default function handler(req, res) {
  applyCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return sendError(res, 405, "Method not allowed");

  const { id } = req.query;
  const accountId = resolveAccountId(id);
  if (!accountId || !eligibilityByAccount[accountId]) {
    return sendError(res, 404, `No eligibility record found for "${id}"`);
  }

  return res.status(200).json({
    data: {
      accountId,
      ...eligibilityByAccount[accountId],
      recommendedDevices
    }
  });
}

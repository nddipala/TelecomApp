import { createUpgradeRequest } from "../_data/upgradeStore.js";
import { applyCors, sendError } from "../_lib/http.js";

const REQUIRED_FIELDS = ["accountId", "selectedDeviceId", "selectedDeviceName"];

// POST /api/upgrade/submit
export default function handler(req, res) {
  applyCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return sendError(res, 405, "Method not allowed");

  // Vercel parses JSON bodies automatically; fall back gracefully otherwise.
  const body = typeof req.body === "object" && req.body ? req.body : {};

  const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
  if (missing.length > 0) {
    return sendError(res, 400, "Missing required fields", { missing });
  }

  const record = createUpgradeRequest({
    accountId: body.accountId,
    customerName: body.customerName || null,
    selectedDeviceId: body.selectedDeviceId,
    selectedDeviceName: body.selectedDeviceName,
    tradeInModel: body.tradeInModel || null,
    tradeInValue: typeof body.tradeInValue === "number" ? body.tradeInValue : null,
    contactEmail: body.contactEmail || null,
    notes: body.notes || null
  });

  return res.status(201).json({
    data: record,
    message: `Upgrade request ${record.referenceId} submitted successfully.`
  });
}

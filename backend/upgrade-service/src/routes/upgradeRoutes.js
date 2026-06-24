import { Router } from "express";
import {
  createUpgradeRequest,
  listUpgradeRequests,
  getUpgradeRequest
} from "../store/upgradeRequests.js";
import { ApiError } from "../middleware/errorHandler.js";

const router = Router();

const REQUIRED_FIELDS = ["accountId", "selectedDeviceId", "selectedDeviceName"];

/**
 * POST /upgrade/submit
 * Validates and stores an upgrade request, returning a reference ID.
 *
 * Expected body:
 * {
 *   accountId, customerName, selectedDeviceId, selectedDeviceName,
 *   tradeInModel, tradeInValue, contactEmail, notes
 * }
 */
router.post("/upgrade/submit", (req, res) => {
  const body = req.body || {};

  const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
  if (missing.length > 0) {
    throw new ApiError(400, "Missing required fields", { missing });
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

  res.status(201).json({
    data: record,
    message: `Upgrade request ${record.referenceId} submitted successfully.`
  });
});

/**
 * GET /upgrade/requests
 * Lists all submitted upgrade requests (useful for an internal agent view).
 */
router.get("/upgrade/requests", (req, res) => {
  res.json({ data: listUpgradeRequests() });
});

/**
 * GET /upgrade/requests/:referenceId
 * Fetch a single request by reference ID.
 */
router.get("/upgrade/requests/:referenceId", (req, res) => {
  const record = getUpgradeRequest(req.params.referenceId);
  if (!record) {
    throw new ApiError(404, `No upgrade request found for "${req.params.referenceId}"`);
  }
  res.json({ data: record });
});

export default router;

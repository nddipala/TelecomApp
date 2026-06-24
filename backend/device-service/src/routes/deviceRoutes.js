import { Router } from "express";
import {
  eligibilityByAccount,
  recommendedDevices,
  resolveAccountId,
  lookupTradeIn
} from "../data/devices.js";
import { ApiError } from "../middleware/errorHandler.js";

const router = Router();

/**
 * GET /device/eligibility/:id
 * Returns upgrade eligibility for the account plus the recommended upgrade catalog.
 * `:id` may be an account ID or phone number.
 */
router.get("/device/eligibility/:id", (req, res) => {
  const accountId = resolveAccountId(req.params.id);

  if (!accountId || !eligibilityByAccount[accountId]) {
    throw new ApiError(404, `No eligibility record found for "${req.params.id}"`);
  }

  res.json({
    data: {
      accountId,
      ...eligibilityByAccount[accountId],
      recommendedDevices
    }
  });
});

/**
 * GET /device/tradein/:model
 * Returns the current promotional trade-in value for a device model.
 * Applies a small condition-based adjustment so the number feels realistic.
 */
router.get("/device/tradein/:model", (req, res) => {
  const tradeIn = lookupTradeIn(req.params.model);

  if (!tradeIn) {
    throw new ApiError(
      404,
      `No trade-in value available for model "${req.params.model}"`
    );
  }

  // Estimated value range gives the UI something realistic to display.
  const estimatedLow = Math.round(tradeIn.baseValue * 0.7);
  const estimatedHigh = tradeIn.baseValue;

  res.json({
    data: {
      ...tradeIn,
      estimatedLow,
      estimatedHigh,
      note: "Final value confirmed after device inspection."
    }
  });
});

export default router;

import { lookupTradeIn } from "../../_data/devices.js";
import { applyCors, sendError } from "../../_lib/http.js";

// GET /api/device/tradein/:model
export default function handler(req, res) {
  applyCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return sendError(res, 405, "Method not allowed");

  const { model } = req.query;
  const tradeIn = lookupTradeIn(model);
  if (!tradeIn) {
    return sendError(res, 404, `No trade-in value available for model "${model}"`);
  }

  const estimatedLow = Math.round(tradeIn.baseValue * 0.7);
  const estimatedHigh = tradeIn.baseValue;

  return res.status(200).json({
    data: {
      ...tradeIn,
      estimatedLow,
      estimatedHigh,
      note: "Final value confirmed after device inspection."
    }
  });
}

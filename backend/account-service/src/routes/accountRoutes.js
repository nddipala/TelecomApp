import { Router } from "express";
import { findAccount } from "../data/accounts.js";
import { ApiError } from "../middleware/errorHandler.js";

const router = Router();

/**
 * GET /account/:id
 * Returns customer info, plan, contract end date, and remaining balance.
 * `:id` may be an account ID (ACC-xxxxxx) or a phone number.
 */
router.get("/account/:id", (req, res) => {
  const account = findAccount(req.params.id);

  if (!account) {
    throw new ApiError(404, `No account found for identifier "${req.params.id}"`);
  }

  res.json({ data: account });
});

export default router;

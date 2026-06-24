import { accountClient, deviceClient, upgradeClient } from "./apiClients.js";

/**
 * Thin service layer that wraps the microservice endpoints.
 * Components call these functions instead of touching Axios directly.
 */

export async function fetchAccount(identifier) {
  const { data } = await accountClient.get(`/account/${encodeURIComponent(identifier)}`);
  return data.data;
}

export async function fetchEligibility(identifier) {
  const { data } = await deviceClient.get(
    `/device/eligibility/${encodeURIComponent(identifier)}`
  );
  return data.data;
}

export async function fetchTradeInValue(model) {
  const { data } = await deviceClient.get(`/device/tradein/${encodeURIComponent(model)}`);
  return data.data;
}

export async function submitUpgradeRequest(payload) {
  const { data } = await upgradeClient.post("/upgrade/submit", payload);
  return data;
}

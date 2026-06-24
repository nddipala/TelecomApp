/**
 * In-memory store for submitted upgrade requests.
 *
 * Requests live for the lifetime of the process only — perfect for a demo and
 * keeps the "no external DB" requirement. The API surface (create/list/get)
 * mirrors what a thin repository layer over a real database would expose, so
 * swapping in Postgres later would not change the route handlers.
 */

const requests = [];
let sequence = 1000;

function generateReferenceId() {
  sequence += 1;
  // e.g. UPG-2026-1001
  return `UPG-2026-${sequence}`;
}

export function createUpgradeRequest(payload) {
  const record = {
    referenceId: generateReferenceId(),
    status: "SUBMITTED",
    submittedAt: new Date().toISOString(),
    ...payload
  };
  requests.push(record);
  return record;
}

export function listUpgradeRequests() {
  return [...requests];
}

export function getUpgradeRequest(referenceId) {
  return requests.find((r) => r.referenceId === referenceId);
}

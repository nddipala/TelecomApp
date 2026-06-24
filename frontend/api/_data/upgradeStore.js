/**
 * In-memory upgrade request store (deployment copy).
 *
 * NOTE: On serverless infrastructure this array only persists for the lifetime
 * of a warm function instance, so the listing endpoints are best-effort. The
 * primary demo flow (submit → confirmation) returns the created record in the
 * same request and always works. Swap this module for a real database to make
 * requests durable.
 */

const requests = [];
let sequence = 1000;

function generateReferenceId() {
  sequence += 1;
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

import { useState } from "react";
import { submitUpgradeRequest } from "../services/upgradeService.js";
import StatusBadge from "./StatusBadge.jsx";

/**
 * Upgrade submission form. Receives the account, the selected device, and any
 * resolved trade-in value, then POSTs to the Upgrade Service.
 */
export default function UpgradeForm({ account, selectedDevice, tradeIn }) {
  const [contactEmail, setContactEmail] = useState(account?.customer?.email || "");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    if (!selectedDevice) {
      setError("Please select an upgrade device from the catalog above.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitUpgradeRequest({
        accountId: account.accountId,
        customerName: `${account.customer.firstName} ${account.customer.lastName}`,
        selectedDeviceId: selectedDevice.id,
        selectedDeviceName: selectedDevice.name,
        tradeInModel: tradeIn?.model || account.device.model,
        tradeInValue: tradeIn?.estimatedHigh ?? null,
        contactEmail,
        notes
      });
      setConfirmation(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <section className="card p-6">
        <div className="flex items-center gap-2">
          <StatusBadge tone="success">Submitted</StatusBadge>
          <h3 className="text-lg font-bold text-ink">Upgrade request received</h3>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Reference ID:{" "}
          <span className="font-bold text-ink">{confirmation.referenceId}</span>
        </p>
        <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <Detail label="Device" value={confirmation.selectedDeviceName} />
          <Detail label="Account" value={confirmation.accountId} />
          <Detail label="Status" value={confirmation.status} />
          <Detail
            label="Submitted"
            value={new Date(confirmation.submittedAt).toLocaleString()}
          />
        </dl>
      </section>
    );
  }

  return (
    <section className="card p-6">
      <h3 className="text-lg font-bold text-ink">Submit Upgrade Request</h3>
      <p className="mt-1 text-sm text-gray-500">
        Review the selection below and submit on behalf of the customer.
      </p>

      <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm">
        <p>
          <span className="font-semibold text-gray-500">Selected device: </span>
          <span className="font-bold text-ink">
            {selectedDevice ? selectedDevice.name : "None selected"}
          </span>
        </p>
        <p className="mt-1">
          <span className="font-semibold text-gray-500">Trade-in: </span>
          <span className="font-bold text-ink">
            {tradeIn ? `${tradeIn.model}` : account.device.model}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-600">
            Contact email
          </label>
          <input
            type="email"
            required
            className="input-field"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="customer@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-600">
            Notes (optional)
          </label>
          <textarea
            className="input-field min-h-[90px] resize-y"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions for this upgrade..."
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Upgrade Request"}
        </button>
      </form>
    </section>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </dt>
      <dd className="mt-0.5 font-bold text-ink">{value}</dd>
    </div>
  );
}

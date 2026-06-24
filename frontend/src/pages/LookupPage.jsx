import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../context/AccountContext.jsx";

/** Landing page: enter a phone number or account ID to pull up a customer. */
export default function LookupPage() {
  const [identifier, setIdentifier] = useState("");
  const { lookupAccount, loading, error } = useAccount();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!identifier.trim()) return;
    try {
      await lookupAccount(identifier.trim());
      navigate("/dashboard");
    } catch {
      // Error is surfaced via context state below.
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        <span className="badge bg-magenta/10 text-magenta">Internal Retail Console</span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">
          Smart Device Upgrade Tracker
        </h1>
        <p className="mt-3 text-gray-600">
          Look up a customer to view upgrade eligibility, contract details,
          trade-in value, and submit an upgrade request.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card mt-10 p-6">
        <label className="mb-2 block text-sm font-semibold text-gray-600">
          Phone number or Account ID
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className="input-field"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. 206-555-0142 or ACC-100245"
            autoFocus
          />
          <button type="submit" className="btn-primary whitespace-nowrap" disabled={loading}>
            {loading ? "Searching..." : "Look Up Customer"}
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Sample accounts
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SAMPLE_ACCOUNTS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => setIdentifier(sample.id)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-magenta hover:text-magenta"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

const SAMPLE_ACCOUNTS = [
  { id: "ACC-100245", label: "Maria H. · Eligible" },
  { id: "ACC-100246", label: "James O. · Not eligible" },
  { id: "646-555-0107", label: "Aisha P. · Go5G Next" },
  { id: "ACC-100248", label: "Daniel K. · New device" }
];

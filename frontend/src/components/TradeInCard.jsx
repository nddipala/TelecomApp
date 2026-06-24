import { useState } from "react";
import { fetchTradeInValue } from "../services/upgradeService.js";
import { formatCurrency } from "../utils/format.js";
import Loader from "./Loader.jsx";

/**
 * Lets the agent check the trade-in value for the customer's current device
 * (prefilled) or any other model. Calls the Device Service on demand.
 */
export default function TradeInCard({ defaultModel, onValueResolved }) {
  const [model, setModel] = useState(defaultModel || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheck(event) {
    event.preventDefault();
    if (!model.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await fetchTradeInValue(model.trim());
      setResult(data);
      onValueResolved?.(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card p-6">
      <h3 className="text-lg font-bold text-ink">Trade-In Estimator</h3>
      <p className="mt-1 text-sm text-gray-500">
        Check the current promotional trade-in value for a device.
      </p>

      <form onSubmit={handleCheck} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          className="input-field"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="e.g. iPhone 13 Pro"
          aria-label="Device model"
        />
        <button type="submit" className="btn-primary whitespace-nowrap" disabled={loading}>
          Check Value
        </button>
      </form>

      {loading && <Loader label="Estimating trade-in value..." />}

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {result && !loading && (
        <div className="mt-5 rounded-xl border border-magenta/20 bg-magenta/5 p-5">
          <p className="text-sm font-semibold text-gray-500">{result.model}</p>
          <p className="mt-1 text-3xl font-extrabold text-magenta">
            {formatCurrency(result.estimatedHigh, result.currency)}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Estimated range {formatCurrency(result.estimatedLow, result.currency)} –{" "}
            {formatCurrency(result.estimatedHigh, result.currency)} · Condition:{" "}
            {result.condition}
          </p>
          <p className="mt-2 text-xs text-gray-500">{result.note}</p>
        </div>
      )}
    </section>
  );
}

import { formatDate } from "../utils/format.js";
import StatusBadge from "./StatusBadge.jsx";

/** Shows upgrade eligibility status with a progress bar for upgrade programs. */
export default function EligibilityCard({ eligibility }) {
  const { eligible, reason, eligibleDate, upgradeProgramPercentComplete } = eligibility;

  return (
    <section className="card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink">Upgrade Eligibility</h3>
        {eligible ? (
          <StatusBadge tone="success">Eligible</StatusBadge>
        ) : (
          <StatusBadge tone="warning">Not Yet Eligible</StatusBadge>
        )}
      </div>

      <p className="mt-3 text-sm text-gray-600">{reason}</p>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
          <span>Upgrade program progress</span>
          <span>{upgradeProgramPercentComplete}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all ${
              eligible ? "bg-green-500" : "bg-magenta"
            }`}
            style={{ width: `${upgradeProgramPercentComplete}%` }}
          />
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm">
        <span className="font-semibold text-gray-500">Eligible date: </span>
        <span className="font-bold text-ink">{formatDate(eligibleDate)}</span>
      </div>
    </section>
  );
}

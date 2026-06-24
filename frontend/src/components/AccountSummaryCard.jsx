import { formatCurrency, formatDate } from "../utils/format.js";
import StatusBadge from "./StatusBadge.jsx";

/** Customer overview: contact, plan, contract end date, and balances. */
export default function AccountSummaryCard({ account }) {
  const { customer, plan, contract, billing, device } = account;

  return (
    <section className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink">
            {customer.firstName} {customer.lastName}
          </h2>
          <p className="text-sm text-gray-500">
            {account.accountId} · {account.phoneNumber}
          </p>
        </div>
        <StatusBadge tone="info">{customer.loyaltyTier}</StatusBadge>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Plan" value={plan.name} sub={`${formatCurrency(plan.monthlyPrice)}/mo`} />
        <Stat label="Contract Ends" value={formatDate(contract.endDate)} sub={`${contract.termMonths}-month term`} />
        <Stat
          label="Device Balance"
          value={formatCurrency(billing.remainingDeviceBalance)}
          sub={billing.remainingDeviceBalance > 0 ? "Remaining" : "Paid in full"}
        />
        <Stat label="Current Device" value={device.model} sub={device.storage} />
      </div>
    </section>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 text-base font-bold text-ink">{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

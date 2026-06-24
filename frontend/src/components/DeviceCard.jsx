import { formatCurrency } from "../utils/format.js";

/** A single recommended upgrade device, selectable in the catalog. */
export default function DeviceCard({ device, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(device)}
      className={`card flex w-full flex-col p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${
        selected ? "ring-2 ring-magenta" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-4xl" aria-hidden>
          {device.image}
        </span>
        {selected && (
          <span className="badge bg-magenta text-white">Selected</span>
        )}
      </div>

      <h4 className="mt-3 text-base font-bold text-ink">{device.name}</h4>
      <p className="text-sm text-gray-500">
        {device.storage} · {device.color}
      </p>

      <p className="mt-3 text-lg font-extrabold text-ink">
        {formatCurrency(device.monthlyPrice)}
        <span className="text-sm font-medium text-gray-500">/mo</span>
      </p>
      <p className="text-xs text-gray-400">{formatCurrency(device.retailPrice)} retail</p>

      <p className="mt-3 rounded-lg bg-magenta/5 px-3 py-2 text-xs font-semibold text-magenta">
        {device.promo}
      </p>
    </button>
  );
}

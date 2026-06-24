/** Small colored pill used to show eligibility / request status. */
export default function StatusBadge({ tone = "neutral", children }) {
  const tones = {
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    neutral: "bg-gray-100 text-gray-600"
  };

  return <span className={`badge ${tones[tone] || tones.neutral}`}>{children}</span>;
}

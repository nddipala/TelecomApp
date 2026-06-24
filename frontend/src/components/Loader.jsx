/** Simple inline spinner. */
export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-gray-500">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-magenta" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default function Enddate({ value, onChange }) {
  return (
    <div className="mt-4">
      <label className="block font-medium mb-1">End Date:</label>
      <input
        type="text"
        placeholder="DD-MM-YYYY"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

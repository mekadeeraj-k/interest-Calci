export default function Rate({ value, onChange }) {
  return (
    <div className="mt-4">
      <label className="block font-medium mb-1">Rate of Interest (%):</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Rate of Interest"
        className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default function Enddate({ value, onChange }) {
  const handleInput = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 2) input = input.slice(0, 2) + "-" + input.slice(2);
    if (input.length > 5) input = input.slice(0, 5) + "-" + input.slice(5, 9);
    if (input.length > 10) input = input.slice(0, 10);
    onChange(input);
  };

  const getReadableDate = (str) => {
    const parts = str.split("-");
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const year = parseInt(parts[2]);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const date = new Date(year, month, day);
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("en-IN", options);
      }
    }
    return "";
  };

  return (
    <div className="mt-4">
      <label className="block font-medium mb-1">End Date:</label>
      <input
        type="text"
        placeholder="DD-MM-YYYY"
        value={value}
        onChange={handleInput}
        className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {value && (
        <p className="text-gray-600 mt-1 text-sm">
          {getReadableDate(value)}
        </p>
      )}
    </div>
  );
}

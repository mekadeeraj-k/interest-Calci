import { useState } from "react";
import Principal from "./Component/principal";
import Rate from "./Component/Rate";
import StartDate from "./Component/Startdate";
import EndDate from "./Component/Endate";
import './App.css'

function App() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [calculatedInterest, setCalculatedInterest] = useState(null);
  const [error, setError] = useState("");
  const [rateType, setRateType] = useState("annual");
  const [calcType, setCalcType] = useState("simple");
  const [dayCount, setDayCount] = useState("actual365");

  function calculateInterest() {
    const p = Number(principal);
    const r = Number(rate);

    if (!p || p <= 0 || !r || r <= 0 || !startDate || !endDate) {
      setError(
        "⚠ Please enter valid Principal, Rate, Start Date, and End Date."
      );
      setCalculatedInterest(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      setError("⚠ End Date must be after Start Date.");
      setCalculatedInterest(null);
      return;
    }

    let rateToUse = r;
    if (rateType === "monthly") {
      rateToUse *= 12;
    }

    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
    let timeInYears2;
    if (dayCount === "actual365") {
      timeInYears2 = diffInDays / 365;
    } else if (dayCount === "actualActual") {
      const yearDays =
        ((start.getFullYear() % 4 === 0 ? 366 : 365) +
          (end.getFullYear() % 4 === 0 ? 366 : 365)) /
        2;
      timeInYears2 = diffInDays / yearDays;
    }

    let interest;
    if (calcType === "simple") {
      interest = (p * rateToUse * timeInYears2) / 100;
    } else {
      const n = 1;
      interest = p * Math.pow(1 + rateToUse / (n * 100), n * timeInYears2) - p;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const total = p + interest;

    setError(null);
    setCalculatedInterest({
      interest: interest.toFixed(2),
      total: total.toFixed(2),
      duration: `${years} years, ${months} months, ${days} days`,
    });
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center sm:p-6">
    <div className="p-6 rounded-lg shadow-lg w-full max-w-md bg-white bg-opacity-80 backdrop-blur-sm">
      <h1 className="sm:text-2xl font-bold mb-6 text-center text-indigo-800">Interest Calculator</h1>

      <Principal value={principal} onChange={setPrincipal} />
      <Rate value={rate} onChange={setRate} />
      <StartDate value={startDate} onChange={setStartDate} />
      <EndDate value={endDate} onChange={setEndDate} />

      <label className="block mt-4 font-medium text-sm sm:text-base text-gray-700">
        Interest Rate Type:
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={rateType}
          onChange={(e) => setRateType(e.target.value)}
        >
          <option value="annual">Annual</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>

      <label className="block mt-4 font-medium text-sm sm:text-base text-gray-700">
        Calculation Type:
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={calcType}
          onChange={(e) => setCalcType(e.target.value)}
        >
          <option value="simple">Simple Interest</option>
          <option value="compound">Compound Interest</option>
        </select>
      </label>

      <label className="block mt-4 font-medium text-sm sm:text-base text-gray-700">
        Day-Count Convention:
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={dayCount}
          onChange={(e) => setDayCount(e.target.value)}
        >
          <option value="actual365">Actual/365</option>
          <option value="actualActual">Actual/Actual</option>
        </select>
      </label>

      <div className="mt-6 flex sm:flex-row gap-3">
        <button
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md"
          onClick={calculateInterest}
        >
          Calculate
        </button>
        <button
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md"
          onClick={() => {
            setPrincipal("");
            setRate("");
            setStartDate("");
            setEndDate("");
            setCalculatedInterest(null);
          }}
        >
          Reset
        </button>
      </div>

      {calculatedInterest && (
        <div className="mt-6 p-4 border rounded-md text-sm sm:text-base bg-green-100">
          <p className="font-semibold">
            Interest: ₹{Number(calculatedInterest.interest).toLocaleString("en-IN")}
          </p>
          <p>
            Total Amount: ₹{Number(calculatedInterest.total).toLocaleString("en-IN")}
          </p>
          <p>Duration: {calculatedInterest.duration}</p>
        </div>
      )}

      {error && <p className="mt-4 text-red-500 text-sm sm:text-base font-medium">{error}</p>}
    </div>
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-gray-100 border-t border-gray-700 py-1.5 px-4 text-center text-[10px] sm:text-xs rounded-t-md shadow-md">
  © {new Date().getFullYear()} Interest Calculator — Developed by Deeraj Kumar Meka. All Rights Reserved.
</footer>



  </div>
  
);




}

export default App;

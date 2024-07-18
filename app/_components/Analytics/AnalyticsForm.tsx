import React, { useState, useEffect } from "react";
import { fetchRevenueData } from "@/store/action/analyticsSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { useSession } from "next-auth/react";

const AnalyticsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { revenueData, status, error } = useAppSelector(
    (state: RootState) => state.analytics
  );

  const { data: session, status: sessionStatus } = useSession();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [interval, setInterval] = useState<"hourly" | "daily" | "monthly">("monthly");
  const [formattedData, setFormattedData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (status === "succeeded" && interval === "monthly") {
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const currentYear = new Date().getFullYear();
      
      const formattedResult = months.reduce((acc, month, index) => {
        const key = `${currentYear}-${String(index + 1).padStart(2, '0')}`;
        acc[month] = revenueData[key] || 0;
        return acc;
      }, {} as { [key: string]: number });

      setFormattedData(formattedResult);
    }
  }, [revenueData, status, interval]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user?.id) {
      try {
        await dispatch(fetchRevenueData({ 
          userId: session.user.id, 
          startDate, 
          endDate, 
          interval 
        })).unwrap();
      } catch (err) {
        console.error("Failed to fetch revenue data:", err);
      }
    } else {
      console.error("User ID not available");
    }
  };

  if (sessionStatus === "loading") {
    return <div>Loading session...</div>;
  }

  if (sessionStatus === "unauthenticated") {
    return <div>Please sign in to access analytics.</div>;
  }

  return (
    <div>
      <h2>Revenue Analytics</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>{`User: ${session?.user?.username || 'Unknown'}`}</h3>
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="datetime-local"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="interval">Interval:</label>
          <select
            id="interval"
            value={interval}
            onChange={(e) =>
              setInterval(e.target.value as "hourly" | "daily" | "monthly")
            }
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button type="submit" disabled={!session?.user?.id || status === "loading"}>
          {status === "loading" ? "Fetching..." : "Fetch Revenue Data"}
        </button>
      </form>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error || "Failed to fetch data. Please try again."}</p>}
      {status === "succeeded" && (
        <div>
          <h3>Revenue Data:</h3>
          {interval === "monthly" ? (
            <ul>
              {Object.entries(formattedData).map(([month, revenue]) => (
                <li key={month}>
                  {month}: ${revenue.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {Object.entries(revenueData).length > 0 ? (
                Object.entries(revenueData).map(([date, revenue]) => (
                  <li key={date}>
                    {date}: ${revenue.toFixed(2)}
                  </li>
                ))
              ) : (
                <li>No data available for the selected period.</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsForm;
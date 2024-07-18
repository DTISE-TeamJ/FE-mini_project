import React, { useState, useEffect } from "react";
import { fetchRevenueData } from "@/store/action/analyticsSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { useSession } from "next-auth/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChartContainer,
  BarChartInfo,
  BarChartTitle,
  BarChartWrapper,
  ChartInfoData,
  InfoDataText,
  InfoDataValue,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Select,
} from "./style";

const AnalyticsBarChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { revenueData, status, error } = useAppSelector(
    (state: RootState) => state.analytics
  );

  const { data: session, status: sessionStatus } = useSession();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [interval, setInterval] = useState<"hourly" | "daily" | "monthly">(
    "monthly"
  );
  const [chartData, setChartData] = useState<
    Array<{ month: string; revenue: number }>
  >([]);

  useEffect(() => {
    if (status === "succeeded" && interval === "monthly") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const currentYear = new Date().getFullYear();

      const formattedData = months.map((month, index) => {
        const key = `${currentYear}-${String(index + 1).padStart(2, "0")}`;
        return {
          month: month,
          revenue: revenueData[key] || 0,
        };
      });

      setChartData(formattedData);
    }
  }, [revenueData, status, interval]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user?.id) {
      try {
        await dispatch(
          fetchRevenueData({
            userId: session.user.id,
            startDate,
            endDate,
            interval,
          })
        ).unwrap();
      } catch (err) {
        console.error("Failed to fetch revenue data:", err);
      }
    } else {
      console.error("User ID not available");
    }
  };

  const formatTooltipValue = (value: number) => {
    return `IDR${value.toFixed(2)}`;
  };

  const formatYAxisLabel = (value: number) => {
    return `IDR${value / 1000}k`;
  };

  if (sessionStatus === "loading") {
    return <div>Loading session...</div>;
  }

  if (sessionStatus === "unauthenticated") {
    return <div>Please sign in to access analytics.</div>;
  }

  return (
    <BarChartContainer>
      <BarChartInfo>
        <BarChartTitle>Revenue Analytics</BarChartTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="datetime-local"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              type="datetime-local"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="interval">Interval</Label>
            <Select
              id="interval"
              value={interval}
              onChange={(e) =>
                setInterval(e.target.value as "hourly" | "daily" | "monthly")
              }
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </Select>
          </FormGroup>
          <Button
            type="submit"
            disabled={!session?.user?.id || status === "loading"}
          >
            {status === "loading" ? "Fetching..." : "Fetch Revenue Data"}
          </Button>
        </Form>
      </BarChartInfo>
      <BarChartWrapper>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && (
          <p>Error: {error || "Failed to fetch data. Please try again."}</p>
        )}
        {status === "succeeded" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={700}
              height={500}
              data={chartData}
              margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
            >
              <XAxis
                padding={{ left: 10 }}
                dataKey="month"
                tickSize={0}
                axisLine={false}
                tick={{
                  fill: "#676767",
                  fontSize: 14,
                }}
              />
              <YAxis
                padding={{ bottom: 10, top: 10 }}
                tickFormatter={formatYAxisLabel}
                tickCount={6}
                axisLine={false}
                tickSize={0}
                tick={{
                  fill: "#676767",
                }}
              />
              <Tooltip
                formatter={formatTooltipValue}
                cursor={{ fill: "transparent" }}
              />
              <Legend
                iconType="circle"
                iconSize={10}
                verticalAlign="top"
                align="right"
              />
              <Bar
                dataKey="revenue"
                fill="#475be8"
                activeBar={false}
                isAnimationActive={false}
                barSize={24}
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </BarChartWrapper>
    </BarChartContainer>
  );
};

export default AnalyticsBarChart;

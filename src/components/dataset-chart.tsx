"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

interface ChartDataPoint {
  name: string;
  value: number | null;
}

interface DatasetChartProps {
  data: ChartDataPoint[];
  unit?: string;
}

export function DatasetChart({ data, unit = "" }: DatasetChartProps) {
  const chartData = data
    .map((d, index) => {
      const value = d.value === null ? 0 : d.value;

      // Only apply special coloring for performance metrics (not success rate)
      const isPerformanceChart =
        unit === "%" && data.some((item) => item.name === "Human SOTA");

      let fill;
      if (d.value === 0) {
        fill = "hsl(var(--muted-foreground) / 0.3)";
      } else if (isPerformanceChart) {
        const validValues = data
          .filter(
            (item) =>
              item.value !== null &&
              item.value !== undefined &&
              item.name !== "Human SOTA"
          )
          .map((item) => item.value!);
        const maxValue = validValues.length > 0 ? Math.max(...validValues) : 0;
        const isWinner =
          value === maxValue && value > 0 && d.name !== "Human SOTA";

        fill =
          d.name === "Human SOTA"
            ? "hsl(0, 60%, 45%)" // Subtle red for Human SOTA
            : isWinner
            ? "hsl(160, 50%, 45%)" // Subtle teal for winners
            : d.name.startsWith("Agentomics")
            ? "hsl(var(--primary))"
            : `hsl(var(--chart-${(index % 5) + 1}))`;
      } else {
        // Success rate charts - consistent coloring
        fill = "hsl(var(--primary))";
      }

      return {
        ...d,
        value,
        fill,
      };
    })
    .filter((d) => d.value !== undefined);

  const values = chartData.map((d) => d.value || 0);
  const maxValue = unit === "%" ? 100 : Math.max(...values);
  const buffer = (maxValue - 0) * 0.1;
  const domainMax = values.every((v) => v === 0) ? 0.1 : maxValue + buffer;
  const domain = unit === "%" ? [0, 100] : [0, domainMax];

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border) / 0.5)"
            horizontal={false}
          />
          <XAxis
            type="number"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={domain as [number, number]}
            tickFormatter={(tick) => `${tick}${unit}`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={180}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            itemStyle={{ color: "hsl(var(--foreground))" }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
            formatter={(value, name, props) => {
              const originalPoint = data.find(
                (d) => d.name === props.payload.name
              );
              if (originalPoint && originalPoint.value === null) {
                return (
                  <span style={{ color: "hsl(var(--foreground))" }}>N/A</span>
                );
              }
              const formattedValue =
                typeof value === "number" ? value.toFixed(unit ? 0 : 3) : value;
              return [
                <span
                  key="value"
                  style={{
                    color: "hsl(var(--foreground))",
                    fontWeight: "bold",
                  }}
                >{`${formattedValue}${unit}`}</span>,
                name,
              ];
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            <LabelList
              dataKey="value"
              position="insideRight"
              style={{
                fontSize: "10px",
                fill: "hsl(var(--background))",
                fontWeight: "600",
              }}
              formatter={(value) => {
                if (value === null || value === undefined || value === 0) {
                  return "";
                }
                const formattedValue =
                  typeof value === "number"
                    ? value.toFixed(unit ? 1 : 3)
                    : value;
                return `${formattedValue}${unit}`;
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

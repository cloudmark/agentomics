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
    .map((d) => {
      const value = d.value === null ? 0 : d.value;
      let fill;
      if (d.name === "Agentomics" || d.name.startsWith("Agentomics")) {
        fill = "hsl(var(--primary))";
      } else {
        fill = "hsl(262 40% 45% / 0.5)";
      }
      return { ...d, value, fill };
    });

  return (
    <div className="h-[380px] w-full rounded-xl border border-primary/25 bg-card/40 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 24, right: 16, left: 0, bottom: 72 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            angle={-35}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[0, "auto"]}
            tickFormatter={(tick) => `${tick}${unit}`}
            width={46}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            itemStyle={{ color: "hsl(var(--foreground))" }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            cursor={false}
            formatter={(value) => {
              const fmt = typeof value === "number" ? value.toFixed(1) : value;
              return [`${fmt}${unit}`];
            }}
          />
          <Bar dataKey="value" radius={[5, 5, 0, 0]} barSize={32}>
            <LabelList
              dataKey="value"
              position="top"
              style={{ fontSize: "10px", fill: "hsl(var(--foreground))", fontWeight: "600" }}
              formatter={(value: number) => value ? `${value.toFixed(1)}${unit}` : ""}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";
export interface ClientData {
  additional_msg: string;
  city: string;
  created_at: string;
  email: string;
  goal: string;
  id: string;
  name: string;
  package_interested: string;
  phone: string;
  referrer_id: string;
  status: string;
}

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PieChartComponent({ data }: { data: ClientData[] }) {
  const statusCounts = data?.reduce(
    (acc, client) => {
      switch (client.status) {
        case "success":
          acc.success += 1;

          break;
        case "pending":
          acc.pending += 1;
          break;
        case "rejected":
          acc.rejected += 1;
          break;
        case "contacted":
          acc.contacted += 1;
          break;
        default:
          break;
      }
      return acc;
    },
    { success: 0, pending: 0, rejected: 0, contacted: 0 }
  );
  const chartData = [
    { month: "Success", desktop: statusCounts?.success },
    { month: "Pending", desktop: statusCounts?.pending },
    { month: "Contacted", desktop: statusCounts?.contacted },
    { month: "Rejected", desktop: statusCounts?.rejected },
  ];
  return (
    <Card className=" w-1/2">
      <CardHeader>
        <CardTitle>Refferals Summary</CardTitle>
        <CardDescription>
          From the date of joining to current day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="#2563eb" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total refferals for your account.
        </div>
      </CardFooter>
    </Card>
  );
}

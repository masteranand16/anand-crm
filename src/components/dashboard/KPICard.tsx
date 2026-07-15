import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendUp: boolean;
}

export function KPICard({ title, value, icon: Icon, trend, trendUp }: KPICardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={trendUp ? "text-emerald-500 font-medium" : "text-destructive font-medium"}>
            {trend}
          </span>{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  trend?: number[];
  className?: string;
}

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
};

export function MetricCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  trend = [],
  className,
}: MetricCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap];
  const isPositive = change > 0;
  
  const trendData = trend.map((value, index) => ({ index, value }));

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group",
      "border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50",
      "shadow-sm hover:shadow-xl",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground/80">
              {label}
            </p>
            <p className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {value}
            </p>
          </div>
          <div className={cn(
            "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
            "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25"
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Mini trend chart */}
        {trend.length > 0 && (
          <div className="h-8 mb-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "#10b981" : "#ef4444"}
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray={isPositive ? "0" : "3 3"}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full",
              isPositive 
                ? "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30" 
                : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
            )}
          >
            {isPositive ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </div>
          <span className="text-sm text-muted-foreground">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
}
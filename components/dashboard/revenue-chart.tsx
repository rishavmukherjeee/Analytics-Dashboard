"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { revenueData } from "@/lib/mock-data";
import { TrendingUp, Download, Maximize2, Minimize2 } from "lucide-react";
import { useState, useEffect } from "react";

export function RevenueChart() {
  const [timeframe, setTimeframe] = useState("12m");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const timeframes = [
    { label: "3M", value: "3m" },
    { label: "6M", value: "6m" },
    { label: "12M", value: "12m" },
  ];

  const getFilteredData = () => {
    const months = timeframe === "3m" ? 3 : timeframe === "6m" ? 6 : 12;
    return revenueData.slice(-months);
  };

  const data = getFilteredData();
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue!, 0);
  const avgRevenue = totalRevenue / data.length;

  const handleDownload = () => {
    // Create CSV content
    const csvHeader = "Month,Revenue\n";
    const csvContent = data.map(item => `${item.name},${item.revenue}`).join("\n");
    const csvData = csvHeader + csvContent;
    
    // Create and download file
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `revenue-data-${timeframe}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    if (!isMobile) {
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <Card className={`shadow-sm border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 ${
      isFullscreen 
        ? 'fixed inset-4 z-50 col-span-1' 
        : 'col-span-4'
    }`}>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg md:text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Revenue Overview
            </CardTitle>
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span>Total: ${totalRevenue.toLocaleString()}</span>
              </div>
              <span className="hidden md:inline">•</span>
              <span>Avg: ${Math.round(avgRevenue).toLocaleString()}/month</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
            <div className="flex items-center bg-muted/50 rounded-lg p-1">
              {timeframes.map((tf) => (
                <Button
                  key={tf.value}
                  variant={timeframe === tf.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(tf.value)}
                  className="h-7 px-3 text-xs transition-all duration-200 flex-1 md:flex-none"
                >
                  {tf.label}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 justify-end md:justify-start">
              {!isMobile && (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        <ResponsiveContainer width="100%" height={isFullscreen ? 600 : 280}>
          <AreaChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 90%, 56%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(220, 90%, 56%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRevenueStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(220, 90%, 56%)" />
                <stop offset="100%" stopColor="hsl(220, 70%, 50%)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-sm"
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-sm"
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value / 1000}k`}
              width={40}
            />
            <ReferenceLine 
              y={avgRevenue} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="5 5" 
              opacity={0.5}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-4 shadow-lg">
                      <p className="font-semibold text-foreground">{label}</p>
                      <div className="space-y-1 mt-2">
                        <p className="text-sm flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          Revenue: <span className="font-semibold">${payload[0].value?.toLocaleString()}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {((payload[0].value as number) / avgRevenue * 100 - 100).toFixed(1)}% vs avg
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="url(#colorRevenueStroke)"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
              dot={{ fill: 'hsl(220, 90%, 56%)', strokeWidth: 1, r: 3 }}
              activeDot={{ r: 4, stroke: 'hsl(220, 90%, 56%)', strokeWidth: 2, fill: 'white' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
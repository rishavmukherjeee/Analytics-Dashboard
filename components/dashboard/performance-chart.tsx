"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { revenueData } from "@/lib/mock-data";
import { BarChart3, Download, Maximize2, Minimize2 } from "lucide-react";
import { useState, useEffect } from "react";

export function PerformanceChart() {
  const [metric, setMetric] = useState("both");
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
  
  const metrics = [
    { label: "Both", value: "both" },
    { label: "Users", value: "users" },
    { label: "Conversions", value: "conversions" },
  ];

  const data = revenueData.slice(-6);

  const handleDownload = () => {
    // Create CSV content
    const csvHeader = "Month,Users,Conversions\n";
    const csvContent = data.map(item => 
      `${item.name},${item.users || 0},${item.conversions || 0}`
    ).join("\n");
    const csvData = csvHeader + csvContent;
    
    // Create and download file
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `performance-data-${metric}.csv`;
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
    <>
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={toggleFullscreen} />
      )}
      <Card className={`shadow-sm border-0 bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-900/10 ${
        isFullscreen 
          ? 'fixed inset-2 sm:inset-4 z-50 col-span-1 overflow-auto max-h-screen' 
          : 'col-span-3'
      }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Performance Metrics
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span>Last 6 months comparison</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted/50 rounded-lg p-1">
              {metrics.map((m) => (
                <Button
                  key={m.value}
                  variant={metric === m.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMetric(m.value)}
                  className="h-7 px-3 text-xs transition-all duration-200"
                >
                  {m.label}
                </Button>
              ))}
            </div>
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
      </CardHeader>
      
      <CardContent className="pb-6">
        <ResponsiveContainer width="100%" height={isFullscreen ? (isMobile ? 400 : 500) : 350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-sm"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-sm"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-4 shadow-lg">
                      <p className="font-semibold text-foreground mb-2">{label}</p>
                      <div className="space-y-1">
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: entry.color }}
                            />
                            {entry.dataKey === 'users' ? 'Users' : 'Conversions'}: 
                            <span className="font-semibold">{entry.value?.toLocaleString()}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            {(metric === "both" || metric === "users") && (
              <Bar
                dataKey="users"
                name="Users"
                fill="hsl(220, 90%, 56%)"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            )}
            {(metric === "both" || metric === "conversions") && (
              <Bar
                dataKey="conversions"
                name="Conversions"
                fill="hsl(160, 60%, 45%)"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    </>
  );
}
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { platformData } from "@/lib/mock-data";
import { PieChart as PieChartIcon, Download, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

const COLORS = [
  "hsl(220, 90%, 56%)",
  "hsl(160, 60%, 45%)",
  "hsl(30, 80%, 55%)",
  "hsl(280, 65%, 60%)",
  "hsl(340, 75%, 55%)",
  "hsl(50, 70%, 60%)",
  "hsl(200, 80%, 50%)",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function PlatformChart() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalTraffic = platformData.reduce((sum, item) => sum + item.value, 0);

  const handleDownload = () => {
    // Create CSV content
    const csvHeader = "Platform,Percentage,EstimatedTraffic\n";
    const csvContent = platformData.map(item => 
      `${item.name},${item.value}%,${Math.round(item.value * 1000)}`
    ).join("\n");
    const csvData = csvHeader + csvContent;
    
    // Create and download file
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'platform-traffic-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={toggleFullscreen} />
      )}
      <Card className={`shadow-sm border-0 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-900/10 ${
        isFullscreen 
          ? 'fixed inset-4 z-50 col-span-1 overflow-y-auto' 
          : 'col-span-2'
      }`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Traffic Sources
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <PieChartIcon className="h-4 w-4 text-purple-500" />
              <span>Distribution by platform</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        <ResponsiveContainer width="100%" height={isFullscreen ? 450 : 350}>
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={isFullscreen ? 180 : 120}
              innerRadius={isFullscreen ? 90 : 60}
              paddingAngle={2}
              dataKey="value"
            >
              {platformData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-4 shadow-lg">
                      <p className="font-semibold text-foreground">{data.name}</p>
                      <div className="space-y-1 mt-2">
                        <p className="text-sm flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[platformData.indexOf(data)] }}
                          />
                          Share: <span className="font-semibold">{data.value}%</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Est. traffic: {Math.round(data.value * 1000).toLocaleString()} visits
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => (
                <span className="text-sm text-muted-foreground font-medium">
                  {value}
                </span>
              )}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Platform breakdown */}
        <div className="mt-6 space-y-2">
          {platformData.map((platform, index) => (
            <div key={platform.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="font-medium">{platform.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{platform.value}%</span>
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${platform.value * 2}%`,
                      backgroundColor: COLORS[index]
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </>
  );
}
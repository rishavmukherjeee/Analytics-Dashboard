"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { PlatformChart } from "@/components/dashboard/platform-chart";
import { CampaignsTable } from "@/components/dashboard/campaigns-table";
import { MetricCardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/dashboard/loading-skeleton";
import { useRealTimeData } from "@/hooks/use-real-time-data";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { metrics, isLoading } = useRealTimeData();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="container mx-auto p-6 space-y-8">
            {/* Page Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Analytics Overview
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your campaigns today.
              </p>
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {isLoading ? (
                <>
                  <MetricCardSkeleton />
                  <MetricCardSkeleton />
                  <MetricCardSkeleton />
                  <MetricCardSkeleton />
                </>
              ) : (
                metrics.map((metric, index) => (
                  <MetricCard
                    key={metric.label}
                    {...metric}
                    className="animate-in fade-in-50 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                ))
              )}
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-7">
              {isLoading ? (
                <>
                  <div className="lg:col-span-4">
                    <ChartSkeleton />
                  </div>
                  <div className="lg:col-span-3">
                    <ChartSkeleton />
                  </div>
                </>
              ) : (
                <>
                  <div className="lg:col-span-4 animate-in fade-in-50 duration-700 delay-500">
                    <RevenueChart />
                  </div>
                  <div className="lg:col-span-3 animate-in fade-in-50 duration-700 delay-600">
                    <PlatformChart />
                  </div>
                </>
              )}
            </div>

            {/* Performance Chart */}
            <div className="grid gap-6 lg:grid-cols-7">
              {isLoading ? (
                <div className="lg:col-span-7">
                  <ChartSkeleton />
                </div>
              ) : (
                <div className="lg:col-span-7 animate-in fade-in-50 duration-700 delay-700">
                  <PerformanceChart />
                </div>
              )}
            </div>

            {/* Campaigns Table */}
            <div className="animate-in fade-in-50 duration-700 delay-800">
              {isLoading ? <TableSkeleton /> : <CampaignsTable />}
            </div>

            {/* Real-time Indicator */}
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                Live data updates every 30 seconds
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
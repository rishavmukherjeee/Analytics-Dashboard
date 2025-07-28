"use client";

import { useState, useEffect } from 'react';
import { generateRealTimeMetrics, type MetricData } from '@/lib/mock-data';

export function useRealTimeData() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load
    const loadInitialData = () => {
      setMetrics(generateRealTimeMetrics());
      setIsLoading(false);
    };

    // Simulate initial loading delay
    const initialTimer = setTimeout(loadInitialData, 1000);

    // Update data every 30 seconds to simulate real-time updates
    const updateInterval = setInterval(() => {
      setMetrics(generateRealTimeMetrics());
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(updateInterval);
    };
  }, []);

  return { metrics, isLoading };
}
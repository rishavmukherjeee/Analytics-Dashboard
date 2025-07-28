// Enhanced mock data for the analytics dashboard
export interface MetricData {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  trend: number[];
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  revenue?: number;
  users?: number;
  conversions?: number;
  impressions?: number;
  clicks?: number;
  cost?: number;
}

export interface TableRow {
  id: string;
  campaign: string;
  platform: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  revenue: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  roi: number;
}

export const metricsData: MetricData[] = [
  {
    label: "Total Revenue",
    value: "$847,302",
    change: 12.5,
    changeLabel: "vs last month",
    icon: "DollarSign",
    trend: [65, 78, 82, 89, 95, 102, 108, 115, 122, 128, 135, 142]
  },
  {
    label: "Active Users",
    value: "94,847",
    change: 8.2,
    changeLabel: "vs last month",
    icon: "Users",
    trend: [45, 52, 48, 61, 55, 67, 72, 69, 78, 82, 89, 94]
  },
  {
    label: "Conversions",
    value: "12,483",
    change: -2.1,
    changeLabel: "vs last month",
    icon: "Target",
    trend: [15, 18, 16, 19, 17, 21, 23, 22, 25, 24, 26, 25]
  },
  {
    label: "Growth Rate",
    value: "23.8%",
    change: 5.4,
    changeLabel: "vs last month",
    icon: "TrendingUp",
    trend: [18, 19, 20, 22, 21, 23, 24, 25, 26, 24, 25, 24]
  }
];

export const revenueData: ChartDataPoint[] = [
  { name: 'Jan', revenue: 45000, users: 8400, conversions: 980, impressions: 245000, clicks: 12250, cost: 8500 },
  { name: 'Feb', revenue: 52000, users: 9200, conversions: 1120, impressions: 280000, clicks: 14000, cost: 9200 },
  { name: 'Mar', revenue: 48000, users: 8800, conversions: 1050, impressions: 260000, clicks: 13000, cost: 8800 },
  { name: 'Apr', revenue: 61000, users: 10500, conversions: 1340, impressions: 320000, clicks: 16000, cost: 10500 },
  { name: 'May', revenue: 55000, users: 9800, conversions: 1220, impressions: 290000, clicks: 14500, cost: 9800 },
  { name: 'Jun', revenue: 67000, users: 11200, conversions: 1450, impressions: 350000, clicks: 17500, cost: 11200 },
  { name: 'Jul', revenue: 72000, users: 12100, conversions: 1580, impressions: 380000, clicks: 19000, cost: 12100 },
  { name: 'Aug', revenue: 69000, users: 11800, conversions: 1520, impressions: 365000, clicks: 18250, cost: 11800 },
  { name: 'Sep', revenue: 78000, users: 13200, conversions: 1680, impressions: 410000, clicks: 20500, cost: 13200 },
  { name: 'Oct', revenue: 82000, users: 14100, conversions: 1750, impressions: 440000, clicks: 22000, cost: 14100 },
  { name: 'Nov', revenue: 89000, users: 15000, conversions: 1890, impressions: 470000, clicks: 23500, cost: 15000 },
  { name: 'Dec', revenue: 94000, users: 15800, conversions: 2010, impressions: 495000, clicks: 24750, cost: 15800 }
];

export const platformData: ChartDataPoint[] = [
  { name: 'Google Ads', value: 45.2 },
  { name: 'Facebook', value: 28.7 },
  { name: 'Instagram', value: 12.8 },
  { name: 'LinkedIn', value: 8.9 },
  { name: 'Twitter', value: 4.4 }
];

export const campaignData: TableRow[] = [
  {
    id: '1',
    campaign: 'Q4 Holiday Sale',
    platform: 'Google Ads',
    impressions: 245000,
    clicks: 12250,
    ctr: 5.0,
    cost: 8500,
    conversions: 890,
    revenue: 45600,
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    roi: 436.5
  },
  {
    id: '2',
    campaign: 'Brand Awareness',
    platform: 'Facebook',
    impressions: 180000,
    clicks: 7200,
    ctr: 4.0,
    cost: 5200,
    conversions: 320,
    revenue: 18900,
    status: 'active',
    startDate: '2024-10-15',
    endDate: '2024-12-15',
    roi: 263.5
  },
  {
    id: '3',
    campaign: 'Product Launch',
    platform: 'Instagram',
    impressions: 95000,
    clicks: 4750,
    ctr: 5.0,
    cost: 3200,
    conversions: 185,
    revenue: 12400,
    status: 'paused',
    startDate: '2024-09-01',
    endDate: '2024-11-30',
    roi: 287.5
  },
  {
    id: '4',
    campaign: 'Retargeting',
    platform: 'Google Ads',
    impressions: 67000,
    clicks: 4020,
    ctr: 6.0,
    cost: 2800,
    conversions: 425,
    revenue: 28900,
    status: 'active',
    startDate: '2024-11-15',
    endDate: '2024-12-31',
    roi: 932.1
  },
  {
    id: '5',
    campaign: 'Lead Generation',
    platform: 'LinkedIn',
    impressions: 34000,
    clicks: 1020,
    ctr: 3.0,
    cost: 4500,
    conversions: 95,
    revenue: 15600,
    status: 'completed',
    startDate: '2024-08-01',
    endDate: '2024-10-31',
    roi: 246.7
  },
  {
    id: '6',
    campaign: 'Summer Promotion',
    platform: 'Facebook',
    impressions: 156000,
    clicks: 6240,
    ctr: 4.0,
    cost: 4200,
    conversions: 278,
    revenue: 16800,
    status: 'completed',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    roi: 300.0
  },
  {
    id: '7',
    campaign: 'Black Friday Special',
    platform: 'Google Ads',
    impressions: 320000,
    clicks: 19200,
    ctr: 6.0,
    cost: 12000,
    conversions: 1150,
    revenue: 68500,
    status: 'completed',
    startDate: '2024-11-20',
    endDate: '2024-11-30',
    roi: 470.8
  },
  {
    id: '8',
    campaign: 'Mobile App Install',
    platform: 'Instagram',
    impressions: 89000,
    clicks: 5340,
    ctr: 6.0,
    cost: 3800,
    conversions: 267,
    revenue: 14200,
    status: 'active',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    roi: 273.7
  }
];

// Enhanced real-time data generation
export const generateRealTimeMetrics = (): MetricData[] => {
  return metricsData.map(metric => ({
    ...metric,
    value: updateMetricValue(metric.value, metric.label),
    change: Number((metric.change + (Math.random() - 0.5) * 2).toFixed(1)),
    trend: metric.trend.map(val => val + (Math.random() - 0.5) * 5)
  }));
};

const updateMetricValue = (currentValue: string, label: string): string => {
  const numericValue = parseFloat(currentValue.replace(/[$,%]/g, ''));
  const variance = (Math.random() - 0.5) * 0.02; // 2% variance
  const newValue = numericValue * (1 + variance);
  
  if (label.includes('Revenue')) {
    return `$${Math.round(newValue).toLocaleString()}`;
  } else if (label.includes('Rate')) {
    return `${newValue.toFixed(1)}%`;
  } else {
    return Math.round(newValue).toLocaleString();
  }
};

// Export functionality
export const exportToPDF = (data: any[], filename: string) => {
  // Simulate PDF export
  console.log(`Exporting ${filename}.pdf with ${data.length} records`);
  // In a real app, you'd use libraries like jsPDF or react-pdf
};

export const exportToCSV = (data: TableRow[], filename: string) => {
  const headers = ['Campaign', 'Platform', 'Impressions', 'Clicks', 'CTR', 'Cost', 'Conversions', 'Revenue', 'ROI', 'Status'];
  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      `"${row.campaign}"`,
      row.platform,
      row.impressions,
      row.clicks,
      row.ctr,
      row.cost,
      row.conversions,
      row.revenue,
      row.roi,
      row.status
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Date range utilities
export const getDateRangeData = (startDate: string, endDate: string) => {
  return campaignData.filter(campaign => {
    const campaignStart = new Date(campaign.startDate);
    const campaignEnd = new Date(campaign.endDate);
    const filterStart = new Date(startDate);
    const filterEnd = new Date(endDate);
    
    return campaignStart <= filterEnd && campaignEnd >= filterStart;
  });
};
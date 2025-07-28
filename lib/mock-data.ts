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
  platform: 'Google Ads' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'YouTube' | 'Email' | 'Spotify';
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
    value: "$1,247,820",
    change: 15.8,
    changeLabel: "vs last month",
    icon: "DollarSign",
    trend: [65, 78, 82, 89, 95, 102, 108, 115, 122, 128, 135, 148]
  },
  {
    label: "Active Users",
    value: "128,450",
    change: 11.3,
    changeLabel: "vs last month",
    icon: "Users",
    trend: [45, 52, 48, 61, 55, 67, 72, 69, 78, 82, 89, 102]
  },
  {
    label: "Conversions",
    value: "18,967",
    change: 8.7,
    changeLabel: "vs last month",
    icon: "Target",
    trend: [15, 18, 16, 19, 17, 21, 23, 22, 25, 24, 26, 28]
  },
  {
    label: "Growth Rate",
    value: "31.2%",
    change: 7.8,
    changeLabel: "vs last month",
    icon: "TrendingUp",
    trend: [18, 19, 20, 22, 21, 23, 24, 25, 26, 24, 25, 29]
  }
];

export const revenueData: ChartDataPoint[] = [
  {
    name: 'Jan', revenue: 45000, users: 8400, conversions: 980, impressions: 245000, clicks: 12250, cost: 8500,
    value: 0
  },
  {
    name: 'Feb', revenue: 52000, users: 9200, conversions: 1120, impressions: 280000, clicks: 14000, cost: 9200,
    value: 0
  },
  {
    name: 'Mar', revenue: 48000, users: 8800, conversions: 1050, impressions: 260000, clicks: 13000, cost: 8800,
    value: 0
  },
  {
    name: 'Apr', revenue: 61000, users: 10500, conversions: 1340, impressions: 320000, clicks: 16000, cost: 10500,
    value: 0
  },
  {
    name: 'May', revenue: 55000, users: 9800, conversions: 1220, impressions: 290000, clicks: 14500, cost: 9800,
    value: 0
  },
  {
    name: 'Jun', revenue: 67000, users: 11200, conversions: 1450, impressions: 350000, clicks: 17500, cost: 11200,
    value: 0
  },
  {
    name: 'Jul', revenue: 72000, users: 12100, conversions: 1580, impressions: 380000, clicks: 19000, cost: 12100,
    value: 0
  },
  {
    name: 'Aug', revenue: 69000, users: 11800, conversions: 1520, impressions: 365000, clicks: 18250, cost: 11800,
    value: 0
  },
  {
    name: 'Sep', revenue: 78000, users: 13200, conversions: 1680, impressions: 410000, clicks: 20500, cost: 13200,
    value: 0
  },
  {
    name: 'Oct', revenue: 82000, users: 14100, conversions: 1750, impressions: 440000, clicks: 22000, cost: 14100,
    value: 0
  },
  {
    name: 'Nov', revenue: 89000, users: 15000, conversions: 1890, impressions: 470000, clicks: 23500, cost: 15000,
    value: 0
  },
  {
    name: 'Dec', revenue: 94000, users: 15800, conversions: 2010, impressions: 495000, clicks: 24750, cost: 15800,
    value: 0
  }
];

export const platformData: ChartDataPoint[] = [
  { name: 'Google Ads', value: 38.5 },
  { name: 'Facebook', value: 24.2 },
  { name: 'Instagram', value: 15.3 },
  { name: 'LinkedIn', value: 12.8 },
  { name: 'YouTube', value: 4.7 },
  { name: 'Email', value: 2.8 },
  { name: 'Spotify', value: 1.7 }
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
  },
  {
    id: '9',
    campaign: 'Video Marketing Campaign',
    platform: 'YouTube',
    impressions: 125000,
    clicks: 6250,
    ctr: 5.0,
    cost: 4500,
    conversions: 312,
    revenue: 18700,
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    roi: 315.6
  },
  {
    id: '10',
    campaign: 'Email Newsletter Promotion',
    platform: 'Email',
    impressions: 45000,
    clicks: 2250,
    ctr: 5.0,
    cost: 1200,
    conversions: 189,
    revenue: 9450,
    status: 'active',
    startDate: '2024-10-15',
    endDate: '2024-12-15',
    roi: 687.5
  },
  {
    id: '11',
    campaign: 'Influencer Partnership',
    platform: 'Instagram',
    impressions: 78000,
    clicks: 3900,
    ctr: 5.0,
    cost: 6500,
    conversions: 234,
    revenue: 17550,
    status: 'completed',
    startDate: '2024-09-01',
    endDate: '2024-10-31',
    roi: 170.0
  },
  {
    id: '12',
    campaign: 'B2B Lead Generation',
    platform: 'LinkedIn',
    impressions: 28000,
    clicks: 840,
    ctr: 3.0,
    cost: 5200,
    conversions: 84,
    revenue: 21000,
    status: 'active',
    startDate: '2024-11-10',
    endDate: '2024-12-31',
    roi: 303.8
  },
  {
    id: '13',
    campaign: 'Spring Sale 2024',
    platform: 'Facebook',
    impressions: 198000,
    clicks: 7920,
    ctr: 4.0,
    cost: 5800,
    conversions: 396,
    revenue: 23760,
    status: 'completed',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    roi: 309.7
  },
  {
    id: '14',
    campaign: 'Customer Retention',
    platform: 'Google Ads',
    impressions: 56000,
    clicks: 3360,
    ctr: 6.0,
    cost: 2400,
    conversions: 168,
    revenue: 12600,
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    roi: 425.0
  },
  {
    id: '15',
    campaign: 'Local Business Promotion',
    platform: 'Google Ads',
    impressions: 34000,
    clicks: 1700,
    ctr: 5.0,
    cost: 1800,
    conversions: 85,
    revenue: 6800,
    status: 'paused',
    startDate: '2024-10-01',
    endDate: '2024-11-30',
    roi: 277.8
  },
  {
    id: '16',
    campaign: 'Podcast Sponsorship',
    platform: 'Spotify',
    impressions: 67000,
    clicks: 2010,
    ctr: 3.0,
    cost: 3500,
    conversions: 101,
    revenue: 10100,
    status: 'active',
    startDate: '2024-10-15',
    endDate: '2024-12-15',
    roi: 188.6
  },
  {
    id: '17',
    campaign: 'Cyber Monday Deal',
    platform: 'Google Ads',
    impressions: 289000,
    clicks: 17340,
    ctr: 6.0,
    cost: 11500,
    conversions: 1040,
    revenue: 62400,
    status: 'completed',
    startDate: '2024-11-25',
    endDate: '2024-12-02',
    roi: 442.6
  },
  {
    id: '18',
    campaign: 'Social Media Contest',
    platform: 'Instagram',
    impressions: 145000,
    clicks: 8700,
    ctr: 6.0,
    cost: 2200,
    conversions: 435,
    revenue: 13050,
    status: 'completed',
    startDate: '2024-08-15',
    endDate: '2024-09-15',
    roi: 493.2
  },
  {
    id: '19',
    campaign: 'Professional Services',
    platform: 'LinkedIn',
    impressions: 42000,
    clicks: 1260,
    ctr: 3.0,
    cost: 6800,
    conversions: 63,
    revenue: 31500,
    status: 'active',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    roi: 363.2
  },
  {
    id: '20',
    campaign: 'Mobile Game Promotion',
    platform: 'Facebook',
    impressions: 234000,
    clicks: 9360,
    ctr: 4.0,
    cost: 7200,
    conversions: 468,
    revenue: 14040,
    status: 'active',
    startDate: '2024-11-05',
    endDate: '2024-12-31',
    roi: 95.0
  },
  {
    id: '21',
    campaign: 'E-commerce Flash Sale',
    platform: 'Google Ads',
    impressions: 178000,
    clicks: 8900,
    ctr: 5.0,
    cost: 6300,
    conversions: 534,
    revenue: 26700,
    status: 'completed',
    startDate: '2024-10-15',
    endDate: '2024-10-17',
    roi: 323.8
  },
  {
    id: '22',
    campaign: 'Newsletter Signup Drive',
    platform: 'Facebook',
    impressions: 98000,
    clicks: 3920,
    ctr: 4.0,
    cost: 2800,
    conversions: 196,
    revenue: 5880,
    status: 'paused',
    startDate: '2024-09-15',
    endDate: '2024-11-15',
    roi: 110.0
  },
  {
    id: '23',
    campaign: 'Premium Service Launch',
    platform: 'LinkedIn',
    impressions: 38000,
    clicks: 1140,
    ctr: 3.0,
    cost: 8500,
    conversions: 57,
    revenue: 28500,
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    roi: 235.3
  },
  {
    id: '24',
    campaign: 'Holiday Gift Guide',
    platform: 'Instagram',
    impressions: 167000,
    clicks: 10020,
    ctr: 6.0,
    cost: 4200,
    conversions: 501,
    revenue: 25050,
    status: 'active',
    startDate: '2024-11-15',
    endDate: '2024-12-24',
    roi: 496.4
  },
  {
    id: '25',
    campaign: 'Webinar Registration',
    platform: 'LinkedIn',
    impressions: 52000,
    clicks: 1560,
    ctr: 3.0,
    cost: 3200,
    conversions: 78,
    revenue: 15600,
    status: 'completed',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    roi: 387.5
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

// Get unique platforms from campaign data
export const getAvailablePlatforms = (): string[] => {
  const platforms = Array.from(new Set(campaignData.map(campaign => campaign.platform)));
  return platforms.sort();
};

// Campaign statistics
export const getCampaignStats = () => {
  const totalRevenue = campaignData.reduce((sum, campaign) => sum + campaign.revenue, 0);
  const totalCost = campaignData.reduce((sum, campaign) => sum + campaign.cost, 0);
  const totalConversions = campaignData.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const totalImpressions = campaignData.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalClicks = campaignData.reduce((sum, campaign) => sum + campaign.clicks, 0);
  
  return {
    totalRevenue,
    totalCost,
    totalConversions,
    totalImpressions,
    totalClicks,
    averageROI: ((totalRevenue - totalCost) / totalCost * 100),
    averageCTR: (totalClicks / totalImpressions * 100),
    totalCampaigns: campaignData.length,
    activeCampaigns: campaignData.filter(c => c.status === 'active').length,
    completedCampaigns: campaignData.filter(c => c.status === 'completed').length,
    pausedCampaigns: campaignData.filter(c => c.status === 'paused').length
  };
};
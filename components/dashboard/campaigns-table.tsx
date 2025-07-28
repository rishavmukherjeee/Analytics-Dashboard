"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, MoreHorizontal, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import { campaignData, type TableRow as CampaignRow } from "@/lib/mock-data";
import { ExportDialog } from "./export-dialog";
import { DateRangePicker } from "./date-range-picker";

type SortField = keyof CampaignRow;
type SortDirection = 'asc' | 'desc';

export function CampaignsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("revenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const itemsPerPage = 10;

  const filteredAndSortedData = useMemo(() => {
    let filtered = campaignData.filter((campaign) => {
      const matchesSearch = 
        campaign.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.platform.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      const matchesPlatform = platformFilter === "all" || campaign.platform === platformFilter;
      
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const campaignStart = new Date(campaign.startDate);
        const campaignEnd = new Date(campaign.endDate);
        matchesDateRange = campaignStart <= dateRange.end && campaignEnd >= dateRange.start;
      }
      
      return matchesSearch && matchesStatus && matchesPlatform && matchesDateRange;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField as keyof CampaignRow];
      const bValue = b[sortField as keyof CampaignRow];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, platformFilter, sortField, sortDirection, dateRange]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleDateRangeChange = (startDate: Date | undefined, endDate: Date | undefined) => {
    setDateRange({ start: startDate, end: endDate });
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1 animate-pulse" />
            Active
          </Badge>
        );
      case 'paused':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-1" />
            Paused
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800">
            <div className="w-2 h-2 rounded-full bg-slate-500 mr-1" />
            Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getROIIndicator = (roi: number) => {
    const isPositive = roi > 200; // ROI above 200% is considered good
    return isPositive ? (
      <TrendingUp className="h-3 w-3 text-emerald-500" />
    ) : (
      <TrendingDown className="h-3 w-3 text-red-500" />
    );
  };

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatNumber = (num: number) => num.toLocaleString();
  const formatPercentage = (num: number) => `${num.toFixed(1)}%`;

  return (
    <Card className="shadow-sm border-0 bg-gradient-to-br from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Campaign Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track and analyze your marketing campaigns
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <DateRangePicker onDateRangeChange={handleDateRangeChange} />
            <ExportDialog data={filteredAndSortedData} filename="campaign-performance" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Google Ads">Google Ads</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="rounded-lg border border-border/50 mx-6 mb-6 overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/50">
                <TableHead className="font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('campaign')}
                    className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary"
                  >
                    Campaign
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">Platform</TableHead>
                <TableHead className="text-right font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('impressions')}
                    className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary"
                  >
                    Impressions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('clicks')}
                    className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary"
                  >
                    Clicks
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('ctr')}
                    className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary"
                  >
                    CTR
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('cost')}
                    className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary"
                  >
                    Cost
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('conversions')}
                    className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary"
                  >
                    Conversions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('revenue')}
                    className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary"
                  >
                    Revenue
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('roi')}
                    className="h-auto p-0 font-semibold hover:bg-transparent hover:text-primary"
                  >
                    ROI
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((campaign, index) => (
                <TableRow 
                  key={campaign.id} 
                  className="hover:bg-muted/30 transition-all duration-200 group animate-in fade-in slide-in-from-bottom-2"
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {campaign.campaign}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {campaign.platform}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{formatNumber(campaign.impressions)}</TableCell>
                  <TableCell className="text-right font-medium">{formatNumber(campaign.clicks)}</TableCell>
                  <TableCell className="text-right font-medium">{formatPercentage(campaign.ctr)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(campaign.cost)}</TableCell>
                  <TableCell className="text-right font-medium">{formatNumber(campaign.conversions)}</TableCell>
                  <TableCell className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(campaign.revenue)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {getROIIndicator(campaign.roi)}
                      <span className="font-medium">{formatPercentage(campaign.roi)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 pb-6">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}</span> of{' '}
              <span className="font-medium">{filteredAndSortedData.length}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="transition-all duration-200 hover:scale-105"
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum:number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-9 h-9 p-0 transition-all duration-200 hover:scale-105"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="transition-all duration-200 hover:scale-105"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
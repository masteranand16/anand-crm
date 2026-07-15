import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, ArrowUpDown, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { FadeInUp, ParallaxScroll } from "../components/ui/Animations";

// Mock Data
type OrderStatus = "Pending" | "Processing" | "Completed" | "Cancelled";

interface Order {
  id: string;
  customerName: string;
  date: Date;
  status: OrderStatus;
  amount: number;
}

const generateOrders = (): Order[] => {
  const statuses: OrderStatus[] = ["Pending", "Processing", "Completed", "Cancelled"];
  return Array.from({ length: 40 }, (_, i) => ({
    id: `ORD-${2000 + i}`,
    customerName: `Customer ${Math.floor(Math.random() * 50) + 1}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    amount: Math.floor(Math.random() * 5000) + 50,
  }));
};

const initialOrders = generateOrders();

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>({ key: 'date', direction: 'desc' });

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  const filteredData = useMemo(() => {
    let data = [...orders];

    if (searchQuery) {
      data = data.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      data = data.filter((order) => order.status === statusFilter);
    }

    if (sortConfig !== null) {
      data.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return data;
  }, [orders, searchQuery, statusFilter, sortConfig]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Completed": return "bg-green-700 text-white shadow-sm font-bold";
      case "Processing": return "bg-white text-black shadow-sm font-bold";
      case "Pending": return "bg-gray-800 text-white shadow-sm font-bold";
      case "Cancelled": return "bg-accent text-accent-foreground shadow-sm font-bold";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4 bg-accent text-accent-foreground p-6 rounded-xl">
      <FadeInUp>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight">Orders Manager</h2>
        </div>
      </FadeInUp>

      <ParallaxScroll offset={20}>
        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            View and manage customer orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <select
              className="flex h-10 w-full sm:w-[180px] clay-input px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="rounded-md border overflow-x-auto no-scrollbar">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px] cursor-pointer" onClick={() => handleSort("id")}>
                    <div className="flex items-center">
                      Order ID <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("customerName")}>
                    <div className="flex items-center">
                      Customer <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                    <div className="flex items-center">
                      Date <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("amount")}>
                    <div className="flex items-center justify-end">
                      Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{format(order.date, "MMM dd, yyyy")}</TableCell>
                      <TableCell>
                        <select
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold appearance-none cursor-pointer outline-none ${getStatusColor(order.status)}`}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        >
                          <option value="Pending" className="bg-background text-foreground">Pending</option>
                          <option value="Processing" className="bg-background text-foreground">Processing</option>
                          <option value="Completed" className="bg-background text-foreground">Completed</option>
                          <option value="Cancelled" className="bg-background text-foreground">Cancelled</option>
                        </select>
                      </TableCell>
                      <TableCell className="text-right">
                        ${order.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      </ParallaxScroll>
    </div>
  );
}

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { FadeInUp, ParallaxScroll } from "../components/ui/Animations";

// Mock Data
const MOCK_CUSTOMERS = Array.from({ length: 50 }, (_, i) => ({
  id: `CUST-${1000 + i}`,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  company: `Company ${String.fromCharCode(65 + (i % 26))}`,
  status: i % 5 === 0 ? "Inactive" : "Active",
  spent: Math.floor(Math.random() * 50000) + 100,
}));

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    let data = [...MOCK_CUSTOMERS];

    if (searchQuery) {
      data = data.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
  }, [searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4 bg-accent text-accent-foreground p-6 rounded-xl">
      <FadeInUp>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight">Customers</h2>
          <Button>Add Customer</Button>
        </div>
      </FadeInUp>

      <ParallaxScroll offset={20}>
        <Card className="bg-secondary text-secondary-foreground">
          <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            Manage your customers and view their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8"
              />
            </div>
          </div>
          <div className="rounded-md border overflow-x-auto no-scrollbar">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("id")}>
                    <div className="flex items-center">
                      ID <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Name <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                    <div className="flex items-center">
                      Email <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("company")}>
                    <div className="flex items-center">
                      Company <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("spent")}>
                    <div className="flex items-center justify-end">
                      Total Spent <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.company}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                            customer.status === "Active"
                              ? "bg-green-700 text-white"
                              : "bg-accent text-accent-foreground"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        ${customer.spent.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between px-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </ParallaxScroll>
    </div>
  );
}

import React, { useState } from "react";
import { MagnifyingGlass, CaretLeft, CaretRight } from "phosphor-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Customers = () => {
  const customersData = [
    { customerId: "#1001", customerName: "Saad", totalOrders: 5, location: "Islamabad, PK", memberSince: "Jan 2023", orderAmount: "$5,000" },
    { customerId: "#1002", customerName: "Ali", totalOrders: 3, location: "Lahore, PK", memberSince: "Feb 2023", orderAmount: "$3,200" },
    { customerId: "#1003", customerName: "Ahmed", totalOrders: 8, location: "Karachi, PK", memberSince: "Mar 2023", orderAmount: "$7,500" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(customersData.length / itemsPerPage);

  const filteredCustomers = customersData.filter(customer =>
    customer.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.customerId.includes(searchQuery)
  );

  const displayedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between pt-4 pb-8">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Button className="bg-[#F65A11] hover:bg-orange-600 text-white">Add a Customer</Button>
      </div>

      <Card className="mb-6">
        <CardContent className="text-center p-4">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl font-bold">{customersData.length}</p>
        </CardContent>
      </Card>

      <div className="relative mb-4">
        <MagnifyingGlass className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Member Since</TableHead>
                <TableHead>Order Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedCustomers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.customerId}</TableCell>
                  <TableCell>{customer.customerName}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>{customer.location}</TableCell>
                  <TableCell>{customer.memberSince}</TableCell>
                  <TableCell>{customer.orderAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="flex items-center gap-2"
        >
          <CaretLeft size={16} /> Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex items-center gap-2"
        >
          Next <CaretRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Customers;

import React, { useState } from "react";
import { MagnifyingGlass, FunnelSimple, CaretLeft, CaretRight } from "phosphor-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Orders = () => {
  const ordersData = [
    {orderName: "Pizza", orderId: "#578239", customer: "Saad", date: "Apr 19, 08:01 AM", total: "$1,099.00", paymentStatus: "Pending", items: 1, deliveryMethod: "Free Shipping" },
    {orderName: "Pizza", orderId: "#920417", customer: "Saad", date: "Apr 19, 09:15 AM", total: "$2,198.00", paymentStatus: "Completed", items: 2, deliveryMethod: "Free Shipping" },
    {orderName: "Pizza", orderId: "#343652", customer: "Saad", date: "Apr 19, 10:30 AM", total: "$1,499.00", paymentStatus: "Completed", items: 1, deliveryMethod: "Free Shipping" },
    {orderName: "Pizza", orderId: "#343652", customer: "Saad", date: "Apr 19, 10:30 AM", total: "$1,499.00", paymentStatus: "Completed", items: 1, deliveryMethod: "Free Shipping" },
    {orderName: "Pizza", orderId: "#343652", customer: "Saad", date: "Apr 19, 10:30 AM", total: "$1,499.00", paymentStatus: "Completed", items: 1, deliveryMethod: "Free Shipping" },
    {orderName: "Pizza", orderId: "#343652", customer: "Saad", date: "Apr 19, 10:30 AM", total: "$1,499.00", paymentStatus: "Completed", items: 1, deliveryMethod: "Free Shipping" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(ordersData.length / itemsPerPage);

  const totalOrders = ordersData.length;
  const completedOrders = ordersData.filter(order => order.paymentStatus === "Completed").length;
  const pendingOrders = ordersData.filter(order => order.paymentStatus === "Pending").length;
  const cancelledOrders = ordersData.filter(order => order.paymentStatus === "Cancelled").length;

  const filteredOrders = ordersData.filter(order =>
    order.orderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderId.includes(searchQuery)
  );

  const displayedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold pb-6">Orders</h1>
        <Button className="bg-[#F65A11] hover:bg-orange-600 text-white">Add New Order</Button>
      </div>

      <Card className="mb-6">
        <CardContent className="grid grid-cols-4 gap-4 text-center p-4">
          <div>
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Completed</h2>
            <p className="text-2xl font-bold">{completedOrders}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Pending</h2>
            <p className="text-2xl font-bold">{pendingOrders}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Cancelled</h2>
            <p className="text-2xl font-bold">{cancelledOrders}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          {["All", "Unpaid", "Need to Ship", "Sent", "Completed", "Cancellation", "Returns"].map((tab) => (
            <Button key={tab} variant="outline">{tab}</Button>
          ))}
        </div>
        <Button variant="secondary" className="flex items-center gap-2">
          <FunnelSimple size={16} /> Filter
        </Button>
      </div>
      
      <div className="relative mb-4">
        <MagnifyingGlass className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search orders..."
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
              <TableHead>
                <input type="checkbox" className="h-4 w-4 color=[#F65A11]" />
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Delivery Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input type="checkbox" className="h-4 w-4" />
                </TableCell>
                <TableCell className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{order.orderName}</p>
                    <p className="text-xs text-gray-500">{order.orderId}</p>
                  </div>
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.items} items</TableCell>
                <TableCell>{order.deliveryMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;

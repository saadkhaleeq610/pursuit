import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import Sidebar from "@/components/Sidebar";

const orders = [
  { id: 1, product: "MacBook Air (M1, 2020)", customer: "Darrell Steward", date: "Apr 19, 08:01 AM", total: "$1,099.00", status: "Pending", items: "2 Items", shipping: "Free Shipping" },
  { id: 2, product: "MacBook Pro 13-inch", customer: "Courtney Henry", date: "Apr 19, 09:05 AM", total: "$2,199.00", status: "Completed", items: "2 Items", shipping: "Free Shipping" },
  { id: 3, product: "MacBook Air (Retina, 2019)", customer: "Arlene McCoy", date: "Apr 19, 10:30 AM", total: "$1,499.00", status: "Pending", items: "2 Items", shipping: "Free Shipping" }
];

export const OrdersPage = () => {
  return (
      <div className="p-6 flex-1">
    <Sidebar/>
      <Card>
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Orders</h1>
          <Button>Create Order</Button>
        </div>
      </Card>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Shipping</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.shipping}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
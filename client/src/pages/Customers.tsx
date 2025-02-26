import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { CaretLeft, CaretRight } from "phosphor-react";
import AddItemModal from "../components/AddItem";

type Customer = {
  CustomerID: number;
  Name: string;
  Email: string;
  Phone: string;
};

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const { user } = useAuthStore();
  const restaurantId = user?.restaurant_id;

  const fetchCustomers = useCallback(async () => {
    if (!restaurantId) return;
    try {
      setLoading(true);
      const response = await axios.get<Customer[]>(`http://localhost:8080/customers/${restaurantId}`);
      setCustomers(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch customers. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleAddCustomer = async (data: { Name: string; Email: string; Phone: string }) => {
    try {
      const newCustomer: Customer = {
        CustomerID: Date.now(),
        Name: data.Name,
        Email: data.Email,
        Phone: data.Phone,
      };
      setCustomers((prev) => [...prev, newCustomer]);

      await fetchCustomers();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to add customer:", err);
      setError("Failed to add customer. Rolling back changes.");
      setCustomers((prev) => prev.filter((c) => c.CustomerID !== Date.now()));
    }
  };

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const displayedCustomers = customers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#F65A11] hover:bg-orange-600 text-white">
          Add a Customer
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="text-center p-4">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl font-bold">{customers.length}</p>
        </CardContent>
      </Card>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedCustomers.length > 0 ? (
                  displayedCustomers.map((customer) => (
                    <TableRow key={customer.CustomerID}>
                      <TableCell>{customer.CustomerID}</TableCell>
                      <TableCell>{customer.Name}</TableCell>
                      <TableCell>{customer.Email}</TableCell>
                      <TableCell>{customer.Phone}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                      No customers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1 || loading}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="flex items-center gap-2"
        >
          <CaretLeft size={16} /> Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          disabled={currentPage === totalPages || loading}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex items-center gap-2"
        >
          Next <CaretRight size={16} />
        </Button>
      </div>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Customer"
        apiEndpoint={`http://localhost:8080/create-customer`}
        fields={[
          { name: "Name", label: "Name", required: true },
          { name: "Email", label: "Email", type: "email", required: true },
          { name: "Phone", label: "Phone", type: "tel", required: true },
        ]}
        onSuccess={handleAddCustomer}
      />
    </div>
  );
};

export default Customers;
import React, { useState } from "react";
import { MagnifyingGlass, CaretLeft, CaretRight } from "phosphor-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import AddItemModal from "../components/AddItem";

const Menu = () => {
  const menuData = [
    { itemId: "#101", itemName: "Margherita Pizza", description: "Classic pizza with fresh tomatoes, mozzarella, and basil.", price: "$12.99" },
    { itemId: "#102", itemName: "Pepperoni Pizza", description: "Loaded with spicy pepperoni and extra cheese.", price: "$14.99" },
    { itemId: "#103", itemName: "Veggie Supreme", description: "A mix of fresh veggies with mozzarella and tomato sauce.", price: "$11.99" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(menuData.length / itemsPerPage);

  const filteredMenu = menuData.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.itemId.includes(searchQuery)
  );

  const displayedMenu = filteredMenu.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const menuFields = [
    { name: "itemId", label: "Item ID", required: true },
    { name: "itemName", label: "Item Name", required: true },
    { name: "description", label: "Description", required: true },
    { name: "price", label: "Item Price", type: "number", required: true },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between pt-4 pb-8">
        <h1 className="text-2xl font-semibold">Menu</h1>
        <Button className="bg-[#F65A11] hover:bg-orange-600 text-white" onClick={() => setIsModalOpen(true)}>
          Add a Menu Item
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="text-center p-4">
          <h2 className="text-lg font-semibold">Total Menu Items</h2>
          <p className="text-2xl font-bold">{menuData.length}</p>
        </CardContent>
      </Card>
      
      <div className="relative mb-4">
        <MagnifyingGlass className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search menu items..."
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
                <TableHead>Item ID</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Item Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedMenu.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.itemId}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <CaretLeft size={16} /> Prev
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next <CaretRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fields={menuFields}
        title="Add New Menu Item"
        onSubmit={(data) => console.log("New Menu Item: ", data)}
      />
    </div>
  );
};

export default Menu;

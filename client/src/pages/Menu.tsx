import React, { useState } from "react";
import { MagnifyingGlass, CaretLeft, CaretRight } from "phosphor-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ itemName: "", description: "", price: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(menuData.length / itemsPerPage);

  const filteredMenu = menuData.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || item.itemId.includes(searchQuery)
  );

  const displayedMenu = filteredMenu.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Submit new menu item
  const handleSubmit = async () => {
    if (!newItem.itemName || !newItem.description || !newItem.price) {
      alert("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8080/create-item", {
        name: newItem.itemName,
        description: newItem.description,
        price: parseFloat(newItem.price),
      });

      setMenuData([...menuData, { itemId: `#${menuData.length + 1}`, ...response.data }]);
      setNewItem({ itemName: "", description: "", price: "" });
      setIsModalOpen(false);
      alert("Menu item added successfully!");
    } catch (error) {
      alert("Failed to add menu item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between pt-4 pb-8">
        <h1 className="text-2xl font-semibold">Menu</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#F65A11] hover:bg-orange-600 text-white">Add a Menu Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input id="itemName" name="itemName" value={newItem.itemName} onChange={handleChange} placeholder="Enter item name" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" value={newItem.description} onChange={handleChange} placeholder="Enter description" />
              </div>
              <div>
                <Label htmlFor="price">Item Price</Label>
                <Input id="price" name="price" value={newItem.price} onChange={handleChange} placeholder="Enter price" type="number" />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? "Adding..." : "Add Item"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
              <CaretLeft size={16} /> Prev
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
              Next <CaretRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Menu;

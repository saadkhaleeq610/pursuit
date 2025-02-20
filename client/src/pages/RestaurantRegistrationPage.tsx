import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterRestaurantPage() {
  type FormDataType = { name: string; address: string; phone_number: string };
  const [formData, setFormData] = useState<FormDataType>({ name: "", address: "", phone_number: "" });
  const navigate = useNavigate();
  const { regRestaurant, accessToken } = useAuthStore();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const hasRefreshToken = document.cookie.includes("refreshToken");
    
    if (!accessToken && !hasRefreshToken) {
      navigate("/signup");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Restaurant Registration Data:", formData);
    try {
      const response = await axios.post("http://localhost:8080/restaurants", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Registration Successful: ", response.data);

      const {
        name, address, phone_number
      } = response.data;

      const restaurantData = {
        name, address, phone_number
      }
      regRestaurant(restaurantData)
      console.log(restaurantData)
    } catch (error) {
      console.log("Error registering the restaurant: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Register Your Restaurant</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Restaurant Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

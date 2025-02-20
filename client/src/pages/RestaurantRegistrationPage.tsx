import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterRestaurantPage() {
  const { regRestaurant, accessToken } = useAuthStore();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const hasRefreshToken = document.cookie.includes("refreshToken");
    
    if (!accessToken && !hasRefreshToken) {
      navigate("/signup");
    }
  }, [navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone_number: ""
    }
  });

  const onSubmit = async (data: { name: string; address: string; phone_number: string }) => {
    console.log("Restaurant Registration Data:", data);
    try {
      const response = await axios.post("http://localhost:8080/restaurants", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Registration Successful: ", response.data);

      const { name, address, phone_number } = response.data;
      regRestaurant({ name, address, phone_number });
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Restaurant Name</Label>
              <Input id="name" {...register("name", { required: "Restaurant name is required" })} />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address", { required: "Address is required" })} />
              {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...register("phone_number", { required: "Phone number is required" })} />
              {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}
            </div>
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

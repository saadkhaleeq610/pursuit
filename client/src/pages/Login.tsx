import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  type FormDataType = { email: string, password: string };
  const [formData, setFormData] = useState<FormDataType>({ email: "", password: "" });
  const { login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: formData.email,
        password: formData.password,
      });
      login(response.data.email, response.data.accessToken);

      console.log("Login successful:", response.data);
      // Handle successful login (e.g., store tokens, redirect to dashboard)
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router";

export default function SignupPage() {
  type FormDataType = { name: string; email: string; password: string };
  const [formData, setFormData] = useState<FormDataType>({ name: "", email: "", password: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role_id: 1,
      });
      
      if (response.status === 201) {
        navigate("/register-restaurant");
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Signup failed. Please try again.");
      console.log(error)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="relative">
          <button onClick={() => navigate("/")} className="absolute left-4 top-4 p-2 text-gray-600 hover:text-black">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <CardTitle className="text-center text-xl font-semibold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
          
          <div className="text-center mt-4">
            <span className="text-sm">Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

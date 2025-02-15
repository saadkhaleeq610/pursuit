import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router";

export default function LoginPage() {
  type FormDataType = { email: string; password: string };
  const [formData, setFormData] = useState<FormDataType>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const { login, accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: formData.email,
        password: formData.password,
      });

      login(response.data.email, response.data.accessToken);
      console.log("Login successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.error || "An error occurred during login.");
        } else if (error.request) {
          setError("No response received from the server. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="relative">
          <button onClick={() => navigate("/")} className="absolute left-4 top-4 p-2 text-gray-600 hover:text-black">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <CardTitle className="text-center text-xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

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
          
          <div className="text-center mt-4">
            <span className="text-sm">Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

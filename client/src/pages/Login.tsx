import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormDataType>();
  const { login, accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  const onSubmit = async (data: FormDataType) => {
    try {
      const response = await axios.post("http://localhost:8080/login", data);
      
      const {
        email,
        name,
        user_id,
        role_id,
        role_name,
        restaurant_id,
        refresh_token,
        access_token,
      } = response.data;

      const userObj = { email, name, user_id, role_id, role_name, restaurant_id, refresh_token };
      login(userObj, access_token);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError("email", { message: error.response.data.error || "An error occurred during login." });
        } else {
          setError("email", { message: "No response received from the server. Please try again." });
        }
      } else {
        setError("email", { message: "An unexpected error occurred. Please try again." });
      }
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
          {errors.email && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4">
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
          
          <div className="text-center mt-4">
            <span className="text-sm">Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:underline">Register</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

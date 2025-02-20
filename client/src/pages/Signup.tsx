import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

export default function SignupPage() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login, accessToken } = useAuthStore();

  useEffect(() => {
      if (accessToken) {
        navigate("/dashboard");
      }
    }, [accessToken, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/signup", {
        ...data,
        role_id: 1,
      });
      
      const {
        email,
        name,
        user_id,
        role_id,
        role_name,
        restaurant_id,
        access_token,
      } = response.data;
  
      const userObj = {
        email,
        name,
        user_id,
        role_id,
        role_name,
        restaurant_id,
      };
  
      login(userObj, access_token);
    } catch (error) {
      setError("api", { message: error.response?.data?.error || "Signup failed. Please try again." });
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
          {errors.api && <p className="text-red-500 text-center">{errors.api.message}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
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

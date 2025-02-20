import { Button } from "@/components/ui/button";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router";
import { Label } from "@radix-ui/react-label";

export default function DashboardPage() {
  const { restaurant, user } = useAuthStore();

  if(restaurant == null){

  return(
    <div className="flex flex-col items-center pt-60 justify-center">
      <Link to="/register-restaurant">
        <Button>Create Your Restaurant</Button>
      </Link>
    </div>
  )

  }
  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-30">      
      {/* Main Content */}
      <Label>Welcome {user?.name}</Label>
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 mt-10">
        <h1 className="text-2xl font-semibold text-center mb-6">Orders</h1>
        <div className="space-y-4">

        </div>
      </div>
    </div>
  );
// }
}

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router";

export default function DashboardPage() {
  const {  logout, restaurant } = useAuthStore();

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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 pt-30">      
      {/* Main Content */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 mt-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Dashboard</h1>
        <div className="space-y-4">
          <div>
            <Label className="text-gray-600">Email</Label>
            <p className="text-lg font-medium">{}</p>
          </div>
          <Button onClick={logout} className="w-full bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
// }
}

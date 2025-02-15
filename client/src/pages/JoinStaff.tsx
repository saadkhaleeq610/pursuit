import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "phosphor-react";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

export default function JoinRestaurant() {
  const [email, setEmail] = useState("");
  const [invite, setInvite] = useState<any>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { login, accessToken } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  const checkInvite = async () => {
    setError(null);
    try {
      const response = await axios.post("http://localhost:8080/check-invite", { email });
      setInvite(response.data); // Store invite data
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to check invite.");
    }
  };

  const joinStaff = async () => {
    setError(null);
    try {
      const response = await axios.post("http://localhost:8080/join-staff", {
        name,
        email,
        password,
        role_id: invite.role_id, // Use invite data
        restaurant_id: invite.restaurant_id, // Fix typo
      });

      login(response.data.email, response.data.accessToken); // Store access token
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to join restaurant.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardContent className="p-6">
          <button onClick={() => navigate("/")} className="flex items-center mb-4 text-gray-600 hover:text-black">
            <ArrowLeft className="w-6 h-6 mr-2" />
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!invite ? (
            <>
              <h2 className="text-xl font-bold mb-4">Enter your email to check for an invite</h2>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              <Button onClick={checkInvite} className="w-full">Check Invite</Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">You've been invited to join a restaurant</h2>
              <Input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4" />
              <Input type="email" value={email} disabled className="mb-4 bg-gray-200" />
              <Input type="password" placeholder="Set Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
              <Button onClick={joinStaff} className="w-full">Join Restaurant</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

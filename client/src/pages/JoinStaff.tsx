import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function JoinRestaurant() {
  const [email, setEmail] = useState("");
  const [invite, setInvite] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkInvite = async () => {
    try {
      const response = await fetch("/check-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.email) {
        setInvite(data);
      }
    } catch (error) {
      console.error("Error checking invite:", error);
    }
  };

  const joinStaff = async () => {
    try {
      const response = await fetch("/join-staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password, role_id: invite.role_id, restaurant_id: invite.restaurant_id }),
      });
      const data = await response.json();
      if (response.ok && data.access_token) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error joining staff:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardContent className="p-6">
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

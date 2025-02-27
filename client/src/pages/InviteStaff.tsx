import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function InviteUserPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInvite = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    try {
        const response = await axios.post("http://localhost:8080/invite-user", {
            email,
            role_id: 3, // Replace with the appropriate role ID
          });

        setMessage(response.data.message);

      setMessage("Invitation sent successfully!");
    } catch (err: any) {
        setError(err.response?.data?.error || "Failed to send invite"); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Invite User</h1>
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <Label className="text-gray-900">Email</Label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          {message && <p className="text-green-600 text-center">{message}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}
          <Button type="submit" className="w-full bg-[#F65A11] hover:bg-orange-600 text-white">
            Send Invite
          </Button>
        </form>
      </div>
    </div>
  );
}

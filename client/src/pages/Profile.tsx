import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Profile = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <div className="space-y-3">
        <Label>Name</Label>
        <Input type="text" placeholder="Enter your name" />
      </div>

      <div className="space-y-3">
        <Label>Email</Label>
        <Input type="email" placeholder="Enter your email" />
      </div>

      <Button className="mt-4 w-full">Update Profile</Button>
    </div>
  );
};

export default Profile;

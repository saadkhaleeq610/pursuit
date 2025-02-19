import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RestaurantDetails = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Restaurant Details</h1>

      <div className="space-y-3">
        <Label>Restaurant Name</Label>
        <Input type="text" placeholder="Enter restaurant name" />
      </div>

      <div className="space-y-3">
        <Label>Address</Label>
        <Input type="text" placeholder="Enter address" />
      </div>

      <div className="space-y-3">
        <Label>Phone Number</Label>
        <Input type="tel" placeholder="Enter phone number" />
      </div>

      <Button className="mt-4 w-full">Update Details</Button>
    </div>
  );
};

export default RestaurantDetails;

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Settings = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="flex items-center justify-between">
        <Label>Enable Notifications</Label>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <Label>Dark Mode</Label>
        <Switch />
      </div>

      <Button className="mt-4 w-full">Save Settings</Button>
    </div>
  );
};

export default Settings;

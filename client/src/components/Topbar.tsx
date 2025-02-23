import { Input } from "@/components/ui/input";
import { Bell } from "phosphor-react";

const TopBar = () => {
  return (
    <div className="w-full pl-80 flex items-center justify-between py-4 bg-white shadow-md">
      <Input 
        type="text" 
        placeholder="Search..." 
        className="max-w-sm border rounded-lg px-3 py-2"
      />
      <button className="relative p-2 rounded-full hover:bg-gray-100">
        <Bell size={24} weight="bold" className="text-gray-600" />
      </button>
    </div>
  );
};

export default TopBar;

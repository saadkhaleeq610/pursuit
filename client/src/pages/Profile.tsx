import { useAuthStore } from "@/store/useAuthStore";

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-md rounded-lg bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6 text-center">Profile</h1>

      <div className="space-y-5 text-lg">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Name:</span>
          <span className="text-gray-800">{user?.name}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{user?.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Role:</span>
          <span className="text-gray-800">{user?.role_name}</span>
        </div>  
      </div>
    </div>
  );
};

export default Profile;

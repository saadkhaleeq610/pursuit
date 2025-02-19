import { useAuthStore } from "@/store/useAuthStore";

const Profile = () => {
  const { email, name, role_name } = useAuthStore();

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Profile</h1>

      <div className="space-y-5 text-lg">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Name:</span>
          <span className="text-gray-800">{name}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Role:</span>
          <span className="text-gray-800">{role_name}</span>
        </div>  
      </div>
    </div>
  );
};

export default Profile;

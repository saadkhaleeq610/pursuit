import { useAuthStore } from "@/store/useAuthStore";

const RestaurantDetails = () => {
  const { restaurant } = useAuthStore();

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">Restaurant Details</h1>

      {restaurant ? (
        <div className="space-y-5 text-lg">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-800">{restaurant.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Address:</span>
            <span className="text-gray-800">{restaurant.address}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Phone:</span>
            <span className="text-gray-800">{restaurant.phone_number}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No restaurant details available.</p>
      )}
    </div>
  );
};

export default RestaurantDetails;

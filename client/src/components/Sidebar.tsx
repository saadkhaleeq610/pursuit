import { NavLink } from "react-router";

const Sidebar = () => {
    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-xl font-semibold mb-4">Pursuit</h2>
        <nav>
          <ul>
            <li className="mb-2"><NavLink to="/orders" className="block p-2 hover:bg-gray-700">Orders</NavLink></li>
            <li className="mb-2"><NavLink to="/products" className="block p-2 hover:bg-gray-700">Products</NavLink></li>
            <li className="mb-2"><NavLink to="/customers" className="block p-2 hover:bg-gray-700">Customers</NavLink></li>
          </ul>
        </nav>
      </div>
    );
  };

  export default Sidebar;
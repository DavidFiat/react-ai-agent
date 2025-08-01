import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  occupation: string;
  location: string;
  joinDate: string;
  status: string;
  department: string;
  manager: string | null;
};

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/DavidFiat/react-ai-agent/main/src/data/users.json"
      );
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  fetchUsers();
}, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 flex flex-col items-center animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700 dark:text-indigo-300">
        User Directory
      </h1>
      <div className="overflow-x-auto w-full max-w-6xl mx-auto border-2 border-indigo-200 dark:border-indigo-900 rounded-xl shadow-2xl">
        <table className="min-w-full bg-white dark:bg-gray-800 border-collapse">
          <thead className="bg-indigo-600 text-white dark:bg-indigo-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-r border-indigo-500 dark:border-indigo-700">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-r border-indigo-500 dark:border-indigo-700">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-r border-indigo-500 dark:border-indigo-700">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-r border-indigo-500 dark:border-indigo-700">
                Age
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-r border-indigo-500 dark:border-indigo-700">
                Occupation
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-r border-indigo-500 dark:border-indigo-700">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-r border-indigo-500 dark:border-indigo-700">
                Join Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-r border-indigo-500 dark:border-indigo-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-r border-indigo-500 dark:border-indigo-700">
                Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-indigo-500 dark:border-indigo-700">
                Manager
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-150 ease-in-out ${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-750"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white border-b border-r border-gray-200 dark:border-gray-700">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600 dark:text-indigo-300 border-b border-r border-gray-200 dark:border-gray-700">
                  {user.name}
                </td>
                <td className="px-6 py-41 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 border-b border-r border-gray-200 dark:border-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 border-b border-r border-gray-200 dark:border-gray-700">
                  {user.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 border-b border-r border-gray-200 dark:border-gray-700">
                  {user.occupation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 border-b border-r border-gray-200 dark:border-gray-700">
                  {user.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 border-b border-r border-gray-200 dark:border-gray-700">
                  {new Date(user.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </td>
                <td className="px-61 py-4 whitespace-nowrap text-sm border-b border-r border-gray-200 dark:border-gray-700">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 border-b border-r border-gray-200 dark:border-gray-700">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {user.department}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  {user.manager || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        Showing {users.length} users
      </div>
    </div>
  );
};

export default UserTable;

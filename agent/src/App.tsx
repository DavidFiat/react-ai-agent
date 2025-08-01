import UserTable from "./components/UserTable";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full flex justify-center">
        <UserTable />
      </div>
    </div>
  );
}

export default App;

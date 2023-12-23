import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Backlog from "./components/status/Backlog";
import Progress from "./components/status/Progress";
import Done from "./components/status/Done";
import Cancelled from "./components/status/Cancelled";
import Todo from "./components/status/Todo";
import Users from "./components/users/Users";
import Priority from "./components/priority/Priority";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("priority");
  const [orderOption, setOrderOption] = useState("status");
  const [displayOption, setDisplayOption] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers"
        );
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const toggleDisplayOptions = () => {
    setDisplayOption(!displayOption);
  };

  const findUser = (userId) => {
    const user = data.users.find((user) => user.id === userId);
    return user ? user.name : "unknown";
  };

  const userStatus = (userId) => {
    const user = data.users.find((user) => user.id === userId);
    return user.available;
  };

  const modeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Navbar
        onDisplayOptionsClick={toggleDisplayOptions}
        onModeChange={modeChange}
      />
      {displayOption && (
        <div
          className={
            darkMode
              ? `absolute top-14 left-5 bg-gray-800 p-5 border rounded-md shadow-md z-10 text-white`
              : `absolute top-14 left-5 bg-white p-5 border rounded-md shadow-md z-10`
          }
        >
          <div className="flex items-center gap-10 mb-3">
            <label className="block text-gray-400 text-md font-md mb-2 text-md">
              Grouping
            </label>
            <select
              className={
                darkMode
                  ? `bg-gray-800 text-white text-sm border rounded p-1 pr-4`
                  : `text-sm border rounded p-1 pr-4`
              }
              value={orderOption}
              onChange={(e) => setOrderOption(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="users">Users</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="flex items-center gap-10">
            <label className="block text-gray-400 text-md font-md mb-2 text-md mr-1">
              Ordering
            </label>
            <select
              className={
                darkMode
                  ? `bg-gray-800 text-white text-sm border rounded p-1 pr-4`
                  : `text-sm border rounded p-1 pr-4`
              }
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
      <div
        className={
          darkMode
            ? `bg-black-100 text-white h-full px-5 py-5`
            : `bg-gray-100 h-full px-5 py-5`
        }
      >
        {orderOption === "status" && (
          <div className="grid grid-cols-5 gap-4">
            <Backlog
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
              darkMode={darkMode}
            />
            <Todo
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
              darkMode={darkMode}
            />
            <Progress
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
              darkMode={darkMode}
            />
            <Done
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
              darkMode={darkMode}
            />
            <Cancelled
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
              darkMode={darkMode}
            />
          </div>
        )}

        {orderOption === "users" && (
          <div>
            <Users
              data={data}
              sortOption={sortOption}
              userStatus={userStatus}
              darkMode={darkMode}
            />
          </div>
        )}

        {orderOption === "priority" && (
          <div>
            <Priority
              data={data}
              sortOption={sortOption}
              userStatus={userStatus}
              findUser={findUser}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

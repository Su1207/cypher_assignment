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

  const findUser = (userId) => {
    const user = data.users.find((user) => user.id === userId);
    return user ? user.name : "unknown";
  };

  const userStatus = (userId) => {
    const user = data.users.find((user) => user.id === userId);
    return user.available;
  };

  return (
    <div>
      <Navbar />
      <div className=" mb-4 flex gap-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Grouping
        </label>
        <select
          className="border rounded p-1"
          value={orderOption}
          onChange={(e) => setOrderOption(e.target.value)}
        >
          <option value="status">Status</option>
          <option value="users">Users</option>
          <option value="priority">Priority</option>
        </select>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ordering
        </label>
        <select
          className="border rounded p-1"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className="bg-gray-100 h-full px-5 py-5">
        {orderOption === "status" && (
          <div className="grid grid-cols-5 gap-4">
            <Backlog
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
            />
            <Todo
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
            />
            <Progress
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
            />
            <Done
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
            />
            <Cancelled
              data={data}
              findUser={findUser}
              sortOption={sortOption}
              userStatus={userStatus}
            />
          </div>
        )}

        {orderOption === "users" && (
          <div>
            <Users
              data={data}
              sortOption={sortOption}
              userStatus={userStatus}
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
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

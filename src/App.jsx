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
      {/* <div>
        {data.tickets.map((ticket) => (
          <div key={ticket.id}>
            {ticket.title} - {findUser(ticket.userId)} - {ticket.tag[0]}
          </div>
        ))}
      </div> */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sort By:
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
        <div className="grid grid-cols-5 gap-4">
          {/* <Backlog
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
        /> */}
        </div>

        <div>
          {/* <Users
          data={data}
          sortOption={sortOption}
          userStatus={userStatus}
        /> */}
        </div>

        <div>
          <Priority
            data={data}
            sortOption={sortOption}
            userStatus={userStatus}
            findUser={findUser}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

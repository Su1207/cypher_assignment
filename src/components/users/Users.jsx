import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { RxDotsHorizontal } from "react-icons/rx";
import StatusSymbol from "./StatusSymbol";
import PriorityComponent from "../priorityNetwork/PriorityComponent";
import { FaCircle } from "react-icons/fa";

const Users = ({ data, sortOption }) => {
  const sizes = data.users.length;

  const getInitials = (name) => {
    const words = name.split(" ");
    return words.map((word) => word[0]).join("");
  };

  const sortTickets = (a, b) => {
    if (sortOption === "priority") {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
    }

    // Sort by title in alphabetical order
    return a.title.localeCompare(b.title);
  };

  const findTickets = (id) => {
    const ticket = data.tickets
      .filter((ticket) => ticket.userId === id)
      .sort(sortTickets);
    return ticket;
  };

  return (
    <div className={`grid grid-cols-${sizes} gap-4`}>
      {data.users.map((user) => (
        <div key={user.id}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="relative inline-flex items-center p-1 justify-center bg-red-500 text-white font-xs text-xs w-4 h-4 rounded-full"
                style={{ fontSize: "0.6rem" }}
              >
                {getInitials(user.name)}
                {user.available === true ? (
                  <div className="absolute bg-yellow-500 w-1 h-1 bottom-0 right-0 rounded-full"></div>
                ) : (
                  <div className="absolute bg-gray-500 w-1 h-1 bottom-0 right-0 rounded-full"></div>
                )}
              </div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <div className="text-gray-500 ml-2">
                {findTickets(user.id).length}
              </div>
            </div>
            <div className="flex items-center">
              <RxDotsHorizontal className="mr-1" />
              <IoAddOutline />
            </div>
          </div>
          {/* Display tickets for the current user */}
          {findTickets(user.id).map((ticket) => (
            <div className="bg-white rounded-md py-2 px-5 my-2" key={ticket.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-500">{ticket.id}</div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="mt-1">
                  <StatusSymbol status={ticket.status} className="pt-1" />
                </div>
                <div className="font-semibold leading-5">{ticket.title}</div>
              </div>
              <div className="mt-2 flex gap-2 items-center mb-1">
                <PriorityComponent priority={ticket.priority} />
                <div className="flex items-center gap-1 text-sm text-gray-400 border rounded-sm px-2">
                  <FaCircle className="text-gray-500 size-3" />
                  {ticket.tag[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Users;

import React from "react";
import { GiCircle } from "react-icons/gi";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";
import PriorityComponent from "../priorityNetwork/PriorityComponent";
import { FaCircle } from "react-icons/fa";

const Todo = ({ data, findUser, sortOption, userStatus, darkMode }) => {
  const sortTickets = (a, b) => {
    if (sortOption === "priority") {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
    }

    return a.title.localeCompare(b.title);
  };

  const todoTickets = data.tickets
    .filter((ticket) => ticket.status === "Todo")
    .sort(sortTickets);

  const getInitials = (name) => {
    const words = name.split(" ");
    return words.map((word) => word[0]).join("");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <GiCircle className="mr-2" />
          <p
            className={
              darkMode
                ? `font-semibold text-white`
                : `font-semibold text-gray-800`
            }
          >
            Todo
          </p>
        </div>
        <div className="flex items-center">
          <RxDotsHorizontal className="mr-1" />
          <IoAddOutline />
        </div>
      </div>
      {todoTickets.map((tickets) => (
        <div
          className={`shadow-md ${
            darkMode
              ? "bg-slate-900 text-white rounded-md py-2 px-5 my-2 border"
              : "bg-white rounded-md py-2 px-5 my-2 border"
          }`}
          key={tickets.id}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-500">{tickets.id}</div>
            <div
              className="relative inline-flex items-center p-1 justify-center bg-red-500 text-white font-xs text-xs w-4 h-4 rounded-full"
              style={{ fontSize: "0.6rem" }}
            >
              {getInitials(findUser(tickets.userId))}
              {userStatus(tickets.userId) === true ? (
                <div class="absolute bg-yellow-500 w-1 h-1 bottom-0 right-0 rounded-full"></div>
              ) : (
                <div class="absolute bg-gray-500 w-1 h-1 bottom-0 right-0 rounded-full"></div>
              )}
            </div>
          </div>
          <div className="font-semibold text-base leading-5">
            {tickets.title}
          </div>
          <div className="mt-2 flex gap-2 items-center mb-1">
            <PriorityComponent priority={tickets.priority} />
            <div className="flex items-center gap-1 text-sm text-gray-400 border rounded-sm px-2">
              <FaCircle className="text-gray-500 size-3" />
              {tickets.tag[0]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;

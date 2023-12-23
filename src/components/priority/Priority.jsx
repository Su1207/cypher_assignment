import React from "react";
import PriorityComponent from "../priorityNetwork/PriorityComponent";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";
import StatusSymbol from "../users/StatusSymbol";
import { FaCircle } from "react-icons/fa";

const Priority = ({ data, sortOption, userStatus, findUser, darkMode }) => {
  const sortTickets = (a, b) => {
    if (sortOption === "priority") {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
    }

    // Sort by title in alphabetical order
    return a.title.localeCompare(b.title);
  };

  //priority labelling
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 0:
        return "No Priority";
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      case 4:
        return "Urgent";
      default:
        return "Unknown Priority";
    }
  };

  // Group tickets by priority
  const groupTicketsByPriority = () => {
    const groupedTickets = {};

    // Group tickets
    data.tickets.forEach((ticket) => {
      const priority = ticket.priority;

      if (!groupedTickets[priority]) {
        groupedTickets[priority] = [];
      }

      groupedTickets[priority].push(ticket);
    });

    // Sort tickets within each priority group by title
    Object.keys(groupedTickets).forEach((priority) => {
      groupedTickets[priority].sort((a, b) => a.title.localeCompare(b.title));
    });

    return groupedTickets;
  };

  const getInitials = (name) => {
    const words = name.split(" ");
    return words.map((word) => word[0]).join("");
  };

  const groupedTickets = groupTicketsByPriority();

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* In JavaScript, Object.entries() is used to get an array of key-value pairs
      from an object. */}
      {Object.entries(groupedTickets).map(([priority, tickets]) => (
        <div key={priority}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <PriorityComponent priority={Number(priority)} />
              </div>
              <div
                className={
                  darkMode
                    ? `font-semibold text-white`
                    : `font-semibold text-gray-800`
                }
              >
                {getPriorityLabel(Number(priority))}
              </div>
            </div>
            <div className="flex items-center">
              <RxDotsHorizontal className="mr-1" />
              <IoAddOutline />
            </div>
          </div>
          {tickets.map((ticket) => (
            <div
              className={
                darkMode
                  ? `bg-slate-900 rounded-md py-2 px-5 my-2 border text-white`
                  : `bg-white rounded-md py-2 px-5 my-2`
              }
              key={ticket.id}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-500">{ticket.id}</div>
                <div
                  className="relative inline-flex items-center p-1 justify-center bg-red-500 text-white font-xs text-xs w-4 h-4 rounded-full"
                  style={{ fontSize: "0.6rem" }}
                >
                  {getInitials(findUser(ticket.userId))}
                  {userStatus(ticket.userId) === true ? (
                    <div class="absolute bg-yellow-500 w-1 h-1 bottom-0 right-0 rounded-full"></div>
                  ) : (
                    <div class="absolute bg-gray-500 w-1 h-1 bottom-0 right-0 rounded-full"></div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <div className="mt-1">
                  <StatusSymbol status={ticket.status} />
                </div>
                <div className="font-semibold leading-5">{ticket.title}</div>
              </div>
              <div className="mt-2 flex gap-2 items-center mb-1">
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

export default Priority;

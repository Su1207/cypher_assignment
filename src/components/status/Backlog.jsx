import React, { useState } from "react";
import { TbCircleDotted } from "react-icons/tb";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import PriorityComponent from "../priorityNetwork/PriorityComponent";
import { MdDarkMode } from "react-icons/md";

const Backlog = ({ data, findUser, sortOption, userStatus, darkMode }) => {
  const sortTickets = (a, b) => {
    if (sortOption === "priority") {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
    }

    // Sort by title in alphabetical order
    return a.title.localeCompare(b.title);
  };

  // Filter tickets with status "Backlog"
  const backlogTickets = data.tickets
    .filter((ticket) => ticket.status === "Backlog")
    .sort(sortTickets);

  const getInitials = (name) => {
    const words = name.split(" ");
    return words.map((word) => word[0]).join("");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <TbCircleDotted className="mr-2" />
          <p
            className={
              darkMode
                ? `font-semibold text-white`
                : `font-semibold text-gray-800`
            }
          >
            Backlog
          </p>
          <div className="ml-4">{backlogTickets.length}</div>
        </div>
        <div className="flex items-center">
          <RxDotsHorizontal className="mr-1" />
          <IoAddOutline />
        </div>
      </div>

      {backlogTickets.map((tickets) => (
        <div
          className={
            darkMode
              ? `bg-slate-900 rounded-md py-2 px-5 my-2 border text-white`
              : `bg-white rounded-md py-2 px-5 my-2`
          }
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

export default Backlog;

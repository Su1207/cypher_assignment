import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";

const Done = ({ data, darkMode }) => {
  const doneTickets = data.tickets.filter((ticket) => ticket.status === "Done");
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaCheckCircle className="mr-2 h-5 text-blue-800" />
          <p
            className={
              darkMode
                ? `font-semibold text-white`
                : `font-semibold text-gray-800`
            }
          >
            Done
          </p>
          <div className="ml-4">{doneTickets.length}</div>
        </div>
        <div className="flex items-center">
          <RxDotsHorizontal className="mr-1" />
          <IoAddOutline />
        </div>
      </div>
    </div>
  );
};

export default Done;

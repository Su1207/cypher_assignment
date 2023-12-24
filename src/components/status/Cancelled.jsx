import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";

const Cancelled = ({ data, findUser, darkMode }) => {
  const cancelTickets = data.tickets.filter(
    (ticket) => ticket.status === "Cancel"
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <IoIosCloseCircle className="mr-2 text-black-50 size-5" />
          <p
            className={
              darkMode
                ? `font-semibold text-white`
                : `font-semibold text-gray-800`
            }
          >
            Cancelled
          </p>
          <div className="ml-4">{cancelTickets.length}</div>
        </div>
        <div className="flex items-center">
          <RxDotsHorizontal className="mr-1" />
          <IoAddOutline />
        </div>
      </div>
    </div>
  );
};

export default Cancelled;

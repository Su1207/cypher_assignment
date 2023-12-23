import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";

const Cancelled = ({ data, findUser }) => {
  const cancelTickets = data.tickets.filter(
    (ticket) => ticket.status === "Cancel"
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <IoIosCloseCircle className="mr-2 text-black-50 size-5" />
          <p className="font-semibold text-gray-800">Cancelled</p>
        </div>
        <div className="flex items-center">
          <RxDotsHorizontal className="mr-1" />
          <IoAddOutline />
        </div>
      </div>
      <div className="bg-white rounded-md py-2 px-4 my-2">Learn</div>
    </div>
  );
};

export default Cancelled;

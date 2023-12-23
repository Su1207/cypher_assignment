import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoAddOutline } from "react-icons/io5";

const Done = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaCheckCircle className="mr-2 h-5 text-blue-800" />
          <p className="font-semibold text-gray-800">Done</p>
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

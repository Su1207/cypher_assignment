import React from "react";
import { BsExclamationSquareFill } from "react-icons/bs";

const Urgent = () => {
  return (
    <div className="flex items-center justify-center w-6 h-5 rounded-sm border">
      <BsExclamationSquareFill className="text-orange-500" />
    </div>
  );
};

export default Urgent;

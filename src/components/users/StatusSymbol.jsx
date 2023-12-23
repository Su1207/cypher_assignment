import React from "react";
import { TbCircleDotted } from "react-icons/tb";
import { GiCircle } from "react-icons/gi";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const StatusSymbol = ({ status }) => {
  switch (status) {
    case "Backlog":
      return <TbCircleDotted />;
    case "Todo":
      return <GiCircle />;
    case "In progress":
      return <BiSolidCircleThreeQuarter className=" text-yellow-300" />;
    case "Done":
      return <FaCheckCircle className="h-5 text-blue-800" />;
    case "Cancel":
      return <IoIosCloseCircle className="text-black-50" />;
    default:
      return null;
  }
};

export default StatusSymbol;

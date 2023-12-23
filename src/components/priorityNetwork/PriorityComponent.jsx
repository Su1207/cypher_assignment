import React from "react";
import NoPriority from "./NoPriority";
import Low from "./Low";
import Medium from "./Medium";
import High from "./High";
import Urgent from "./Urgent";

const PriorityComponent = ({ priority }) => {
  switch (priority) {
    case 0:
      return <NoPriority />;
    case 1:
      return <Low />;
    case 2:
      return <Medium />;
    case 3:
      return <High />;
    case 4:
      return <Urgent />;
    default:
      return null;
  }
};

export default PriorityComponent;

import React, { useState, useEffect } from "react";
import { MdOutlineTune } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSolidMoon } from "react-icons/bi";

const Navbar = () => {
  // Retrieve the initial values from localStorage or use default values
  const initialGroupingOption =
    localStorage.getItem("groupingOption") || "Status";
  const initialOrderingOption =
    localStorage.getItem("orderingOption") || "Priority";

  const [groupingOption, setGroupingOption] = useState(initialGroupingOption);
  const [orderingOption, setOrderingOption] = useState(initialOrderingOption);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setArrowRotation((prevRotation) => (prevRotation === 0 ? 180 : 0));
  };

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleOrderingChange = (option) => {
    setOrderingOption(option);
  };

  // Update localStorage whenever the options change
  useEffect(() => {
    localStorage.setItem("groupingOption", groupingOption);
    localStorage.setItem("orderingOption", orderingOption);
  }, [groupingOption, orderingOption]);

  return (
    <nav className="flex justify-between items-center px-5 py-3 border border-b-1">
      <div className="">
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-md shadow-md text-sm font-small text-gray-700 bg-white focus:outline-none transition-transform duration-300 ease-in-out"
          type="button"
        >
          <MdOutlineTune className="text-gray-600 size-4" />
          Display
          <IoIosArrowDown
            className={`transform ${isDropdownOpen ? "rotate-180" : ""}`}
            style={{ transition: "transform 300ms ease-in-out" }}
          />
        </button>

        {/* {isDropdownOpen && (
          <>
            <div className="">
              <button>Grouping</button>
              <div className="dropdown-content">
                <button onClick={() => handleGroupingChange("Status")}>
                  Status
                </button>
                <button onClick={() => handleGroupingChange("User")}>
                  User
                </button>
                <button onClick={() => handleGroupingChange("Priority")}>
                  Priority
                </button>
              </div>
            </div>
            <div className="">
              <button>Ordering</button>
              <div className="dropdown-content">
                <button onClick={() => handleOrderingChange("Priority")}>
                  Priority
                </button>
                <button onClick={() => handleOrderingChange("Title")}>
                  Title
                </button>
              </div>
            </div>
          </>
        )} */}
      </div>
      <div>
        <BiSolidMoon className="size-5" />
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { MdOutlineTune } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSolidMoon } from "react-icons/bi";

const Navbar = ({ onDisplayOptionsClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    onDisplayOptionsClick();
    setIsDropdownOpen(!isDropdownOpen);
    setArrowRotation((prevRotation) => (prevRotation === 0 ? 180 : 0));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      onDisplayOptionsClick();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center px-5 py-3 border border-b-1">
      <div className="" ref={dropdownRef}>
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
      </div>
      <div>
        <BiSolidMoon className="size-5" />
      </div>
    </nav>
  );
};

export default Navbar;

import  { useMemo, useState } from "react";

export function DropDown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [list] = useState([1, 2, 3]);

  const toggleDropDown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const DropDownlist = useMemo(() => {
    return list.map((el) => <div>{el}</div>);
  }, [list]);

  return (
    <div>
      <button className="px-6 py-2 font-merat" onClick={toggleDropDown}>
        {isDropdownOpen ? DropDownlist : null}
      </button>
    </div>
  );
}

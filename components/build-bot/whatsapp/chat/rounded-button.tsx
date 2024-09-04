import React from "react";

interface Props {
  icon: JSX.Element;
  onClick?: (e: React.MouseEvent) => void;
}

function RoundedBtn({ icon, onClick }: Props) {
  return (
    <button
      className="text-[#8796a1] text-xl p-2 rounded-full hover:bg-[#3c454c]"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default RoundedBtn;

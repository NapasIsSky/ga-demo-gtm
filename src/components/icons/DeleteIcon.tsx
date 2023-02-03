import React from "react";

interface IDeleteIcon {
  className: string;
}

const DeleteIcon: React.FC<IDeleteIcon> = (props) => {
  return (
    <svg
      className={props.className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="delete_forever_24px">
        <path
          id="icon/action/delete_forever_24px"
          d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM12 12.59L14.12 10.47L15.5299 11.88L13.4099 14L15.5299 16.12L14.12 17.53L12 15.41L9.88 17.53L8.46997 16.12L10.59 14L8.45996 11.88L9.87 10.47L12 12.59ZM6 19C6 20.1 6.90002 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM16 9H8V19H16V9Z"
        />
      </g>
    </svg>
  );
};

export default DeleteIcon;

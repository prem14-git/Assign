import React from "react";

const Toast = ({ message, type = "success", onClose }) => {
  if (!message) return null;
  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white ${type === "error" ? "bg-red-600" : "bg-green-600"}`}>
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white font-bold">&times;</button>
      </div>
    </div>
  );
};

export default Toast;
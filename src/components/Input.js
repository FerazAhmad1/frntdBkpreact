import React from "react";
import { useRef } from "react";

export const Input = ({ placeholder, type }) => {
  const InputRef = useRef();
  return (
    <div>
      <input ref={InputRef} placeholder={placeholder} type={type} />
    </div>
  );
};

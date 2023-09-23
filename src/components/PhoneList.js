import React from "react";

export const PhoneList = ({
  name,
  email,
  phoneNumber,
  deleteHandler,
  editHandler,
}) => {
  return (
    <div>
      <ul>
        <li>
          Name:{name} email:{email} phone number:
          {phoneNumber}
          <button onClick={deleteHandler}>Delete</button>
          <button onClick={editHandler}>Edit</button>
        </li>
      </ul>
    </div>
  );
};

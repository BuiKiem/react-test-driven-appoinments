import React from "react";

export const CustomerForm = ({ firstName }) => {
  return (
    <form id="customer">
      <input type="text" name="firstName" value={firstName} />
    </form>
  );
};

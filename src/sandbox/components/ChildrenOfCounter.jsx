import React, { memo } from "react";

function ChildrenOfCounter({ someObj }) {
  console.log("The children component has been rendered again");

  return (
    <div>
      <p>first name: {someObj.firstName}</p>
      <p>last name: {someObj.lastName}</p>
    </div>
  );
}

export default memo(ChildrenOfCounter);

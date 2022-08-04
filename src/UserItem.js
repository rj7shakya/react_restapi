import React from "react";

const UserItem = (props) => {
  return (
    <div className="item__container">
      <div>{props?.item?.first_name} </div>
      <div onClick={() => props.deleteUser(props?.item?.id)} className="delete">
        X
      </div>
    </div>
  );
};

export default UserItem;

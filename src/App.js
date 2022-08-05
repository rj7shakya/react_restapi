import "./App.css";
import { useEffect, useState } from "react";

import axios from "axios";
import UserItem from "./UserItem";

function App() {
  const [users, setUsers] = useState(null);

  const deleteUser = (id) => {
    console.log("id", id);
    console.log("users", users);
    console.log(
      "filtered",
      users.filter((i) => i.id !== id)
    );
    setUsers(users.filter((i) => i.id !== id));

    // axios
    // .delete(`https://fakerestapi123.herokuapp.com/users/${id}`)
    // .then(() => {
    //   // console.log("delete");

    //     // users.filter(  id )
    //   })
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    const call = () => {
      axios
        .get("https://fakerestapi123.herokuapp.com/users")
        .then((res) => {
          setUsers(res?.data);
        })
        .catch((err) => console.log(err));
    };

    call();
  }, []);

  return (
    <div className="App">
      <div className="add__container">Add</div>
      {users ? (
        users.map((item, index) => (
          <UserItem item={item} key={index} deleteUser={deleteUser} />
        ))
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default App;

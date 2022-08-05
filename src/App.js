import "./App.css";
import { useEffect, useState } from "react";

import axios from "axios";
import UserItem from "./UserItem";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";
import UserModal from "./UserModal";

function App() {
  const [users, setUsers] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteUser = (id) => {
    axios
      .delete(`https://fakerestapi123.herokuapp.com/users/${id}`)
      .then(() => {
        setUsers(users.filter((i) => i.id !== id));
        // console.log("delete");

        // users.filter(  id )
      })
      .catch((err) => console.log(err));
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

  const addUser = (user) => {
    console.log("add user call", user);
    handleClose();

    axios
      .post("https://fakerestapi123.herokuapp.com/users", {
        first_name: user,
      })
      .then((res) => setUsers([...users, res?.data]))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div onClick={handleShow} className="add__container">
        Add
      </div>

      <UserModal show={show} handleClose={handleClose} addUser={addUser} />

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

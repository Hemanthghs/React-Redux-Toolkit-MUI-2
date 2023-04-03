import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser, getUsers } from "../redux/userSlice";

const Users = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const { data } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Users Data:</h1>
      {data.length > 0 &&
        data.map((user, index) => (
          <p key={index}>
            {user.name}{" "}
            <button
              onClick={() => {
                setUserId(user.id);
                setName(user.name);
              }}
            >
              Edit
            </button>{" "}
            <button onClick={() => dispatch(deleteUser(user.id))}>
              Delete
            </button>{" "}
          </p>
        ))}
      <input
        type="text"
        name=""
        value={name}
        onChange={(e) => setName(e.target.value)}
        id=""
        placeholder="Enter name"
      />
      <button
        onClick={() => {
          if (userId) {
            console.log({ id: userId, name: name })
            dispatch(updateUser({ id: userId, name: name }));
            setName("");
            setUserId("");
          } else {
            dispatch(addUser({ name }));
            setName("");
          }
        }}
      >
        {userId ? "Update" : "Add"}
      </button>
      <br />
      {/* <button onClick={() => dispatch(getUsers())}>Get Users</button> */}
    </div>
  );
};

export default Users;

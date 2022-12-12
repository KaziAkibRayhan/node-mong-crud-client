import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUsers, setDisplayUsers] = useState(users);
  const handleDelete = (user) => {
    const agree = window.confirm(
      `Are you sure to delete this user? ${user.name}`
    );
    console.log(agree);
    if (agree) {
      console.log("Delete User", user._id);
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("User deleted successfully");
            const remainingUsers = displayUsers.filter(
              (usr) => usr._id !== user._id
            );
            setDisplayUsers(remainingUsers);
          }
        });
    }
  };
  return (
    <div>
      <h2 className="text-center">Users: {displayUsers.length}</h2>
      <div>
        {displayUsers.map((user) => (
          <p className="text-center" key={user._id}>
            name: {user.name}. email: {user.email}.{" "}
            <Link to={`/update/${user._id}`}>
                <button className="btn btn-primary me-2">
                    Update
                </button>
            </Link>
            <button
              onClick={() => handleDelete(user)}
              className="btn btn-danger"
            >
              X
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const storedUser = useLoaderData();
  const [user, setUser] = useState(storedUser);

  const handleUpdateUser = (event) => {
    event.preventDefault();
    // console.log(user);
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("User Update Successfully");
          console.log(data);
        }
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);
  };

  return (
    <div>
      <h2 className="text-center">Update Users: {storedUser.name}</h2>
      <Form onSubmit={handleUpdateUser} className="w-50 mx-auto">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="text"
            defaultValue={storedUser.name}
            required
            name="name"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="text"
            defaultValue={storedUser.address}
            required
            name="address"
            placeholder="Address"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="email"
            defaultValue={storedUser.email}
            required
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default Update;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";

const AddUser = () => {
  const [user, setUser] = useState({ name: "Defalut", email: "def@gmail.com" });

  const handleAddUser = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("User Added Successfully", { duration: 2000 });
        event.target.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputBlur = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);
  };

  return (
    <div>
      <h3 className="text-center">Please add a new user ...</h3>
      <Form onSubmit={handleAddUser} className="w-50 mx-auto">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleInputBlur}
            type="text"
            required
            name="name"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            onChange={handleInputBlur}
            type="text"
            required
            name="address"
            placeholder="Address"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleInputBlur}
            type="email"
            required
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;

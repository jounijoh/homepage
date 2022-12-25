import React, { useState } from "react";
import { Container } from "@mui/system";
import { getDatabase } from "firebase/database";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { ref, set } from "firebase/database";
import { v4 } from "react-uuid";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const db = getDatabase();
  const handleSubmit = (event) => {
    event.preventDefault();
    set(ref(db, "/messages" + name + v4), {
      name: name,
      email: email,
      message: message,
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Container style={{ width: "70%" }}>
      <h1>My info: </h1>
      <Card style={{ width: "100%" }}>
        <Card.Img
          variant="top"
          src="https://firebasestorage.googleapis.com/v0/b/digitekniikatlopputyo.appspot.com/o/frontPageImages%2Fomakuva.jpg?alt=media&token=f94ed0b5-7561-4493-91ca-116b246fbecb"
        />
        <Card.Body style={{ width: "90%" }}>
          <Card.Title>My info</Card.Title>
          <Card.Text style={{ color: "black" }}>
            Email: jouni.johansson@myy.haaga-helia.fi <br/>
            Instagram: <Card.Link href="https://www.instagram.com/jounijo/">Jounijo</Card.Link>
          </Card.Text>
        </Card.Body>
      </Card>
      <br/>
    <h3>Anything to comment? Write message below!</h3>
      <Form onSubmit={handleSubmit} id="contact-form">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Message:</Form.Label>
          <Form.Control
            type="textarea"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

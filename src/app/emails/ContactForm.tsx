import {
  Container,
  Heading,
  Html,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

const ContactForm = ({
  params,
}: {
  params: { username: string; email: string; message: string; subject: string };
}) => {
  return (
    <Html>
      <Heading
        as="h1"
        style={{ maxWidth: "720px", margin: "auto", paddingBottom: "10px" }}
      >
        New Contact Message
      </Heading>
      <Section
        style={{
          border: "1px dashed #ccc",
          maxWidth: "720px",
          margin: "auto",
        }}
      >
        <Heading as="h3" style={{ paddingLeft: "20px" }}>
          Name
        </Heading>

        <Text style={{ paddingLeft: "20px" }}>{params.username}</Text>
        <Heading as="h3" style={{ paddingLeft: "20px" }}>
          Email
        </Heading>
        <Text style={{ paddingLeft: "20px" }}>{params.email}</Text>
        <Heading as="h3" style={{ paddingLeft: "20px" }}>
          Subject
        </Heading>

        <Text style={{ paddingLeft: "20px" }}>{params.subject}</Text>
        <Heading as="h3" style={{ paddingLeft: "20px" }}>
          Message
        </Heading>

        <Text style={{ paddingLeft: "20px" }}>{params.message}</Text>
      </Section>
    </Html>
  );
};

export default ContactForm;

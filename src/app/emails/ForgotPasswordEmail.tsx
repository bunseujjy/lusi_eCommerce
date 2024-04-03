import { Button, Heading, Hr, Html, Link, Text } from "@react-email/components";
import * as React from "react";

export default function ForgotPasswordEmail({
  params,
}: {
  params: { username: string; url: string };
}) {
  return (
    <Html>
      <Heading as="h2"> Dear {params.username},</Heading>
      <Text>
        Your Sangzhi ecommerce website password can be reset by clicking the
        button below. If you did not request a new password, please ignore the
        email.
      </Text>
      <Button
        href={params.url}
        style={{ background: "#000", color: "#FFFFFF", padding: "12px 20px" }}
      >
        Reset Password
      </Button>
      <Hr />

      <Text>
        Need Help? <Link href="">Contact our support team</Link> or hit us on
        Twitter <Link href="/">@discord</Link>.
      </Text>
      <Text>
        Want to give us feedback? Let us know what you think on our{" "}
        <Link href="">feedback site.</Link>
      </Text>
    </Html>
  );
}

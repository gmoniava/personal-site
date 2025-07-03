"use client";
import React from "react";

// Display email on the client side to avoid spam bots
function ClientSideEmail() {
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setEmail(`moniava [dot] g [at] gmail [dot] com`);
  }, []);

  return (
    <div>
      {email ? (
        <p>{`If you have questions or comments feel free to get in touch (${email}).`}</p>
      ) : (
        <span>Loading email...</span>
      )}
    </div>
  );
}

export default ClientSideEmail;

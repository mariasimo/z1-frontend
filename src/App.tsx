import React, { useState } from "react";
import { Link, Route } from "wouter";
import TakePicture from "./TakePicture";

const App = () => {
  const [picture, setPicture] = useState<string | undefined>();

  return (
    <body>
      <Link to="/">BankClient</Link>
      <Route path="/take-picture">
        <TakePicture picture={picture} setPicture={setPicture} />
      </Route>
      <Route path="/">
        <Home picture={picture} />
      </Route>
    </body>
  );
};

const Home = ({ picture }: { picture: string | undefined }) => (
  <main>
    <h1>Scan your id</h1>
    <p>
      Take a picture. It may take time to validate your personal information.
    </p>
    {picture && <img src={picture} alt="output" width="400" height="225" />}
    <Link to="/take-picture">Take Picture</Link>
  </main>
);

export default App;

import React from "react";
import { Link, Route } from "wouter";
import TakePicture from "./TakePicture";

const App = () => {
  return (
    <div>
      <p>BankClient</p>
      <h1>Scan your id</h1>
      <p>
        Take a picture. It may take time to validate your personal information.
      </p>
      <Link href="/take-picture">Take Picture</Link>
      <Route path="/take-picture">
        <TakePicture />
      </Route>
    </div>
  );
};

export default App;

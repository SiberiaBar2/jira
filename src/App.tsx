import React from "react";
import { useAuth } from "context/auth-context";

import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import { AuthentIcateApp } from "authenticated-app";
import { UnAuthentIcatedAPP } from "unauthenticated";

import "./App.css";


function App() {
  const {user} = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallBackrender={FullPageErrorFallback}>
        {user ? <AuthentIcateApp/> : <UnAuthentIcatedAPP />}
      </ErrorBoundary>
    </div>
  );
};

export default App;

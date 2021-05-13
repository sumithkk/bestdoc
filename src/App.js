import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Landing from "./components/LandingPage/Landing";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";

const App = () => {
  const { error, showToast } = useSelector((state) => state.app);
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: "65px" }}>
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/auth" />} />
          <Route path="/landing" exact component={Landing} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </div>
      {showToast && error && (
        <Alert
          variant="filled"
          severity="error"
          style={{ position: "absolute", width: "100%", bottom: 0 }}
        >
          {error}
        </Alert>
      )}
    </BrowserRouter>
  );
};

export default App;

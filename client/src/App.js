import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Auth from "./views/Auth/Auth";
import AuthContextProvider from "./contexts/AuthContext/authContext";
import DashBoard from "./views/DashBoard/DashBoard";
import ProtectedRoute from "./components/Routing/ProtectedRoute";
import About from "./views/About/About";
import PostContextProvider from "./contexts/PostContext/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact="/" path="/" component={Landing} />
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Auth {...props} authRoute="register" />}
            />
            <ProtectedRoute exact path="/dashboard" component={DashBoard} />
            <ProtectedRoute exact path="/about" component={About} />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;

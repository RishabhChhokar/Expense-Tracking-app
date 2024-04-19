import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
function App() {

  const authCtx = useContext(AuthContext)
  return (
    <Router>
      <Layout>
        <Routes>
          {authCtx.isLoggedIn && <Route path="/" element={<HomePage />} />}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

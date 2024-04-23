import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ForgetPassword from "./components/Auth/ForgetPassword";
import { BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import { AuthContextProvider } from "./store/auth-context";
import { ExpenseContextProvider } from "./store/ExpenseContext";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <ExpenseContextProvider>
      <AuthContextProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {!authCtx.isLoggedIn && (
                <Route path="/auth" element={<AuthPage />} />
              )}
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Routes>
          </Layout>
        </Router>
      </AuthContextProvider>
    </ExpenseContextProvider>
  );
}

export default App;

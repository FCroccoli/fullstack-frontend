import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UserProvider from "./contexts/UserContext";
import ModalProvider from "./contexts/ModalContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ModalProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="register" element={<RegisterPage />}></Route>
            <Route path="home" element={<DashboardPage />}></Route>
          </Routes>
        </ModalProvider>
      </UserProvider>
    </div>
  );
}

export default App;

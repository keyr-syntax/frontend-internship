import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import ChatPage from "./components/Pages/ChatPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ChatProvider } from "./context/ChatContext";
const App = () => {
  return (
    <ChatProvider>
      <div className="overflow-y-hidden">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </ChatProvider>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/ChatContext";
import HomePage from "./components/Pages/HomePage";
import ChatPage from "./components/Pages/ChatPage";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import Dashboard from "./components/Pages/Dashboard";
import MoodTrackingQuestionsForm from "./components/form/MoodTrackingQuestionsForm";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ChatProvider>
      <div className="overflow-y-hidden">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/mood_tracking"
                element={<MoodTrackingQuestionsForm />}
              />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600">Page not found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </ChatProvider>
  );
}

export default App;

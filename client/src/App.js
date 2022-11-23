import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import LoginPage from "./components/LoginPage";
import About from "./components/About";
import Footer from "./components/Footer";
import Post from "./components/Post";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { useEffect, useState } from "react";

function App() {
  const [userToken, setUserToken] = useState(
    () => JSON.parse(localStorage.getItem("userTokenWeShare")) || []
  );

  return (
    <UserContext.Provider value={[userToken, setUserToken]}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import BlogPage from "./pages/BlogPage"; // Ensure the path is correct
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import WelcomeBanner from "./components/WelcomeBanner";
import ProtectedRoute from "./components/ProtectedRoute"; // To protect routes
import "@fortawesome/fontawesome-free/css/all.min.css";
import { auth } from "./firebase";

const user = auth.currentUser;



function App() {
  
  const DashboardWithBanner = () => (
    <div>
      <WelcomeBanner userName={user?.displayName} />
      <Dashboard />
    </div>
  );
  
  return (
    <Router>
      <Navbar>
		<Routes>
		  <Route path="/" element={<Home />} />
		  <Route path="/login" element={<Login />} />
		  <Route path="/about" element={<About />} />
		  <Route path="/contact" element={<Contact />} />
		  <Route path="/login" element={<Login />} />
		  <Route path="/blogs" element={<BlogPage />} /> {/* Blog Page */}
		  <Route path="/dashboard" element={<DashboardWithBanner />} />
			
		  {/* Protected Routes (Require authentication) */}
		  <Route path="/create-blog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
		  <Route path="/admin-panel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
		</Routes>
	  </Navbar>
    </Router>
  );
}

export default App;

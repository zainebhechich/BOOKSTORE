"use client";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import NewReleases from "./pages/NewReleases";
import BestSellers from "./pages/BestSellers";
import BookDetails from "./components/BookDetails";
import LoginModal from "./components/LoginModal";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./components/Register";
import NotFound from "./pages/NotFound";
import BookList from "./components/BookList";
import UserInfo from "./pages/UserInfo";
import DashboardPage from "./pages/DashboardPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // setUser(decoded);
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/books');
        console.log("Frontend: Response received", response); // Log the raw response
        const data = await response.json();
        console.log("Frontend: Parsed data", data);
        setBooks(data);
      } catch (error) {
        console.error("Frontend: Error fetching books:", error);
        // Handle the error (e.g., set an error state)
      }
    };

    fetchBooks();
  }, []);
  
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToResults = () => {
    setSelectedBook(null);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleAddToCart = (book) => {
    // Add book to cart
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Navbar onLoginClick={toggleLoginModal} />

        {selectedBook ? (
          <div className="container mx-auto px-4 py-8">
            <BookDetails
              book={selectedBook}
              onBack={handleBackToResults}
              onAddToCart={handleAddToCart}
            />
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Home books={books} onBookSelect={handleBookSelect} />}
            />
            <Route
              path="/categories"
              element={<Categories books={books} onBookSelect={handleBookSelect} />}
            />
            <Route
              path="/new-releases"
              element={<NewReleases books={books} onBookSelect={handleBookSelect} />}
            />
            <Route
              path="/best-sellers"
              element={<BestSellers books={books} onBookSelect={handleBookSelect} />}
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="/books" element={<BookList books={books} onBookSelect={(book) => console.log(book)} />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}

        {isLoginModalOpen && <LoginModal onClose={toggleLoginModal} />}
      </div>
    </Router>
  );
}

export default App;

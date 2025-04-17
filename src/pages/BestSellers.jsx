"use client"

import React, { useState, useEffect } from "react"
import { getBooks } from "../api/bookApi"

const BestSellers = ({ books, onBookSelect }) => {
  const [bestSellers, setBestSellers] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBestSellers = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const allBooks = await getBooks()
        const bestSellerBooks = allBooks.filter((book) => book.category === "Best Seller")
        setBestSellers(bestSellerBooks)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBestSellers()
  }, [])

  if (isLoading) {
    return <p>Loading best sellers...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
      {bestSellers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestSellers.map((book) => (
            <div
              key={book._id}
              className="p-4 border rounded shadow hover:shadow-lg transition-shadow"
              onClick={() => onBookSelect(book)}
            >
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No best sellers found.</p>
      )}
    </div>
  )
}

export default BestSellers

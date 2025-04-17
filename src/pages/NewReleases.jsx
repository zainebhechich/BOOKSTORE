"use client"

import React, { useState, useEffect } from "react"
import { getBooks } from "../api/bookApi" // Import getBooks

const NewReleases = ({ books, onBookSelect }) => {
  const [newReleases, setNewReleases] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNewReleases = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const allBooks = await getBooks()
        const newReleaseBooks = allBooks.filter((book) => book.category === "New Release")
        setNewReleases(newReleaseBooks)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNewReleases()
  }, [])

  if (isLoading) {
    return <p>Loading new releases...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">New Releases</h2>
      {newReleases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newReleases.map((book) => (
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
        <p>No new releases found.</p>
      )}
    </div>
  )
}

export default NewReleases

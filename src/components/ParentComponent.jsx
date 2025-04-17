import React from "react";
import BookDetails from "./BookDetails";



const ParentComponent = () => {
  const book = {
    title: "The Great Gatsby",
    description: "A novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.",
    author_name: ["F. Scott Fitzgerald"],
    first_publish_year: 1925,
    language: ["en"],
  };

  return (
    <BookDetails
      book={book}
      onBack={() => console.log("Back to results")}
    />
  );
};


export default ParentComponent;
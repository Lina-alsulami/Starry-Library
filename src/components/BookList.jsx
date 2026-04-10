import React from "react";
import BookCard from "./BookCard";

function BookList({ books, onViewDetails, onEdit, onDelete }) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BookList;

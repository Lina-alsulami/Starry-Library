import React from 'react';

function BookCard({ book, onViewDetails, onEdit, onDelete }) {
  return (
    <div className="book-card" onClick={() => onViewDetails(book)}>
      <h5>{book.title}</h5>
      <p className="author">{book.author}</p>

      <p className="date">📅 {book.date}</p>

      <p className="rating">
        التقييم: {'⭐'.repeat(book.rating)}
      </p>

      <p>
        {book.notes.length > 50 ? book.notes.substring(0, 50) + '...' : book.notes}
      </p>

      <div className="d-flex gap-2 mt-3">
        <button 
          className="btn btn-edit" 
          onClick={(e) => { 
            e.stopPropagation(); 
            onEdit(book); 
          }}
        >
          تعديل
        </button>

        <button 
          className="btn btn-delete" 
          onClick={(e) => { 
            e.stopPropagation(); 
            onDelete(book.id); 
          }}
        >
          حذف
        </button>
      </div>
    </div>
  );
}

export default BookCard;

import React from 'react';

function BookDetails({ isOpen, onClose, book, onEdit, onDelete }) {
  if (!isOpen || !book) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="book-details">
          
          <button className="close-btn" onClick={onClose}>×</button>

          <h3>{book.title}</h3>

          <p><strong>المؤلف:</strong> {book.author}</p>
          <p><strong>التقييم:</strong> {'⭐'.repeat(book.rating)}</p>
          <p><strong>ملاحظات:</strong> {book.notes}</p>
          <p><strong>تاريخ الانتهاء من القراءة:</strong> {book.date}</p>

          <div className="d-flex gap-2 mt-4">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              إغلاق
            </button>

            <button type="button" className="btn btn-edit" onClick={onEdit}>
              تعديل
            </button>

            <button type="button" className="btn btn-delete" onClick={onDelete}>
              حذف
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookDetails;

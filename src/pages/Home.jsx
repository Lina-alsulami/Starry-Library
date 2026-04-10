import React, { useState } from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import BookDetails from '../components/BookDetails';

function Home({ 
  books, 
  isFormOpen, 
  editingBook, 
  addBook, 
  updateBook, 
  deleteBook, 
  openForm, 
  closeForm,
  refresh
}) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedBook(null);
  };

  const handleEdit = () => {
    setIsDetailsOpen(false);
    openForm(selectedBook);
  };

  const handleDelete = () => {
    deleteBook(selectedBook.id);
    setIsDetailsOpen(false);
    setSelectedBook(null);
  };

  // 🔥 أهم تعديل: تحديث القائمة مباشرة بعد الحفظ
  const handleFormSave = () => {
    refresh(); 
  };

  return (
    <div className="home-page">
      <div className="content-wrapper">
        <h1 className="text-center mb-4">books are the mirrors of the Soul</h1>

        <button 
          className="btn btn-primary mb-3" 
          onClick={() => openForm()}
        >
          + إضافة كتاب
        </button>

        {books.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            لا توجد كتب بعد. أضف كتابك الأول!
          </div>
        ) : (
          <BookList 
            books={books} 
            onViewDetails={handleViewDetails}
            onEdit={openForm}
            onDelete={deleteBook}
            refresh={refresh}
          />
        )}

        <BookForm 
          isOpen={isFormOpen}
          onClose={closeForm}
          onSave={handleFormSave}
          bookToEdit={editingBook}
        />

        <BookDetails 
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          book={selectedBook}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Home;

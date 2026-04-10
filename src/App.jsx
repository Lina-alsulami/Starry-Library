import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import { supabase } from "./supabase";

function App() {
  const [books, setBooks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // جلب الكتب من Supabase
  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching books:", error);
    } else {
      setBooks(data);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  // إضافة كتاب
  const addBook = async (book) => {
    const { error } = await supabase.from("books").insert([book]);
    if (error) {
      console.error(error);
      alert("حدث خطأ أثناء إضافة الكتاب");
      return;
    }
    setRefresh(!refresh);
    setIsFormOpen(false);
  };

  // تحديث كتاب
  const updateBook = async (updatedBook) => {
    const { error } = await supabase
      .from("books")
      .update(updatedBook)
      .eq("id", updatedBook.id);

    if (error) {
      console.error(error);
      alert("حدث خطأ أثناء تحديث الكتاب");
      return;
    }

    setRefresh(!refresh);
    setIsFormOpen(false);
    setEditingBook(null);
  };

  // حذف كتاب
  const deleteBook = async (id) => {
    const { error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("حدث خطأ أثناء حذف الكتاب");
      return;
    }

    setRefresh(!refresh);
  };

  const openForm = (book = null) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingBook(null);
  };

  return (
    <div dir="rtl">
      <Home
        books={books}
        isFormOpen={isFormOpen}
        editingBook={editingBook}
        addBook={addBook}
        updateBook={updateBook}
        deleteBook={deleteBook}
        openForm={openForm}
        closeForm={closeForm}

        // ⭐ أهم تعديل: إرسال دالة refresh بدل القيمة
        refresh={() => setRefresh(!refresh)}
      />
    </div>
  );
}

export default App;

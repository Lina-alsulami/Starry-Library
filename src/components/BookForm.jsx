import React, { useState, useEffect } from 'react';
import { supabase } from "../supabase";

function BookForm({ isOpen, onClose, onSave, bookToEdit }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    rating: 1,
    notes: '',
    date: ''
  });

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || '',
        author: bookToEdit.author || '',
        rating: bookToEdit.rating || 1,
        notes: bookToEdit.notes || '',
        date: bookToEdit.date || ''
      });
    } else {
      setFormData({
        title: '',
        author: '',
        rating: 1,
        notes: '',
        date: ''
      });
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title: formData.title,
      author: formData.author,
      rating: Number(formData.rating),
      notes: formData.notes,
      date: formData.date || new Date().toISOString().split("T")[0]
    };

    let result;

    if (bookToEdit) {
      // تحديث كتاب
      result = await supabase
        .from("books")
        .update(bookData)
        .eq("id", bookToEdit.id)
        .select();
    } else {
      // إضافة كتاب جديد
      result = await supabase
        .from("books")
        .insert([bookData])
        .select();
    }

    if (result.error) {
      console.error(result.error);
      alert("حدث خطأ أثناء حفظ البيانات");
      return;
    }

    // إرسال الكتاب الجديد أو المعدل إلى Home.jsx
    onSave(result.data[0]);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-page">
      <div className="torn-paper">

        <div className="paper-header">
          <h2>{bookToEdit ? 'تعديل كتاب' : 'إضافة كتاب'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">اسم الكتاب</label>
            <input 
              type="text" 
              className="form-control" 
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="author" className="form-label">المؤلف</label>
            <input 
              type="text" 
              className="form-control" 
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label">التقييم (1-5)</label>
            <input 
              type="number" 
              className="form-control" 
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="notes" className="form-label">ملاحظات عن الكتاب</label>
            <textarea 
              className="form-control" 
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">تاريخ الانتهاء من القراءة</label>
            <input 
              type="date" 
              className="form-control" 
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            {bookToEdit ? 'تحديث' : 'حفظ'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default BookForm;

# Kutubxona Boshqaruv Tizimi API Hujjati / Library Management System API Documentation

## Modellar / Models

### Kitob / Book
```json
{
  "id": "uuid",                    // Kitob uchun unikal ID / Unique identifier for the book
  "image": "string",               // Kitobning muqova rasmi URL manzili / URL of the book cover image
  "title": "string",               // Kitob nomi / Title of the book
  "author": "string",              // Kitob muallifi / Author of the book
  "publication_year": "integer",   // Nashr yili / Year of publication
  "language": "string",            // Kitob tili / Language of the book
  "keywords": ["string"],          // Kitobga tegishli kalit so'zlar / Keywords related to the book
  "description": "string",         // Kitobning qisqacha tavsifi / Brief description or summary of the book
  "book_status": "string",         // Kitob holati: mavjud, qarzga olingan, yo'qolgan, shikastlangan / 
                                   // Status of the book: available, loaned, lost, damaged
  "readed_count": "integer",       // Kitob o'qilgan soni / Number of times the book has been read
  "missing_books": "integer",      // Yo'qolgan kitoblar soni / Number of lost copies (if applicable)
  "loaned_date": "timestamp",      // Qarzga berilgan sana / Date the book was loaned out
  "due_date": "timestamp",         // Qaytarish muddati / Due date for return
  "returned_date": "timestamp"     // Qaytarilgan sana / Date the book was returned
}
```

### Foydalanuvchi / User
```json
{
  "id": "uuid",                    // Foydalanuvchi uchun unikal ID / Unique identifier for the user
  "first_name": "string",          // Foydalanuvchining ismi / User's first name
  "last_name": "string",           // Foydalanuvchining familiyasi / User's last name
  "phone": "string",               // Foydalanuvchining telefon raqami yoki emaili / User's phone number or email
  "password": "string",            // Foydalanuvchining paroli (hashed) / User's hashed password
  "gender": "string"               // Foydalanuvchining jinsi / User's gender
}
```

### Qarz Olish Faoliyati / Borrowing Activity
```json
{
  "id": "uuid",                    // Qarz olish faoliyati uchun unikal ID / Unique identifier for borrowing activity
  "user_id": "uuid",               // Qarzga olgan foydalanuvchi ID-si / ID of the user who borrowed
  "book_id": "uuid",               // Qarzga olingan kitobning ID-si / ID of the borrowed book
  "borrow_date": "timestamp",      // Qarz olish sanasi / Date of borrowing
  "return_date": "timestamp",      // Qaytarilgan sana (null bo'lishi mumkin) / Date of return (can be null)
  "status": "string"               // Qarz olish holati: Qaytarildi, O'z vaqtida, Kechikdi / 
                                   // Status of borrowing: Returned, On time, Overdue
}
```

---

## Endpoints

### Kitob / Book
- **GET /books/get**: Barcha kitoblarni olish / Get all books
- **GET /books/get/:id**: ID bo‘yicha kitobni olish / Get a book by ID
- **GET /books/get/(query)**: So‘rov bo‘yicha kitoblarni olish / Get books by query
- **POST /books/add**: Yangi kitob qo‘shish / Add a new book
- **PUT /books/update/:id**: Kitobni yangilash / Update a book by ID
- **DELETE /books/delete/:id**: ID bo‘yicha kitobni o‘chirish / Delete a book by ID
- **DELETE /books/delete**: Barcha kitoblarni o‘chirish / Delete all books

### Foydalanuvchi / User
- **GET /users/get**: Barcha foydalanuvchilarni olish / Get all users
- **GET /users/get/:id**: ID bo‘yicha foydalanuvchini olish / Get a user by ID
- **GET /users/get/(query)**: So‘rov bo‘yicha foydalanuvchilarni olish / Get users by query
- **POST /users/signup**: Ro‘yxatdan o‘tish / User registration
- **GET /users/signin**: Kirish / User login
- **PUT /users/update/:id**: Foydalanuvchini yangilash / Update a user by ID
- **DELETE /users/delete/:id**: ID bo‘yicha foydalanuvchini o‘chirish / Delete a user by ID
- **DELETE /users/delete**: Barcha foydalanuvchilarni o‘chirish / Delete all users

### Analitika / Analytics
- **GET /analytics/overall-stats**: Umumiy statistika / Overall statistics
- **GET /analytics/popular-books**: Mashhur kitoblar / Popular books
- **GET /analytics/user-activity?query**: Foydalanuvchi faolligi / User activity
- **GET /analytics/book/:id**: ID bo‘yicha kitob statistikasi / Book statistics by ID
- **GET /analytics/available-books**: Mavjud kitoblar / Available books
- **POST /analytics/user-action**: Foydalanuvchi harakati / Record a user action
- **PUT /analytics/book/:id**: Kitob analitikasini yangilash / Update book analytics
- **DELETE /analytics/user-actions/:id**: ID bo‘yicha foydalanuvchi harakatini o‘chirish / Delete user action by ID
- **DELETE /analytics/old-data?query**: Eski ma'lumotlarni o'chirish (so'rov asosida) / Delete old data (by query)

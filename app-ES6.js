class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // add book
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete"><i class="far fa-times-circle"></i></a></td>
    `;

    list.appendChild(row);
  }

  // Show alert
  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    // Gett parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.getElementById('book-form');
    // Insert alert
    container.insertBefore(div, form);

    // time out after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  // delete book
  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  // Clear Fields
  clearFields() {
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-isbn').value = '';
  }
}

// Local Storage
class Store {
  static getBookFromLocalStorage() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBook() {
    const books = Store.getBookFromLocalStorage();

    books.forEach((book) => {
      const ui = new UI();

      // add book
      ui.addBookToList(book);
    })
  }

  static addBookToLocalStorage(book) {
    const books = Store.getBookFromLocalStorage();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBookFromLocalStorage();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
      localStorage.setItem('books', JSON.stringify(books));
    })
    
  }
  
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBook);

// Event Listener
document.getElementById('book-form').addEventListener('submit', (e) => {
  // Get form values
  const titleValue = document.getElementById('book-title').value;
  const authorValue= document.getElementById('book-author').value;
  const isbnValue = document.getElementById('book-isbn').value;

  // instantiate Book
  const book = new Book(titleValue, authorValue, isbnValue);

  // instantiate UI
  const ui = new UI();

  if (titleValue === '' || authorValue === '' || isbnValue === '') {

    // Error alert
    ui.showAlert('Please fill in all fileds.', 'error');

  } else {
    
    ui.showAlert('Book added.', 'success');

    // Add book to list
    ui.addBookToList(book);

    // add to local storage
    Store.addBookToLocalStorage(book);
  
    // Clear Fields
    ui.clearFields();

  }
 
  e.preventDefault()
});

// Event for delete
document.getElementById('book-list').addEventListener('click', (e) => {

  const ui = new UI();

  // delete book
  ui.deleteBook(e.target.parentElement);

  // remove from local storage
  Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);

  // Show alert
  ui.showAlert('Book deleted.', 'success');

  e.preventDefault();
})
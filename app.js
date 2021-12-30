//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Contructor
function UI() {}

// Add to list
UI.prototype.addBookToList = function(book) {
  
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

// Clear Fields
UI.prototype.clearFields = function(book) {
  document.getElementById('book-title').value = '';
  document.getElementById('book-author').value = '';
  document.getElementById('book-isbn').value = '';
}
// Show alert
UI.prototype.showAlert = function(message, className) {
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

//Delete
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Event Listener
document.getElementById('book-form').addEventListener('submit', function(e) {
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
  
    // Clear Fields
    ui.clearFields();

  }
 
  e.preventDefault()
});

// Event for delete
document.getElementById('book-list').addEventListener('click', function(e) {

  const ui = new UI();

  ui.deleteBook(e.target.parentElement);

  // Show alert
  ui.showAlert('Book deleted.', 'success');

  e.preventDefault();
})

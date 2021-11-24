let myLibrary = [];

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

function addBookToLibrary(title, author, numberOfPages, read = false) {
  const bookToAdd = new Book(title, author, numberOfPages, read);
  myLibrary.push(bookToAdd);
}

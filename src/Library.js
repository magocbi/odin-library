const myLibrary = (function createLibrary() {
  let library = [];

  function addBook(book) {
    library.push(book);
  }

  function removeBook(indexToRemove) {
    library = library.filter((book, index) => index !== indexToRemove);
  }

  function getBooks() {
    return library.slice();
  }

  function toggleRead(index) {
    library[index].toggleRead();
  }

  function empty() {
    library = [];
  }

  return { addBook, removeBook, toggleRead, getBooks, empty };
})();

export default myLibrary;

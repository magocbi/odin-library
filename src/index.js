const books = [
  {
    id: 1,
    title: 'Modern Buildings',
    author: 'Ardi Evans',
    pages: 206,
    urlImage:
      'https://images.unsplash.com/photo-1615347497551-277d6616b959?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=692&q=80',
  },
  {
    id: 2,
    title: 'Busy City Life',
    author: 'Lerone Pieters',
    pages: 307,
    urlImage:
      'https://images.unsplash.com/photo-1615346340977-cf7f5a8f3059?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 3,
    title: 'Sweets and Cakes',
    author: 'Uliana Kopanytsia',
    pages: 119,
    urlImage:
      'https://images.unsplash.com/photo-1615351897596-d3a9fffb5797?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=665&q=80',
  },
  {
    id: 4,
    title: 'Vast Deserts',
    author: 'Riccardo Andolfo',
    pages: 123,
    urlImage:
      'https://images.unsplash.com/photo-1615333619365-a44d7e655661?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: 5,
    title: 'Parkour',
    author: 'Miguel Arguibide',
    pages: 56,
    urlImage:
      'https://images.unsplash.com/photo-1615286505008-cbca9896192f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=962&q=80',
  },
  {
    id: 6,
    title: 'Cute Kitties',
    author: 'Tran Mau Tri Tam',
    pages: 489,
    urlImage:
      'https://images.unsplash.com/photo-1615369794017-f65e6f0c0393?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: 7,
    title: 'Beahces',
    author: 'Josh Hemsley',
    pages: 99,
    urlImage:
      'https://images.unsplash.com/photo-1615357633073-a7b67638dedb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80',
  },
  {
    id: 8,
    title: 'Tides',
    author: 'Carlos Mesa',
    pages: 74,
    urlImage:
      'https://images.unsplash.com/photo-1615185054269-363482a365ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=809&q=80',
  },
  {
    id: 9,
    title: 'Magnificent Forests',
    author: 'Kellen Riggin',
    pages: 35,
    urlImage:
      'https://images.unsplash.com/photo-1615331224984-281512856592?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: 10,
    title: 'Butterflies',
    author: 'Navi Photography',
    pages: 358,
    urlImage:
      'https://images.unsplash.com/photo-1615300236079-4bdb43bd9a9a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
  },
];

const DEFAULT_BOOK_IMG = '/images/book-img.svg';

let myLibrary = [];

function Book(title, author, numberOfPages, read, img) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
  this.img = img;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(
  title,
  author,
  numberOfPages,
  read = false,
  img = DEFAULT_BOOK_IMG
) {
  const bookToAdd = new Book(title, author, numberOfPages, read, img);
  myLibrary.push(bookToAdd);
}

function removeBookFromLibrary(indexToRemove) {
  myLibrary = myLibrary.filter((book, index) => index !== indexToRemove);
}

function toggleReadBook(index) {
  myLibrary[index].toggleRead();
}

function createBookCard(index, { title, author, numberOfPages, read, img }) {
  const bookCard = document.createElement('li');
  const removeBtn = document.createElement('button');
  const removeIcon = document.createElement('span');
  const imgContainer = document.createElement('div');
  const image = document.createElement('img');
  const bookInfo = document.createElement('div');
  const bookTitle = document.createElement('h2');
  const bookAuthor = document.createElement('h3');
  const pages = document.createElement('div');
  const pagesLabel = document.createElement('h4');
  const pagesNumber = document.createElement('p');
  const readButton = document.createElement('button');

  bookCard.dataset.key = index;
  bookCard.classList.add('book-card');
  if (read) {
    bookCard.classList.add('read');
  }
  removeBtn.classList.add('remove-btn');
  removeIcon.classList.add('material-icons-outlined');
  removeIcon.classList.add('material-icons');
  removeIcon.textContent = 'cancel';
  imgContainer.classList.add('img-container');
  image.src = img;
  bookInfo.classList.add('book-info');
  bookTitle.classList.add('title');
  bookTitle.textContent = title;
  bookAuthor.classList.add('author');
  bookAuthor.textContent = `by ${author}`;
  pages.classList.add('pages');
  pagesLabel.textContent = 'Pages:';
  pagesNumber.textContent = numberOfPages;
  readButton.classList.add('btn-toggle-read');
  readButton.textContent = read ? 'READ' : 'UNREAD';

  pages.append(pagesLabel, pagesNumber);
  bookInfo.append(bookTitle, bookAuthor, pages);
  imgContainer.append(image);
  removeBtn.append(removeIcon);
  bookCard.append(removeBtn, imgContainer, bookInfo, readButton);

  return bookCard;
}

const libraryElem = document.querySelector('.library');
const modalContainer = document.querySelector('.modal-container');
const openModalBtn = document.querySelector('.btn-add');
const bookForm = modalContainer.querySelector('.modal-form');

function populateLibrary() {
  const cardList = myLibrary.map((book, index) => createBookCard(index, book));
  libraryElem.innerHTML = '';
  libraryElem.append(...cardList);
}

function addPresetBooks() {
  books.forEach(({ title, author, pages, urlImage }) =>
    addBookToLibrary(title, author, pages, true, urlImage)
  );
}

function closeModal() {
  modalContainer.classList.add('closed');
  bookForm.removeEventListener('submit', handleAddBook);
}
function handleAddBook(e) {
  e.preventDefault();
  const title = bookForm.elements.title.value;
  const author = bookForm.elements.author.value;
  const pages = bookForm.elements.pages.value;
  const url = bookForm.elements.url.value;
  const read = bookForm.elements.read.checked;
  if (url.trim()) {
    addBookToLibrary(title, author, pages, read, url);
  } else {
    addBookToLibrary(title, author, pages, read);
  }
  closeModal();
  populateLibrary();
}

function handleCloseModalContainer(e) {
  e.stopPropagation();
  if (!e.target.classList.contains('modal-container')) return;
  closeModal();
}

function handleOpenModal() {
  modalContainer.classList.remove('closed');
  bookForm.addEventListener('submit', handleAddBook);
}

function handleLibraryClick(e) {
  const removeBtn = e.target.closest('.remove-btn');
  const readToggleBtn = e.target.closest('.btn-toggle-read');
  if (!removeBtn && !readToggleBtn) return;

  if (removeBtn) {
    const index = removeBtn.closest('.book-card[data-key]').dataset.key;
    removeBookFromLibrary(parseInt(index));
  }

  if (readToggleBtn) {
    const index = readToggleBtn.closest('.book-card[data-key]').dataset.key;
    toggleReadBook(index);
  }
  populateLibrary();
}

window.addEventListener('DOMContentLoaded', () => {
  addPresetBooks();
  populateLibrary();
});

openModalBtn.addEventListener('click', handleOpenModal);
modalContainer.addEventListener('click', handleCloseModalContainer);
libraryElem.addEventListener('click', handleLibraryClick);

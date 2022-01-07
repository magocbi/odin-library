import DEFAULT_BOOK_IMG from '../images/book-img.svg';
import Book from './Book';
import myLibrary from './Library';
import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config';
import {
  getProfilePicUrl,
  getUserId,
  getUserName,
  initFireBaseAuth,
  signInUser,
  signOutUser,
} from './Auth';
import {
  getLibrary,
  listenLibraryUpdates,
  removeBookAtLibrary,
  storeBookAtLibrary,
  unsubscribeLibraryUpdates,
  updateBookReadStatus,
} from './Store';

function addBookToLibrary(
  title,
  author,
  numberOfPages,
  read = false,
  img = DEFAULT_BOOK_IMG
) {
  const bookToAdd = new Book(title, author, numberOfPages, read, img);
  // myLibrary.addBook(bookToAdd);
  storeBookAtLibrary(getUserId(), {
    title,
    author,
    numberOfPages,
    read,
    img,
  });
}

// UI logic

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
const openModalBtn = document.querySelector('#open-form-btn');
const bookForm = modalContainer.querySelector('.modal-form');
const signInBtn = document.querySelector('#sign-in');
const signOutBtn = document.querySelector('#sign-out');
const userPicElem = document.querySelector('#user-pic');
const userNameElem = document.querySelector('#user-name');

// Display library in cards
function populateLibrary() {
  const cardList = myLibrary
    .getBooks()
    .map((book, index) => createBookCard(index, book));
  libraryElem.innerHTML = '';
  libraryElem.append(...cardList);
}

// Event Handlers
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

function handleCloseModal(e) {
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
    const { title, author, numberOfPages, read, img } = myLibrary
      .getBooks()
      .find((book, i) => i === parseInt(index));

    // myLibrary.removeBook(parseInt(index));
    removeBookAtLibrary(getUserId(), {
      title,
      author,
      numberOfPages,
      read,
      img,
    });
  }

  if (readToggleBtn) {
    const index = readToggleBtn.closest('.book-card[data-key]').dataset.key;
    myLibrary.toggleRead(index);
    const bookList = myLibrary
      .getBooks()
      .map(({ toggleRead, ...book }) => ({ ...book }));
    updateBookReadStatus(getUserId(), bookList);
  }
}

function onLibraryUpdates(updatedLibrary) {
  myLibrary.empty();
  updatedLibrary.forEach(({ title, author, numberOfPages, read, img }) => {
    const bookToAdd = new Book(title, author, numberOfPages, read, img);
    myLibrary.addBook(bookToAdd);
  });
  populateLibrary();
}

function onAuthStateChange(user) {
  if (user) {
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    userPicElem.style.backgroundImage = `url(${profilePicUrl})`;
    userNameElem.textContent = userName;

    userNameElem.removeAttribute('hidden');
    userPicElem.removeAttribute('hidden');
    signOutBtn.removeAttribute('hidden');
    openModalBtn.removeAttribute('disabled');

    signInBtn.setAttribute('hidden', 'true');
    const libraryResponse = getLibrary(getUserId());
    libraryResponse.then((bookList) => {
      bookList.forEach(({ title, author, numberOfPages, read, img }) => {
        const bookToAdd = new Book(title, author, numberOfPages, read, img);
        myLibrary.addBook(bookToAdd);
      });

      listenLibraryUpdates(getUserId(), onLibraryUpdates);
    });
  } else {
    userNameElem.setAttribute('hidden', 'true');
    userPicElem.setAttribute('hidden', 'true');
    signOutBtn.setAttribute('hidden', 'true');
    signInBtn.removeAttribute('hidden');
    openModalBtn.setAttribute('disabled', 'true');
    unsubscribeLibraryUpdates();
    myLibrary.empty();
    populateLibrary();
  }
}

// Event Listeners

window.addEventListener('DOMContentLoaded', () => {
  // display books
  populateLibrary();
});

openModalBtn.addEventListener('click', handleOpenModal);
modalContainer.addEventListener('click', handleCloseModal);
libraryElem.addEventListener('click', handleLibraryClick);
signInBtn.addEventListener('click', signInUser);
signOutBtn.addEventListener('click', signOutUser);

const firebaseAppConfig = getFirebaseConfig();

initializeApp(firebaseAppConfig);

initFireBaseAuth(onAuthStateChange);

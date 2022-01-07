class Book {
  constructor(title, author, numberOfPages, read, img) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
    this.img = img;
  }
  toggleRead = function () {
    this.read = !this.read;
  };
}

export default Book;

let myLibrary = [
  {
    id: 1,
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 4100,
    read: true,
  },
  {
    id: 2,
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    pages: 1008,
    read: false,
  },
  {
    id: 3,
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien ",
    pages: 1168,
    read: true,
  },
  {
    id: 4,
    title: "And Then There were None",
    author: "Agatha Christie",
    pages: 272,
    read: false,
  },
  {
    id: 5,
    title: "Alice's Adventure in Wonderland",
    author: "Lewis Carroll",
    pages: 300,
    read: true,
  },
  {
    id: 6,
    title: "The Lion, The Witch and the Wardrobe",
    author: "C.S. Lewis",
    pages: 2000,
    read: true,
  },
  {
    id: 7,
    title: "Pinocchio",
    author: "Carlo Collodi",
    pages: 1050,
    read: true,
  },
  {
    id: 8,
    title: "Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 790,
    read: false,
  },
  {
    id: 9,
    title: "Diary of a Young girl",
    author: "Anne Frank",
    pages: 318,
    read: true,
  },
  {
    id: 10,
    title: "Gulliver's Travel",
    author: "Jonathan Swift",
    pages: 306,
    read: true,
  },
];

//constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

//selections
const container = document.querySelector(".book-container");
const newBookBtn = document.querySelector(".new-btn");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submit-btn");
const bookForm = document.querySelector(".form-modal");
const form = document.querySelector(".form");
const input = document.querySelectorAll(".form-input");
const msg = document.querySelector(".msg");

//add books
function addBookToLibrary(book) {
  book.id = myLibrary.length + 1;
  myLibrary.push(book);
  // console.log(myLibrary)
}

//display books
function displayBooks(myLibrary) {
  const library = myLibrary
    .map((book, ind) => {
      const { id, title, author, pages, read } = book;

      return `
      <article class="book-info">
    <p>${ind + 1}.</p>
          <p>${title}</p>
          <p>${author}</p>
          <p>${pages}</p>
          <p>${
            read ? "yes" : "no"
          } <button class="edit-btn" data-id="${id}"><i class="fas fa-edit"></i></button></p>
          <button class="remove-btn" data-id="${id}"><i class="fas fa-trash"></i></button>
          </article>`;
    })
    .join("");
  container.innerHTML = `<article class="book-info">
          <p></p>
          <h4>Title</h4>
          <h4>author</h4>
          <h4>pages</h4>
          <h4>read?</h4>
          <h4>remove?</h4>
        </article>
        ${library}`;
}

//open form
newBookBtn.addEventListener("click", () => {
  msg.innerText = " ";
  bookForm.classList.add("show");
});

//close form
closeBtn.addEventListener("click", () => {
  bookForm.classList.remove("show");
});

//submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let values = [...input];
  values = values.map((item) => item.value);
  console.log(values);
  const empty = values.find((value) => value === " ");

  if (!empty) {
    const book = new Book(...values);
    addBookToLibrary(book);
    console.log(book);
    console.log("library", myLibrary);

    displayBooks(myLibrary);
    msg.classList.remove("error");
    msg.innerText = `Book added!`;
  } else {
    msg.classList.add("error");
    msg.innerText = "Please fill all values";
  }
  input.forEach((inp) => (inp.value = ""));
});

console.log(myLibrary);
// displayBooks(myLibrary);

//remove books
container.addEventListener("click", function (e) {
  const element = e.target.parentElement;
  if (element.classList.contains("remove-btn")) {
    const id = parseInt(element.dataset.id);
    console.log(id);
    myLibrary = myLibrary.filter((book) => {
      console.log(id, book.id);
      return book.id !== id;
    });
    displayBooks(myLibrary);
  }
});

//edit read status
container.addEventListener("click", function (e) {
  const element = e.target.parentElement;
  if (element.classList.contains("edit-btn")) {
    const id = parseInt(element.dataset.id);
    // const book= myLibrary.find((book)=> book.id===id)
    myLibrary.forEach((book) => {
      if (book.id === id) {
        book.read = !book.read;
      }
    });
    displayBooks(myLibrary);
  }
});

displayBooks(myLibrary);

// Book.prototype.info = function () {
//   container.innerHTML = `<article class="book-info">
//           <p class="book-title">${this.title}</p>
//           <p>${this.author}</p>
//           <p>${this.pages} pages</p>
//           <p>${this.read ? "yes" : "not yet"}</p>
//         </article> `;
// };

// const book = new Book("harry potter", "jj", "1200", false);

// book.info();
// addBookToLibrary(book);

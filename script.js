let myLibrary = [];

// Books constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}
// Adding(pushing) the book to the library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Removing(splicing) the book from library
function removeBook(i) {
  myLibrary.splice(i, 1);
}

// The Modal Form section
const formBtn = document.querySelector('#formBtn'); //the new book btn that opens the form/modal
const modal = document.querySelector('#myModal');
const span = document.querySelector('.close');
const form = document.querySelector('.form');
formBtn.addEventListener('click', () => (modal.style.display = 'block'));
// If clicked the X it will close the form modal
span.addEventListener('click', () => (modal.style.display = 'none'));
// If clicked anywhere other than the form modal it will close the form/modal
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};
// The button in the form  for adding the new book
const addBookBtn = document.querySelector('#addBtn');

// The elements of the inputs in the add book form/modal
const title = document.querySelector('#bookTitle');
const author = document.querySelector('#bookAuthor');
const pages = document.querySelector('#bookPages');
const read = document.querySelector('#bookRead');

//Adding EventListener to the add book button,
//when it's clicked the value of the input feilds that I selected apove
//get used to creat a new Book opject using the constructor and pushed in the myLibrary array.
//After creating the new opject it empty the input feilds by seeting there value to empty string ''.
//then it calls the 2 functions empty() to empty the books section to be filled with the newly updated myLibrary array using
// the showBooks() function.
addBookBtn.addEventListener('click', () => {
  if (form.checkValidity()) {
    addBookToLibrary(
      new Book(title.value, author.value, pages.value, read.checked)
    );
    showBooks();
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = '';
    modal.style.display = 'none';
    empty();
    showBooks();
  } else {
    if (title.validity.valueMissing) {
      titleError.innerText = 'You need to enter a book title.';
      titleError.className = 'error active';
    }
    if (author.validity.valueMissing) {
      authorError.innerText = 'You need to enter a book author.';
      authorError.className = 'error active';
    }
    if (pages.validity.valueMissing) {
      pagesError.innerText = 'You need to enter number of pages.';
      pagesError.className = 'error active';
    }
  }
});

// This function emptys the cards section to be ready to display the newly updated array
function empty() {
  const cards = document.querySelector('#books');
  cards.innerHTML = '';
}

// The showBook() function starts by looping through all the opjects in the array
// and creating an element for each property in the opject, then it assigns that prop value in it's element
// that it will eventually append to the book card div
function showBooks() {
  localStorage.setItem('books', JSON.stringify(myLibrary));
  for (let i = 0; i < myLibrary.length; i++) {
    const books = document.querySelector('#books');
    const div = document.createElement('div');

    const title = document.createElement('h3');
    const author = document.createElement('h3');
    const pages = document.createElement('h3');
    const read = document.createElement('h3');
    const remove = document.createElement('button');
    const readChange = document.createElement('button');
    title.textContent = 'Title: ' + myLibrary[i].title;
    author.textContent = 'Author: ' + myLibrary[i].author;
    pages.textContent = 'Pages: ' + myLibrary[i].pages;
    remove.textContent = 'Remove';
    remove.className = 'removeBtn';
    readChange.textContent = 'Read';

    // Here it checks if the read prop in the opject is true or not
    // to decide whether to show in the book card that it's read or unread.
    if (myLibrary[i].read) {
      read.textContent = 'Read? Yes😃';
    } else {
      read.textContent = 'Read? No😢';
    }
    // Here it changs the class of the read/not-read btn based on the prop value
    if (myLibrary[i].read) {
      readChange.classList = 'read';
    } else {
      readChange.classList = 'not-read';
    }

    // Append the created elemnts that are filled with prop values to the div element
    div.append(title, author, pages, read, remove, readChange);
    // Add this class to all the created book cards
    div.className = 'book-card';
    // Assigns dataset to all the created book cards based on their index in the array
    div.dataset.index = i;

    //appends the book card to the main div that has all the book cards
    books.appendChild(div);

    // Adding EventListener on the remove btn that when it's clicked
    // It grabs the dataset of the clicked targed, then it uses
    // that dataset which is linked to the array index to remove it using splice()
    remove.addEventListener('click', (e) => {
      x = e.target.parentElement.getAttribute('data-index');
      myLibrary.splice(x, 1);
      // I calls the empty() function to empty all the cards before showing the newley updated array after removing an object
      empty();
      // Then it calls showBooks() to display the updated array
      showBooks();
    });

    // Adding EventListener on the btn that changes the read status of a book
    // and it adds a class to it based on the read status of the book
    readChange.addEventListener('click', (e) => {
      if (myLibrary[i].read) {
        myLibrary[i].read = false;
        myLibrary[i].className = 'not-read';
        empty();
        showBooks();
      } else if (!myLibrary[i].read) {
        myLibrary[i].read = true;
        myLibrary[i].className = 'read';
        empty();
        showBooks();
      }
    });
  }
}

showBooks();

// FORM VALIDATION

const titleError = document.querySelector('#titleError');
const authorError = document.querySelector('#authorError');
const pagesError = document.querySelector('#pagesError');

title.addEventListener('input', () => {
  if (title.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    titleError.innerText = ''; // Reset the content of the message
    titleError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    if (title.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      titleError.innerText = 'You need to enter a book title.';
      titleError.className = 'error active';
    }
  }
});

author.addEventListener('input', () => {
  if (author.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    authorError.innerText = ''; // Reset the content of the message
    authorError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    if (author.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      authorError.innerText = 'You need to enter a book author.';
      authorError.className = 'error active';
    }
  }
});

pages.addEventListener('input', () => {
  if (pages.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    pagesError.innerText = ''; // Reset the content of the message
    pagesError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    if (pages.validity.valueMissing) {
      // If the field is empty,
      // display the following error message.
      pagesError.innerText = 'You need to enter number of pages.';
      pagesError.className = 'error active';
    }
  }
});

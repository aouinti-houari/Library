const myLibrary = [];

function checkBook(value) {
    const read = document.createElement("div");
    read.classList.add("btn", "book-state");
    if (value) {
        read.classList.add("read");
        read.innerText = "Read";
    } else {
        read.classList.add("not-read");
        read.innerText = "Not read";
    }
    return read;
}

function Book(bookTitle, authorName, numberPages, checkbox) {
    const book = {
        "id": myLibrary.length,
        "title": bookTitle.value,
        "author": authorName.value,
        "pages": numberPages.value,
        "read": checkbox.checked
    }
    myLibrary.push(book);
}

function addBookToLibrary() {
    booksList.innerHTML = "";
    for (const element of myLibrary) {
        const book = document.createElement("div");
        book.dataset.bookId = element.id;
        book.classList.add("book");
        for (const key in element) {
            if (key !== "id") {
                let div = document.createElement("div");
                if (key !== "read") {
                    div.classList.add(key);
                    div.innerText = element[key];
                    if (key === "pages") div.innerText += " pages";
                } else {
                    div.appendChild(checkBook(element[key]));
                }
                book.appendChild(div);
            }
        }
        const remove = document.createElement("div");
        remove.innerText = "Remove";
        remove.classList.add("btn", "remove");
        book.appendChild(remove);
        booksList.appendChild(book);
    }
}

function clean() {
    booksBox.classList.toggle("hide");
    bookTitle.value = "";
    authorName.value = "";
    numberPages.value = "";
    checkbox.checked = false;
}

const addButton = document.querySelector("[data-add-book]");
const booksBox = document.querySelector("[data-books-box]");
const bookTitle = document.querySelector("[data-book-title]");
const authorName = document.querySelector("[data-author-name]");
const numberPages = document.querySelector("[data-number-pages]");
const checkbox = document.querySelector("#checkbox");
const booksList = document.querySelector("[data-books]");
const confirm = document.querySelector(".confirm");
const cancel = document.querySelector(".cancel");

addButton.addEventListener("click", function () {
    booksBox.classList.toggle("hide");
})

confirm.addEventListener("click", () => {
    if (!bookTitle.value.trim() || !authorName.value.trim() || !numberPages.value.trim()) return;
    let newBook = new Book(bookTitle, authorName, numberPages, checkbox);
    addBookToLibrary();
    clean();
});

cancel.addEventListener("click", clean);

booksList.addEventListener("click", function (event) {
    if (event.target.classList.contains('book-state')) {
        event.target.classList.toggle("read");
        event.target.classList.toggle("not-read");
        if (event.target.classList.contains("read")) {
            event.target.innerText = "Read";
        } else {
            event.target.innerText = "Not read";
        }
    } else if (event.target.classList.contains('remove')) {
        const bookDiv = event.target.parentElement;
        const bookId = bookDiv.dataset.bookId;
        myLibrary.splice(myLibrary.findIndex(book => book.id.toString() === bookId), 1);
        addBookToLibrary();
    }
});

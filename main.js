// {
//     id: string | number,
//     title: string,
//     author: string,
//     year: number,
//     isComplete: boolean,
// }

const books = [];
const RENDER_EVENT = "render-book";

document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");
    submitForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addBook();
    });
    if (isStorageExist()) {
      loadDataFromStorage();
    }
});

function addBook(){
    const bookTitle = document.getElementById("inputBookTitle");
    const writer = document.getElementById("inputBookAuthor");
    const bookYear = document.getElementById("inputBookYear");

    const generatedID = generateid();
    const bookObject = generateBookObject(
        generatedID,
        bookTitle,
        writer,
        bookYear,
        false
    );
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    alert(`Data buku berhasil ditambahkan!`)
}
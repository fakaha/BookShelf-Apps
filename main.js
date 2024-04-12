// {
//     id: string | number,
//     title: string,
//     author: string,
//     year: number,
//     isComplete: boolean,
// }

const books = [];
const NGERENDER_EVENT = "render-book";

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

    document.dispatchEvent(new Event(NGERENDER_EVENT));
    alert(`Data buku berhasil ditambahkan!`)
}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete){
  return{
    id, 
    title, 
    author, 
    year, 
    isComplete
  };
}

document.addEventListener(NGERENDER_EVENT, function(){
  console.log(books);

  const uncompletedBooksList = document.getElementById('incompleteBookshelfList');
  incompleteBookshelfList = '';

  const completedBooksList = document.getElementById('completeBookshelfList');
  completedBooksList = '';

  for(const book of books){
    const makeBook = makeBookShelf(book);

    if(makeBook.isComplete === true){
      completedBooksList.append(makeBook);
    }else{
      uncompletedBooksList.append(makeBook);
    }
  }

})

function makeBookShelf(bookObject){
// <article class="book_item">
//  <h3>Book Title</h3>
//  <p>Penulis: John Doe</p>
//  <p>Tahun: 2002</p>
//  <div class="action">
//    <button class="green">Selesai dibaca</button>
//    <button class="red">Hapus buku</button>
//  </div>
// </article>
}
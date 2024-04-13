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
  const container = document.createElement('article');
  container.classList.add('book_item');

  //  <h3>Book Title</h3>
  const textTitle = document.createElement('h3');
  textTitle.innerText = bookObject.bookTitle;

  //  <p>Penulis: John Doe</p>
  const textAuthor = document.createElement('p');
  textAuthor.innerText = bookObject.author;

  //  <p>Tahun: 2002</p>
  const textYear = document.createElement('p');
  textYear.innerText = bookObject.year;

  //  <div class="action">
  //    <button class="green">Selesai dibaca</button>
  //    <button class="red">Hapus buku</button>
  //  </div>
  const containerAction = document.createElement('div');
  containerAction.classList.add('action');

  container.append(textTitle, textAuthor, textYear, containerAction);

  if(bookObject.isComplete){
    const incompleteButton = document.createElement('button');
    incompleteButton.classList.add('green');
    incompleteButton.innerText = 'Belum selesai di Baca';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus buku';

    containerAction.append(incompleteButton, deleteButton);
  }else{
    const doneButton = document.createElement('button');
    doneButton.classList.add('green');
    doneButton.innerText = 'Selesai dibaca';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus buku';

    containerAction.append(doneButton, deleteButton);
  }
  return container;
// </article>
}

function findBook(bookID){
  for(const bookItem of books){
    if(bookItem.id === bookID){
      return bookItem
    }
  }
  return null;
}

function addBookToCompleted(bookID){
  
}
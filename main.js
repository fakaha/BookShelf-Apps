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
    const bookTitle = document.getElementById("inputBookTitle").value;
    const writer = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const isCompleteBox = document.getElementById("inputBookIsComplete").checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(
        generatedID,
        bookTitle,
        writer,
        bookYear,
        isCompleteBox
    );
    books.push(bookObject);

    document.dispatchEvent(new Event(NGERENDER_EVENT));
    SaveData();
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

  const incompletedBooksList = document.getElementById('incompleteBookshelfList');
  incompletedBooksList.innerText = '';

  const completedBooksList = document.getElementById('completeBookshelfList');
  completedBooksList.innerText = '';

  for(const book of books){
    const makeBook = makeBookShelf(book);

    if(!book.isComplete){
      incompletedBooksList.append(makeBook);
    }else{      
      completedBooksList.append(makeBook);
    }
  }

})

function makeBookShelf(bookObject){
  // <article class="book_item">
  const container = document.createElement('article');
  container.classList.add('book_item');

  //  <h3>Book Title</h3>
  const textTitle = document.createElement('h3');
  textTitle.innerText = bookObject.title;

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
    incompleteButton.addEventListener('click', function(){
      undoBookFromCompleted(bookObject.id);
    })

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus buku';
    deleteButton.addEventListener('click', function(){
      console.log('delete button klik');
      removeBook(bookObject.id);
    })

    containerAction.append(incompleteButton, deleteButton);
  }else{
    const doneButton = document.createElement('button');
    doneButton.classList.add('green');
    doneButton.innerText = 'Selesai dibaca';
    doneButton.addEventListener('click', function(){
      addBookToCompleted(bookObject.id);
    })

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus buku';
    deleteButton.addEventListener('click', function(){
      console.log('delete button klik');
      removeBook(bookObject.id);
    })

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

function findBookIndex(bookID){
  for(const index in books){
    if(books[index].id === bookID){
      return index;
    }
  }
  return null;
}

function addBookToCompleted(bookID){
  const bookTarget = findBook(bookID);

  if(bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(NGERENDER_EVENT));
  SaveData();
  alert('Buku ditandai menjadi selesai');
}

function removeBook(bookID){
  const bookTarget = findBookIndex(bookID);

  if(bookTarget === -1) return;
  alert('Buku berhasil dihapus');
  books.splice(bookTarget, 1);
  SaveData();
  document.dispatchEvent(new Event(NGERENDER_EVENT));
}

function undoBookFromCompleted(bookID){
  const bookTarget = findBook(bookID);

  if(bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(NGERENDER_EVENT));
  saveData()
  alert('Buku ditandai menjadi belum selesai');
}


// KODE UNTUK STORAGE
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKS_APPS';

function SaveData(){
  if(isStorageExist()){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist(){
  if(typeof(Storage) === undefined){
    alert('Browser anda tidak support local storage');
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function(){
  console.log(localStorage.getItem(STORAGE_KEY));
})

function loadDataFromStorage(){
  const localData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(localData);

  if(data !== null){
    for(const book of data){
      books.push(book);
    }
  }
  document.dispatchEvent(new Event(NGERENDER_EVENT));
}
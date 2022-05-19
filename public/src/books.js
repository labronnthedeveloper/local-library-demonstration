function findAuthorById(authors, id) {
// find()
  return authors.find((author) => author.id == id);
}

function findBookById(books, id) {
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let bookId = books[i].id;
    if (bookId === id) {
      return book;
    }
  }
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const returnedBooks = [];

  // filter()
  books.filter((book) => {
    //ternary operator
    !book.borrows[0].returned
      ? borrowedBooks.push(book)
      : returnedBooks.push(book);
    return [borrowedBooks, returnedBooks];
  });
  return [borrowedBooks, returnedBooks];
}

/* Helper Function: Handles limiting the outputted array's length */
function _capArrayLength(arr, maxNum) {
  if (arr.length > maxNum) {
    arr.splice(0, arr.length - maxNum);
  }
  return arr;
}

function getBorrowersForBook(book, accounts) {
  let borrowersArray = [];

  // for/in
  for (let items in accounts) {
    let borrowers = accounts[items];
    let borrowersId = accounts[items].id;

    for (let i = 0; i < book.borrows.length; i++) {
      let bookReturned = book.borrows[i].returned;

      borrowers.returned = bookReturned;
      if (borrowersId === book.borrows[i].id) {
        borrowersArray.push(borrowers);

        _capArrayLength(borrowersArray, 10);
      }
    }
  }
  return borrowersArray;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

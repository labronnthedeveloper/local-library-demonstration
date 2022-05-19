const { findAuthorById } = require("./books");

function findAccountById(accounts, id) {
  return accounts.find((user) => user.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((lastAccountA, lastAccountB) =>
    lastAccountA.name.last.toLowerCase() < lastAccountB.name.last.toLowerCase()
      ? -1
      : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let totalNumOfBorrows = 0;
  for (let i = 0; i < books.length; i++) {
    const bookBorrowStatus = books[i].borrows;
    for (let j = 0; j < bookBorrowStatus.length; j++) {
      let bookAndBorrows = books[i].borrows[j].id;
      if (bookAndBorrows === account.id) {
        totalNumOfBorrows++;
      }
    }
  }
  return totalNumOfBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksThatAccountHas = [];
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let borrow = book.borrows[0];
    if (!borrow.returned && borrow.id === account.id) {
      book.author = findAuthorById(authors, book.authorId);
      booksThatAccountHas.push(book);
    }
  }
  return booksThatAccountHas;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

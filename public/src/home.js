const { findAccountById } = require("./accounts");
const { findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedCount = 0;
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let borrow = book.borrows[0];
    if (!borrow.returned) {
      borrowedCount++;
    }
  }
  return borrowedCount;
}

/* Helper Function: Handles limiting the outputted array's length */
function _capArrayLength(arr, maxNum) {
  while (arr.length > maxNum) {
    arr.pop();
  }
  return arr;
}

function getMostCommonGenres(books) {
  let key = "genre";
  let names = "name";
  let point = "count";
  // reduce()
  let count = books.reduce((acc, book) => {

    if (acc[book.genre]) {
      acc[book.genre] += 1;
    } else {
      acc[book.genre] = 1;
    }
    return acc;
  }, {});

  let keys = Object.keys(count);
  keys.sort((keyA, keyB) => {
    if (count[keyA] > count[keyB]) {
      return -1;
    } else {
      return 1;
    }
  });

  let commonGenres = keys.map((genre) => ({
    name: genre,
    count: count[genre],
  }));

  _capArrayLength(commonGenres, 5);
  return commonGenres;
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  let bookName = "title";
  let names = "name";
  let point = "count";

  books.forEach((book) => {
    for (let borrow in book.borrows) {
      // Checking if we already have a collection of that name
      if (
        popularBooks.some((val) => {
          return val[names] === book[bookName];
        })
      ) {
        // If so, increase the count by 1
        popularBooks.forEach((found) => {
          if (found[names] === book[bookName]) {
            found[point]++;
          }
        });
      } else {
        // If not, the object is created/initialized.
        // set count to 1
        let borrowerGroup = {};
        borrowerGroup[names] = book[bookName];
        borrowerGroup[point] = 1;
        popularBooks.push(borrowerGroup);
      }
    }
  });
  let sortedArray = popularBooks.sort(function (firstValue, secondValue) {
    return secondValue.count - firstValue.count;
  });

  _capArrayLength(sortedArray, 5);

  console.log(sortedArray);
  return sortedArray;
}

function getMostPopularAuthors(books, authors){
  // How many times books been borrowed
  // Look through each book, and collect author
  // collect # of times books been borrowed
  // if author is apart of current collection ++
  // if author is not in collection, add author and # of borrows to collection.
  // list of 5 authors and sum of their borrows.
  let authIdBorrows = {};

  books.forEach((book) => {
    let bookBorrows = book.borrows;
    let bookAuthorId = book.authorId;

    if (authIdBorrows[bookAuthorId]) {
      let currentValue = authIdBorrows[bookAuthorId];
      let sumValue = currentValue + bookBorrows.length;

      authIdBorrows[bookAuthorId] = sumValue;
    } else {
      authIdBorrows[bookAuthorId] = bookBorrows.length;
    }
  });

  let authorMap = authors.map((author) => {
    let fName = author.name.first;
    let lName = author.name.last;
    let popAuthorsObj = {};

    popAuthorsObj["name"] = `${fName} ${lName}`;
    popAuthorsObj["count"] = authIdBorrows[author.id];

    return popAuthorsObj;
  });
  // map()
  let sortedAuthorMap = authorMap.sort(function (firstValue, secondValue) {
    return secondValue.count - firstValue.count;
  });

  _capArrayLength(sortedAuthorMap, 5);
  return sortedAuthorMap;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

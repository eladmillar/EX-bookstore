'use strict'

const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 5
var gPageIdx = 0

var gBooks
var currBook

var gCounter

const gRatings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
var gFilterBy = { maxPrice: Infinity, minRating: 0 }

_createCars()

function getBooks() {
    var books = gBooks.filter(book => book.price <= gFilterBy.maxPrice &&
        book.rating >= gFilterBy.minRating)

    // const startIdx = gPageIdx * PAGE_SIZE
    // books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}

function setBookFilter(filterBy) {
    if (filterBy.minPrice !== undefined) gFilterBy.maxPrice = filterBy.minPrice
    if (filterBy.rating !== undefined) gFilterBy.minRating = filterBy.rating
    return gFilterBy
}

function _createBook(name, price) {

    gCounter++
    return {
        id: makeId(),
        name,
        price,
        desc: makeLorem(),
        rating: 0
    }
}

function _createCars() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        gCounter = 0
        books = [
            _createBook('Learning Laravel', 18.90),
            _createBook('Beggining with Laravel', 6.65),
            _createBook('Java for developers', 7.20),
            _createBook('Advanced Java', 9.85)
        ]
    }
    gCounter = books.length
    gBooks = books
    _saveBooksToStorage()
}

function addBook(name, price) {
    const book = _createBook(name, price)
    gBooks.push(book)
    _saveBooksToStorage()
    return book
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    console.log('bookIdx', bookIdx)
    var removed = gBooks.splice(bookIdx, 1)
    gCounter = gBooks.length
    _saveBooksToStorage()
    return removed
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage()
}

function raiseRating() {
    if (currBook.rating === 10) return
    currBook.rating++
    _saveBooksToStorage()
    return currBook.rating
}

function lowerRating() {
    if (currBook.rating === 0) return
    currBook.rating--
    _saveBooksToStorage()
    return currBook.rating
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    currBook = book
    return book
}

function setBookSort(sortBy = {}) {
    if (sortBy.maxRate !== undefined) {
        gBooks.sort((b1, b2) => (b1.maxRate - b2.maxRate) * sortBy.maxRate)
    } else if (sortBy.maxPrice !== undefined) {
        gBooks.sort((b1, b2) => (b1.maxPrice - b2.maxPrice) * sortBy.maxPrice)
    }
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getRatings() {
    return gRatings
}
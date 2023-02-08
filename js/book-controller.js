'use strict'

function onInit() {
    renderRatings()
    renderBooks()
}

function renderRatings() {
    const ratings = getRatings()
    const strHTMLs = ratings.map(rating => `<option>${rating}</option>`)
    strHTMLs.unshift('<option value="">Select Rating</option>')
    document.querySelector('.filter-rating-select').innerHTML = strHTMLs.join('')
}

function renderBooks() {
    var books = getBooks()
    var strHTMLs = books.map(book =>
        `<tr>
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>${book.price}</td>
    <td>${book.rating}</td>
    <td><button class="read" onclick="onReadBook('${book.id}')">Read</button></td>
    <td><button class="update" onclick="onUpdateBook('${book.id}')">Update</button></td>
    <td><button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`
    )
    document.querySelector('.books-container').innerHTML = strHTMLs.join('')
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h2').innerText = book.name
    elModal.querySelector('h3 span').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('.rating').innerText = book.rating
    elModal.classList.add('open')
}

function onRaiseRating() {
    var newRating = raiseRating()
    if (newRating === undefined) return
    var elModal = document.querySelector('.modal')
    elModal.querySelector('.rating').innerText = newRating
}

function onLowerRating() {
    var newRating = lowerRating()
    if (newRating === undefined) return
    var elModal = document.querySelector('.modal')
    elModal.querySelector('.rating').innerText = newRating
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('Price?', book.price)
    if (newPrice && book.price !== newPrice) {
        updateBook(bookId, newPrice)
        renderBooks()
    }
}

function onRemoveBook(bookId) {
    // console.log('delete', bookId)
    var test = removeBook(bookId)
    // console.log('test', test)
    renderBooks()
}

function onCreateNewBook() {
    var name = prompt('book name')
    var price = prompt('book price')
    addBook(name, price)
    renderBooks()
}

// function onSetSortBy() {
//     const prop = document.querySelector('.sort-by').value
//     const isDesc = document.querySelector('.sort-desc').checked

//     const sortBy = {}
//     sortBy[prop] = (isDesc) ? -1 : 1

//     // Shorter Syntax:
//     // const sortBy = {
//     //     [prop] : (isDesc)? -1 : 1
//     // }

//     setBookSort(sortBy)
//     renderBooks()
// }
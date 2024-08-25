let list = document.querySelector(".list");
let card = document.querySelector(".card");
let data;

window.addEventListener("load", () => {
  console.log("loaded");
  display_all();

  (async function listFetch() {
    let fetched = await fetch(
      "https://books-backend.p.goit.global/books/category-list"
    );
    data = await fetched.json();
    list.innerHTML += `
      <p class="list_item" onclick="display_all()">All Categories</p>
    `;
    data.forEach((element) => {
      let elementJSON = JSON.stringify(element).replace(/"/g, '&quot;');
      list.innerHTML += `
        <p class="list_item" onclick="display('${elementJSON}')">${element.list_name}</p>
      `;
    });
  })();
});

let book_data;

function display(elementJSON) {
  let element = JSON.parse(elementJSON.replace(/&quot;/g, '"'));
  
  async function get_books(element) {
    try {
      let response = await fetch('https://books-backend.p.goit.global/books/top-books');
      book_data = await response.json();
      card.innerHTML = '';
      book_data.forEach(book => {
        if (book.list_name.includes(element.list_name)) {
          card.innerHTML += `<h1>${book.list_name}</h1>`;
          book.books.forEach(detail => {
            cardCreate(detail.book_image, detail.author, detail.title);
          });
        }
      });
      addCardClickListeners();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
  get_books(element);
}

function displayCat(elementBook) {
  async function get_books(elementBook) {
    try {
      let response = await fetch("https://books-backend.p.goit.global/books/top-books");
      book_data = await response.json();
      card.innerHTML = "";
      book_data.forEach((book) => {
        if (book.list_name.includes(elementBook)) {
          card.innerHTML += `<h1>${book.list_name}</h1>`;
          book.books.forEach((detail) => {
            cardCreate(detail.book_image, detail.author, detail.title);
          });
        }
      });
      addCardClickListeners();
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  get_books(elementBook);
}

async function display_all() {
  try {
    let response = await fetch("https://books-backend.p.goit.global/books/top-books");
    book_data = await response.json();
    card.innerHTML = "";
    book_data.forEach((book) => {
      card.innerHTML += `<h1>${book.list_name}</h1>`;
      let counter = 0;
      book.books.forEach((detail) => {
        if (counter <= 3) {
          cardCreate(detail.book_image, detail.author, detail.title);
          counter++;
        }
      });
      let create_btn = document.createElement('div');
      create_btn.className = 'create_btn';
      let elementBook = JSON.stringify(book.list_name).replace(/"/g, "&quot;");
      create_btn.innerHTML += `<button onclick="displayCat(${elementBook})">Show More</button>`;
      card.appendChild(create_btn);
    });
    addCardClickListeners();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function cardCreate(img, author, title) {
  card.innerHTML += `
    <div class="cards">
      <img src="${img}" alt="">
      <div class="detail">
        <h4>${author}</h4>
        <p><i>${title}</i></p>
      </div>
    </div>
  `;
}

function addCardClickListeners() {
  let cards = document.querySelectorAll(".cards");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      let img = card.querySelector("img").src;
      let author = card.querySelector("h4").innerText;
      let title = card.querySelector("p").innerText;
      showCardDetails(img, author, title);
    });
  });
}

function showCardDetails(img, author, title) {
  let cardDetail = document.querySelector(".card-detail");
  cardDetail.innerHTML = `
    <div class="card-detail-content">
      <span class="close-card-detail">X</span>
      <img src="${img}" alt="">
      <h4>${author}</h4>
      <p><i>${title}</i></p>
      <h1>Add to Shopping List</h1>
    </div>
  `;
  cardDetail.style.display = "block";

  let closeBtn = cardDetail.querySelector(".close-card-detail");
  closeBtn.addEventListener("click", () => {
    cardDetail.style.display = "none";
  });
}

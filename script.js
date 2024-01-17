const library = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        // le chiamata ha tornato 200
        // dobbiamo estrapolare il JSON da questa chiamata
        return response.json();
      } else {
        if (response.status === 404) {
          throw new Error("404 - Pagina non trovata");
        } else if (response.status === 500) {
          throw new Error("500 - Internal server error");
        } else {
          throw new Error("Errore generico");
        }
      }
    })
    .then((books) => {
      console.log("books", books);
      //   console.log(books.img);
      //   console.log(books.title);
      //   console.log(books.price);

      const card = document.getElementsByClassName("row")[0]; // mia row vuota
      books.forEach((book) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `
    <div class="card">
    <img src="${book.img}" class="card-img-top" alt="copertina libro">
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">€
                ${book.price}
            </p><button class="btn btn-success mb-1" id="compra" onclick="addBookShopping()" >COMPRA ORA</button>
             <button class="btn btn-danger" onclick="removeCardFromDOM(event)" >SCARTA</button>
             
        </div>
    </div>
    `;
        card.appendChild(newCol);
      });
    })
    .catch((err) => {
      console.log("errore!", err);
      // magari qua creeremmo un Alert di bootstrap...
      // - errori di connessione internet nostri
      // - siamo finiti qui dentro perchè abbiamo fatto un throw new Error()
    });
};

const removeCardFromDOM = function (event) {
  // questo elimina la card dal DOM
  event.target.closest(".col").remove();
};

const addBookShopping = function () {
  books.forEach((book) => {
    const ul = document.getElementById("shoppingList"); // ul vuota
    const newLi = document.createElement("li"); // creo un <li>
    newLi.innerText = `${book.title}`;
    ul.appendChild(newLi);
  });
};
// const addBookShopping = function (event) {
//     const ul = document.getElementById('shoppingList') // ul vuota

//     userArray.forEach((user) => {
//       const newLi = document.createElement('li') // creo un <li>
//       newLi.classList.add('list-group-item') // <li class="list-group-item"></li>
//       newLi.innerText = user.id + ' - ' + user.name
//       ul.appendChild(newLi)
//     })
// };
// const shoppingList = document.getElementById("shoppingList");
// const compra = document.getElementById("compra");

// compra.addEventListener("click", function () {
//   const newLi = document.createElement("li"); // creo un <li>
//   newLi.innerText = user.id + " - " + user.name;
//   ul.appendChild(newLi);
// });

library();

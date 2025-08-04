let library = JSON.parse(localStorage.getItem('bookLibrary')) || [];

function saveLibrary() {
  localStorage.setItem('bookLibrary', JSON.stringify(library));
}

function renderLibrary() {
  const libraryContainer = document.getElementById("library");
  libraryContainer.innerHTML = "";

  library.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    const img = document.createElement("img");
    img.src = book.cover || "https://via.placeholder.com/200x250?text=No+Image";

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = "by " + book.author;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = () => {
      library.splice(index, 1);
      saveLibrary();
      renderLibrary();
    };

    bookCard.appendChild(deleteBtn);
    bookCard.appendChild(img);
    bookCard.appendChild(title);
    bookCard.appendChild(author);

    libraryContainer.appendChild(bookCard);
  });
}

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const cover = document.getElementById("cover").value.trim();

  if (title === "" || author === "") {
    alert("Please enter both title and author.");
    return;
  }

  library.push({ title, author, cover });
  saveLibrary();
  renderLibrary();

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("cover").value = "";
}

// Initial load
renderLibrary();

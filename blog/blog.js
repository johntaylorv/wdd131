const articles = [
	{
		id: 1,
		title: "Septimus Heap Book One: Magyk",
		date: "July 5, 2022",
		description:
			"If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.",
		imgSrc: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
		imgAlt: "Book cover for Septimus Heap 1",
		ages: "10-14",
		genre: "Fantasy",
		stars: "****"
	},
]

function generateArticleHTML(article) {
    return `
        <div class="book-review">
            <div class="left-panel">
                <ul class="book-details">
                    <li class="review-date">${article.date}</li>
                    <li class="age-range">${article.ages}</li>
                    <li class="genre">${article.genre}</li>
                    <li class="rating">${article.stars}</li>
                </ul>
            </div>
            <div class="central-panel">
                <h2 class="book-title">${article.title}</h2>
                <img class="book-cover" src="${article.imgSrc}" alt="${article.imgAlt}">
                <p class="user-review">${article.description}</p>
            </div>  
        </div>
    `;
}

function displayArticles() {
    const articleList = document.querySelector("#maincontent");
    const rightPanel = articleList.querySelector(".right-panel");

   
    articles.forEach(article => {
        
        const articleElement = document.createElement("article");
        articleElement.classList.add("book-review");

        
        articleElement.innerHTML = generateArticleHTML(article);

        
        articleList.insertBefore(articleElement, rightPanel);
    });
}


displayArticles();
import recipes from './recipes.mjs';

function random(num) {
	return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
	const listLength = list.length;
	const randomNumber = random(listLength);
	return list[randomNumber];
}
console.log(getRandomListEntry(recipes));

function tagsTemplate(tags) {
    return tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('');
  }
  
  function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        html += '⭐';
      } else {
        html += '☆';
      }
    }

    html += `</span>`;

    return html;
  }
  function recipeTemplate(recipe) {
    return `
      <div class="recipe-wrapper">
        <article class="recipe">
          <img src="${recipe.image}" alt="${recipe.name}" />
  
          <div class="recipe-inner">
            <!-- Use the tagsTemplate to generate the tags -->
            ${tagsTemplate(recipe.tags)}
            
            <h1 class="recipe-name">${recipe.name}</h1>
  
            <!-- Use the ratingTemplate to generate the rating stars -->
            ${ratingTemplate(recipe.rating)}
  
            <div class="recipe-details">
              <p>${recipe.description}</p>
            </div>
          </div>
        </article>
      </div>
    `;
  }
  const recipe = {
    imageUrl: 'apple-crisp.jpg',
    name: 'Apple Crisp',
    tags: ['dessert', 'fall', 'easy'],
    rating: 4,
    description: 'This apple crisp recipe is a simple yet delicious fall dessert that\'s great served warm with vanilla ice cream.'
  };
  console.log(recipeTemplate(recipe));
  document.querySelector('main').innerHTML += recipeTemplate(recipe);

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]); 
  }
  document.addEventListener('DOMContentLoaded', init);
  function renderRecipes(recipeList) {
    const recipesContainer = document.querySelector('main');
    const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    recipesContainer.innerHTML = recipesHTML;
  }

  function searchHandler(event) {
    event.preventDefault();

    const query = document.querySelector('.search-bar input').value.toLowerCase();

    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
  }
  

  function filterRecipes(query) {
    return recipes
      .filter(recipe => {
        return (
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
          (recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query)))
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  document.querySelector('.search-bar button').addEventListener('click', searchHandler);
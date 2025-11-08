const newsContainer = document.getElementById('news-container');

const categoryData = async () => {
  try {
    const res = await fetch('https://news-api-fs.vercel.app/api/categories');
    const data = await res.json();
    loadCategories(data.categories);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const loadCategories = (categories) => {
  
  const categoryList = document.getElementById('category-list');
  categoryList.innerHTML = '';

  const ul = document.createElement('ul');
  ul.className = 'flex gap-6 py-4 text-xl font-medium';

  categories.forEach(category => {
    const li = document.createElement('li');
    li.className = 'hover:decoration-red-600 hover:underline decoration-[4px] underline-offset-20 transition-colors duration-200 cursor-pointer';
    li.innerHTML = `<a id="${category.id}" href="#">${category.title}</a>`;
    ul.appendChild(li);
  });
  categoryList.addEventListener('click', (e) => {
    const allLinks = document.querySelectorAll('#category-list a');
    allLinks.forEach(link => {
      link.classList.remove('underline')
    })
    
    if (e.target.nodeName === 'A') {
      e.target.className = 'underline decoration-red-600 decoration-[4px] underline-offset-20 transition-colors duration-200';

      const categoryId = e.target.getAttribute('id');
      categoryNewsId(categoryId);
    }

  })
  categoryList.appendChild(ul);
};

const categoryNewsId = (categoryId) => {
  console.log(categoryId);
  
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
  .then(res => res.json())
  .then(data => {
    showCategoryNews(data.articles);
  })
  .catch(err => {
    console.error('Error fetching category data:', err);
  })
}

const showCategoryNews = (allNews) => {
  
  newsContainer.innerHTML = '';
  allNews.forEach(news => {
    newsContainer.innerHTML += `<div class=" shadow-lg mb-4 relative w-auto h-auto sm:h-80 flex sm:flex-col">
      <img class="w-40 sm:w-auto h-28 sm:h-40 bg-cover" src="${news.image.srcset[4].url}" alt="Image">
      <div>
        <h1 class="sm:mt-6 font-semibold px-3">${news.title}</h1>
        <p class=" mt-3 sm:mt-0 text-sm text-gray-400 sm:absolute bottom-3 px-3">${news.time}</p>
      </div>
     </div>`
  })
}

// call the function to load data
categoryData();
categoryNewsId('main');

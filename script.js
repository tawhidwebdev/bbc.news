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
    li.className = 'hover:decoration-red-500 hover:underline decoration-[4px] underline-offset-12 transition-colors duration-200';
    li.innerHTML = `<a href="#">${category.title}</a>`;
    ul.appendChild(li);
  });

  categoryList.appendChild(ul);
};

// call the function to load data
categoryData();

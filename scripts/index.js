const loadCategoties = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        const categories = data.categories;
        displayCategories(categories)
        // console.log(data.categories);
    } catch (error) {
        console.error("Error fetching categories: ", error);
    }
}

const displayCategories = categories => {
    const categoriesContainer = document.getElementById('category-container');

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <button class="btn btn-sm hover:bg-red-600 hover:text-white">${category.category}</button>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });
}

loadCategoties();
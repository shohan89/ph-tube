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
    console.log(categories);
}

loadCategoties();
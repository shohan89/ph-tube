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

// load videos
const loadVideos = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const data = await res.json();
        const videos = data.videos;
        displayVideos(videos);
    } catch (error) {
        console.error('Error fetching videos: ', error);
    }
}

// display videos
const displayVideos = videos => {
    const videoContainer = document.getElementById('videoContainer');

    videos.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                <figure>
                    <img
                    class="w-full"
                    src=${video.thumbnail}
                    alt=${video.title || 'Image'} />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${video.title}</h2>
                    <p>${video.description}</p>
                    <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
                </div>
        `;
        videoContainer.appendChild(videoDiv);
    })
}


loadVideos();
loadCategoties();
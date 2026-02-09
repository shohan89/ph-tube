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
            <div class="card bg-base-100 ">
                <figure class="relative">
                    <img
                    class="w-full h-[150px] object-cover"
                    src=${video.thumbnail}
                    alt=${video.title || 'Image'} />
                    <span class="absolute right-2 bottom-2 bg-red-200 text-black text-xs px-2 py-1 rounded-full">3hrs 56 min ago</span>
                </figure>
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                                <img src=${video.authors[0]?.profile_picture} />
                            </div>
                            </div>
                    </div>
                    <div class="intro">
                        <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-500 mt-2 flex gap-1">
                        By ${video.authors[0]?.profile_name}
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png" />
                        </p>
                        <p class="text-sm text-gray-500">${video?.others?.views} views</p>
                    </div>
                </div>
                </div>
        `;
        videoContainer.appendChild(videoDiv);
    })
}


loadVideos();
loadCategoties();
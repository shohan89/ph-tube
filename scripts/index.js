const loadCategoties = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        const categories = data.categories;
        displayCategories(categories)
    } catch (error) {
        console.error("Error fetching categories: ", error);
    }
}
// remove active class from all buttons
const removeActiveClass = () => {
    const activeButtons = document.getElementsByClassName('active');
    for (const button of activeButtons) {
        button.classList.remove('active');
    }
}

// load category wise videos
const loadCategoryVideos = async category_id => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`);
        const data = await res.json();
        const categoryVideos = data.category;
        removeActiveClass();
        // get the clicked button and add active class to it
        const clickedBtn = document.getElementById(`btn-${category_id}`);
        clickedBtn.classList.add('active');
        // remove active class from other buttons
        // const buttons = document.querySelectorAll('#category-container button');
    //     buttons.forEach(button => {
    //         if (button.id !== `btn-${category_id}`) {
    //             button.classList.remove('bg-red-600', 'text-white');
    //         }        
    //     }
    // );
        displayVideos(categoryVideos);
    } catch (error) {
        console.error("Error fetching category videos: ", error);
    }
}

const displayCategories = categories => {
    const categoriesContainer = document.getElementById('category-container');

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <button id='btn-${category.category_id}' onClick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-red-600 hover:text-white">${category.category}</button>
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
        removeActiveClass(); // remove active class from all other buttons
        // add active class to All button
        const allBtn = document.getElementById('btn-all');
        allBtn.classList.add('active');
        // remove active class from other buttons
        // const buttons = document.querySelectorAll('#category-container button');
        // buttons.forEach(button => {
        //     if (button.id !== 'btn-all') {
        //         button.classList.remove('bg-red-600', 'text-white');
        //     }
        // });
        displayVideos(videos);
    } catch (error) {
        console.error('Error fetching videos: ', error);
    }
}

// load video details
const loadVideoDetails = async video_id => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`);
        const data = await res.json();
        const singleVideo = data.video;
        showDetailModal(singleVideo);
    } catch (error) {
        console.error('Error fetching video details: ', error);
    }
}
// show video details in modal
const showDetailModal = video => {
    console.log(video);
    const videoDetailModal = document.getElementById('videoDetailsModal');
    // call the modal
    videoDetailModal.showModal();
    const detailContainer = document.getElementById('detailContainer');
    detailContainer.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
            <figure>
                <img
                src=${video.thumbnail}
                alt=${video.title} />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>${video.description}</p>
            </div>
            </div>`;
}
// display videos
const displayVideos = videos => {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = ''; // clear previous videos
    // check if there are no videos then display this block
    if ( videos.length === 0 ) {
        videoContainer.innerHTML = `
        <div
          class="py-20 col-span-full flex flex-col justify-center items-center text-center"
        >
          <img class="w-[120px]" src="./assets/Icon.png" alt="" />
          <h2 class="text-2xl font-bold">
            Oops!! Sorry, There is no content here..
          </h2>
        </div>`;
        return;
    }

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
                <button onclick = loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
                </div>
        `;
        videoContainer.appendChild(videoDiv);
    })
}

loadCategoties();
// write your code here




// DOM Elements
const cardTitle = document.querySelector('#card-title');
const cardImage = document.querySelector('#card-image');
const likeCount = document.querySelector('#like-count');
const likeButton = document.querySelector('#like-button');
const commentsList = document.querySelector('#comments-list');
const commentForm = document.querySelector('#comment-form');

// State
let currentLikes = 0;

// Fetch initial image data
function fetchImageData() {
    fetch('http://localhost:3000/images/1')
        .then(response => response.json())
        .then(data => {
            // Update the UI with image data
            displayImageData(data);
            // Update comments
            displayComments(data.comments);
            // Store initial likes
            currentLikes = data.likes;
            updateLikesDisplay();
        })
        .catch(error => console.error('Error fetching image data:', error));
}

// Display image data in the UI
function displayImageData(data) {
    cardTitle.textContent = data.title;
    cardImage.src = data.image;
    cardImage.alt = data.title;
}

// Display comments in the UI
function displayComments(comments) {
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment.content;
        // Bonus: Add click handler for comment deletion
        li.addEventListener('click', () => {
            li.remove();
        });
        commentsList.appendChild(li);
    });
}

// Update likes display
function updateLikesDisplay() {
    likeCount.textContent = `${currentLikes} likes`;
}

// Event Listeners
likeButton.addEventListener('click', () => {
    currentLikes++;
    updateLikesDisplay();
});

commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const commentInput = event.target.comment;
    const newComment = commentInput.value;
    
    if (newComment.trim() !== '') {
        // Create and add new comment to UI
        const li = document.createElement('li');
        li.textContent = newComment;
        // Bonus: Add click handler for comment deletion
        li.addEventListener('click', () => {
            li.remove();
        });
        commentsList.appendChild(li);
        
        // Clear input field
        commentInput.value = '';
    }
});

// Bonus: Toggle image display when title is clicked
cardTitle.addEventListener('click', () => {
    cardImage.style.display = cardImage.style.display === 'none' ? 'block' : 'none';
});

// Bonus: Get random dog image when image is clicked
cardImage.addEventListener('click', () => {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            cardImage.src = data.message;
        })
        .catch(error => console.error('Error fetching random dog:', error));
});

// Initialize the app
fetchImageData();
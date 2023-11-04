//Function to create new post on Profile Page
function createPost(title, content) {
  const data = { title, content };

  fetch(`/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Post created:', data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-create-post').addEventListener('click', () => {
    document.getElementById('createPostContainer').style.display = 'block';
  });
});

// Function to display edit form with post details
//Edit Post Function:
function editPost(postId) {
  const postDiv = document.querySelector(`[data-post-id="${postId}"]`);
  const title = postDiv.querySelector('.post-title').textContent;
  const content = postDiv.querySelector('.post-content').textContent;

  // Populate the create post form with existing post details
  document.getElementById('newPostTitle').value = title;
  document.getElementById('newPostContent').value = content;

  // Store the post ID in a hidden field or a data attribute
  document
    .getElementById('createPostContainer')
    .setAttribute('data-current-editing-post-id', postId);

  // Show the create post container
  document.getElementById('createPostContainer').style.display = 'block';
}

// Form submission handler for both creating and updating posts
document
  .getElementById('createPostForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('newPostTitle').value;
    const content = document.getElementById('newPostContent').value;
    const currentEditingPostId = document
      .getElementById('createPostContainer')
      .getAttribute('data-current-editing-post-id');

    if (currentEditingPostId) {
      // If we're currently editing a post, update it
      updatePost(currentEditingPostId, title, content);
    } else {
      // If no post is being edited, create a new post
      createPost(title, content);
    }
  });

// Function to update post
function updatePost(postId, title, content) {
  const data = { title, content };

  fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Post updated:', data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to delete post
function deletePost(postId) {
  fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        console.log('Post deleted');
        window.location.reload();
      } else {
        throw new Error('Failed to delete post');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//For Edit Button:

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('edit-btn')) {
    const postId = event.target.getAttribute('data-edit-id');
    editPost(postId);
  }
});

//For Update Button:
document
  .getElementById('createPostForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const postId = event.target
      .querySelector('.btn-save-changes')
      .getAttribute('data-save-id');
    const title = document.getElementById('newPostTitle').value;
    const content = document.getElementById('newPostContent').value;

    updatePost(postId, title, content);
  });

//For Delete Button:
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-delete-post')) {
    const postId = event.target.getAttribute('data-delete-id');
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
    }
  }
});

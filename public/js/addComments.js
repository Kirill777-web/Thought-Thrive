//Function to add comments to a post
document.addEventListener('DOMContentLoaded', () => {
  const createCommentForms = document.querySelectorAll('.createCommentForm');

  createCommentForms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Find the associated post ID
      const postId = form.closest('.post').getAttribute('data-post-id');
      const commentContent = form.querySelector('#commentContent').value.trim();

      if (commentContent) {
        // Construct the POST request to add a new comment
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({ postId, commentContent }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          // If the comment was added successfully, reload the page to update the comment list
          location.reload();
        } else {
          alert('Failed to create comment');
        }
      }
    });
  });
});

// Toggeling comments
document.addEventListener('DOMContentLoaded', function () {
  // Attach a click event listener to all toggle-comments buttons
  document.querySelectorAll('.toggle-comments').forEach(function (button) {
    button.addEventListener('click', function () {
      // Find the closest comments section relative to the clicked toggle button
      const commentsSection = button.nextElementSibling;
      // Toggle display
      commentsSection.style.display =
        commentsSection.style.display === 'none' ? 'block' : 'none';
    });
  });
});

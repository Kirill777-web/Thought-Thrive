document.addEventListener('DOMContentLoaded', function () {
  // Add click event listener to all post titles
  document.querySelectorAll('.post-title').forEach(function (title) {
    title.addEventListener('click', function () {
      // Toggle the 'show' class for post content
      this.nextElementSibling.classList.toggle('show');

      // Assuming the comments section is the next sibling of the post content
      let commentsSection = this.nextElementSibling.nextElementSibling;

      // Check if the comments section exists and toggle the 'show' class
      if (
        commentsSection &&
        commentsSection.classList.contains('comments-section')
      ) {
        commentsSection.classList.toggle('show');
      }
    });
  });
});

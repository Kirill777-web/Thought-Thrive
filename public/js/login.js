//This code is used to handle the login and signup forms
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Extract the source and post ID from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const loginSource = urlParams.get('source');
  const postId = urlParams.get('postid');

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if the email and password are valid
  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      if (loginSource === 'navbar') {
        document.location.replace('/profile');
      } else {
        // Default behavior
        document.location.replace('/mydashboard');
      }
    } else {
      alert(response.statusText);
    }
  } else {
    alert('Please enter both username and password to login.');
  }
};

// Ensure this is attached to your login form's submit event
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Ensure this is attached to your login form's submit event
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

const signupFormHandler = async (event) => {
  event.preventDefault();

  const userNameSignUp = document
    .querySelector('#username-signup')
    .value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (userNameSignUp && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username: userNameSignUp, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

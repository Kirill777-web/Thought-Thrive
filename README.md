[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Ttile

# 📘 ThoughtThrive

## Description

ThoughtThrive Blog App is a full-featured blogging platform designed to provide a seamless experience for users to create, share, and interact with blog content. It aims to empower users with a friendly interface and provide a space for open communication and content sharing.

## 📑 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Links](#links)
- [Credits](#credits)
- [License](#license)

## ✨ Features

- User authentication for secure login and registration.
- CRUD operations for blog posts.
- Commenting system for user interaction.
- Responsive design for mobile/tablets and desktop devices.
- Integration with a backend server and database.

## 🔧 Installation

To install Blog App, follow these steps:

1. Clone the repository:
   Use the git clone command followed by the repository URL.

2. Navigate to the project directory:
   Change directory to your cloned repository using the cd command.

3. Install dependencies:
   Run npm install to install all required dependencies for the project.

4. in the terminal log in to your DB mysql using this command mysql -u 'your user name ' -p
   in the promt type source schema.sql

5. Seeding data to database

- in the terminal type node seeds/index.js
- For demonstration purposes, the blog app includes users and passwords that are fictitious and created solely to showcase the application's features. Any resemblance to actual persons is purely coincidental. To see these example accounts in action, copy and paste the provided user credentials into the **LOG IN** page of the blog app.

- Users: **(passwords already hashed in db!)**
- 1 | AliceTech | techlover123 |
- 2 | BobCoder | codeMaster456 |

6. Configure environment variables
   Create a .env file in the root directory and define next
   DB_NAME='blog_db'
   DB_USER='YUOR CODE HERE'
   DB_PASSWORD='YUOR CODE HERE'
   SESSION_SECRET='YUOR CODE HERE'

7. Start the server
   Execute npm start to fire up the server. You can then access the app on your browser through the local server address provided by the output, typically http://localhost:3001.

## 🖥 Usage

To use My Blog App

1. Sign Up for an account or log in.
2. Navigate to the "Profile" section to add new blog content.
3. Browse through existing posts on the mydashboard page.
4. Leave comments on posts to engage with the community.
5. Manage delete/update your posts through your user 'mydashboard' page.

## 🔗 Links

- This is the link of my [GitHub repository](https://github.com/Kirill777-web/Thought-Thrive)
- Link to the Heroku [Heroku](https://thought-thrive-b10edf1a6c47.herokuapp.com/login?source=post&postid=1)
- The following screenshot of the app home page ![Thought-Thrive](/img/homepage.png)
- The following screenshot of the app login page ![Thought-Thrive](/img/loginpage.png)
- The following screenshot of the app show profile page ![Thought-Thrive](/img/profile%20page.png)
- The following screenshot of the app show mydashboard (comments) page ![Thought-Thrive](/img/mydashboard.png)
- The following screenshot of the app show mydashboard created test post added comments ![Thought-Thrive](/img/testapp.png)

## 🙏 Credits

- Link of UNB course section NodeJs [UNB](https://courses.bootcampspot.com/)
- Link of documentation [Express.js](https://expressjs.com/)
- Link of Heroku [Heroku](https://heroku.com/)
- Link of NPM [NPM](https://www.npmjs.com/)

## License

Copyright (c) 2023 Kirill Lazutin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

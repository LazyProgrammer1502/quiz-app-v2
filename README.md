# Quiz App V2

A full-stack quiz application built with React, Node.js, and MongoDB. This project explores various quiz formats and provides an admin panel for content management.  This version includes several key enhancements.

## Key Features

*   **Timed Quizzes:** Quizzes are now active only for a specified duration, controlled by the admin.
*   **Admin-Controlled Visibility:** Quizzes are displayed to users only when the admin activates them using a "Make Live" button.
*   **Secure User and Admin Management:** User and admin accounts are protected with hashed passwords for enhanced security.
*   **Field-Based Quiz Filtering:** Quizzes are displayed based on matching "field" criteria for both users and quizzes, allowing for targeted quiz delivery.
*   **Dynamic Field Management:** The admin can add and delete fields, which are dynamically fetched from the database, providing flexibility in quiz categorization.
*   **User Account Management:** Users can create accounts, log in, and log out securely.

## Table of Contents

*   [Technologies Used]
*   [Installation]
*   [Usage]
*   [Contributing]

## Technologies Used

*   **Frontend:** React
*   **Backend:** Node.js with Express
*   **Database:** MongoDB
*   **Styling:** CSS Modules

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/LazyProgrammer1502/quiz-app-v1
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd quiz-app
    ```

3.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

4.  **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```

5.  **Install admin panel dependencies:**
    ```bash
    cd admin-panel
    npm install
    ```

6.  **Set up environment variables:**
    *   Create a `.env` file in the `backend` directory.
    *   Add necessary environment variables
        ```
        ATLAS_URI= mongodb+srv://faizanlala5699:Faizan123@cluster0.oyyyt.mongodb.net/
        PORT = 5000
        JWT_SECRET=NOTHINGHERE
        ```

7.  **Usage:**

    *   **Start the backend server:**
        ```bash
        cd backend
        node server.js
        ```

    *   **Start the frontend development server:**
        ```bash
        cd frontend
        npm start
        ```

    *   **Start the admin panel development server:**
        ```bash
        cd admin-panel
        npm start
        ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

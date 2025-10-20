# 🧠 Project Shared Bookmarks

A simple web app that records useful links and comes back to them later to check them. Built with **HTML** and **JavaScript (no CSS)** as part of the CodeYourFuture project.

---

## 📋 Project Overview

**Project Shared Bookmarks** is a simple web app that accepts a URL, title, and description for the URL and displays it, and saves those recorded URLs in local storage for the selected user. This project helps users keep track of URLs. Each user can:

- Select their name from a dropdown (5 users total)
- View their bookmark.
- Add a new bookmark. 
- Display which day and what time that bookmark is recorded.

--- 
 
## 🧩 Features

- **User Selection:** Dropdown with 5 users, no user selected on page load.
- **Bookmark Display:** Shows recorded bookmarks, shows “No bookmark found for the selected user” if empty.
- **Add Bookmark:** Form with bookmark URL, Title and Description, validates inputs, stores data in storage.js.
- **Data Storage:** Uses getData, addData, and clearData functions from storage.js.
- **Accessibility:** Fully accessible, Lighthouse score: 100%, keyboard navigable.
- **Unit Tests:** Tests for reverse-chronological order, form submission.
- **Deployment:** Live version hosted online on Netlify.
 
## 🧰 Technologies Used

- HTML5
- JavaScript 
- Local Storage
- No CSS (logic-focused project)

---
 
## 🚀 Running Locally

1. Clone the repo:

```bash
    git clone https://github.com/iteddy16/Project-Shared-Bookmarks-Sprint3-Piscine

    cd Piscine-Sprint-1-Project-Spaced-Repetition-Tracker
```

2. Install a simple HTTP server:

```bash
    npm install -g http-server
```

3. Run the app:
   
```bash
    http-server
```

Open the URL displayed in your browser (usually http://localhost:8080)

## 🌐 Live Demo

[View Live Project on Netlify](#)


# 🏛️ Legalese - Virtual Law Assistant

A static HTML, CSS, and JavaScript website designed to be a "Virtual Law Assistant" for citizens. It provides a dashboard of tools to help with everyday legal needs, such as a helpful chatbot, a directory of contacts, and a legal case finder.

---

## 🛠️ Features

* **LegalBot:** A (simulated) chatbot interface to get instant legal guidance in multiple languages (English, Hindi, Bengali).
* **File FIR Online:** A portal to access online FIR portals.
* **Police Stations:** A tool to find nearby police stations.
* **Contact Directory:** A list of important police and institutional contacts.
* **Legal Books:** A reference section for legal acts.
* **Lawyer Connect:** A directory to find and connect with lawyers.
* **Case Finder:** A client-side search tool to find similar legal cases from a static JSON database.
* **Anonymous Report:** A form to submit anonymous tips.
* **Document Generator:** A template for creating a legal notice.

---

## 🧱 Tech Stack

* **Frontend:** HTML
* **Styling:** CSS
* **Client-side Scripting:** Vanilla JavaScript (for DOM manipulation, tabs, chatbot, and search)
* **Data:** Static JSON files (e.g., `data/lawyers.json`, `data/legal-casses.json`)
* **Icons:** Font Awesome

---

## 🚀 Getting Started

This is a static website. No installation is required.

1.  Ensure all files are in the same directory.
2.  Open the `index.html` file in your web browser.
3.  For the best experience (to allow `fetch` requests for the JSON data), run it using a local web server.
    * If you have Python: `python -m http.server`
    * If you use VS Code, you can use the "Live Server" extension.
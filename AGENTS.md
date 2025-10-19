# Agent's Understanding of the Repository

This document outlines my understanding of the `detetive-das-palavras-portugues` repository.

## Project Purpose and Domain

The project is an educational web application named "Missão Detetive das Palavras" (Word Detective Mission). Its primary goal is to provide an interactive and engaging way for a student to study for a Portuguese language test.

The application is structured into three main sections:
-   **Área de Estudo (Study Area):** For learning concepts like primitive and derived words, prefixes, and suffixes.
-   **Área de Prova (Test Area):** To test the student's knowledge and get an AI-powered evaluation.
-   **Tutor IA (AI Tutor):** A chat-like interface for asking questions to an AI tutor.

The project was initiated using Google AI Studio and is based on materials from a Gemini-prepared master class.

## Technology Stack

The repository contains a full-stack application with a separate frontend and backend.

### Frontend

-   **Framework:** React v19 with TypeScript (`.tsx` files).
-   **Build Tool:** Vite.
-   **State Management:** React's built-in state management (`useState`).
-   **API Communication:** The `@google/genai` client library is used to interact with the Google Gemini API.
-   **Styling:** The JSX class names (e.g., `grid`, `md:grid-cols-3`, `bg-purple-600`) strongly suggest the use of **Tailwind CSS**, although it is not listed as a dependency in `package.json`. It might be included via a CDN or was omitted from the dependencies.

### Backend

-   **Runtime:** Node.js.
-   **Framework:** Express.js.
-   **Purpose:** It acts as a proxy server, forwarding requests from the frontend to the Google Gemini API. This is a security best practice to avoid exposing the `GEMINI_API_KEY` in the client-side code.
-   **Key Dependencies:** `express` for the server, `axios` for making HTTP requests, and `ws` for WebSocket capabilities.
-   **Model:** gemini-2.5-flash-latest is used for AI interactions.

### DevOps

-   **Containerization:** A `Dockerfile` is present, indicating the application is intended to be deployed as a container.
-   **Deployment:** The `README.md` provides instructions for deploying the application to Google Cloud Run.

## Architecture

The application follows a client-server model:
1.  The **React frontend** provides the user interface and learning experience.
2.  It communicates with the **Node.js/Express backend**.
3.  The **backend** securely proxies requests to the **Google Gemini API**, adding the necessary API key before forwarding them.

This setup ensures that the API key remains secure on the server and is not exposed to the user's browser.

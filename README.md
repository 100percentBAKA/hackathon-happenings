# AdGenius - Prompt Automation and Digital Asset Generator

## Overview

This project was built during a hackathon organized by **Rocketium** in collaboration with **AWS**. It leverages advanced AI technologies to generate effective ad campaign materials by combining insights from Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and image generation models. The project won **first place** in the competition.

### Core Functionality:
1. **Trend Analysis**: Uses hosted LLMs on **Bedrock** and **Tavily API** to fetch details about current trends and company-specific campaign insights.
2. **Prompt Engineering**: Dynamically generates detailed prompts based on gathered insights.
3. **Image Generation**: Passes the prompts to the **Flux Image Generation Model**, which produces high-quality ad posters for large-scale campaigns.

---

## Tech Stack Used

### Backend:
- **Python**
  - Frameworks: FastAPI
  - Libraries: Requests, Pydantic
- **AWS Bedrock**: Hosted LLMs for insights and content generation.
- **Tavily API**: Trend analysis and data retrieval.
- **Socket.IO**: Real-time communication.
- **Ngrok**: Local server tunneling for testing.

### Frontend:
- **React**: For building a modern, responsive UI.
- **Vite**: Lightning-fast development environment.
- **Tailwind CSS**: For custom, scalable, and adaptive styling.
- **JavaScript**: Core scripting language for frontend interactivity.

### Additional Tools:
- **Flux Image Generation Model**: AI-driven poster creation.
- **RAG (Retrieval-Augmented Generation)**: For better query relevance.

---

## Installation

### Prerequisites:
1. Ensure **Python 3.8+** is installed.
2. Install **Node.js** and **npm**.
3. Install **Ngrok** or use the provided `ngrok.exe` in the root directory.
4. Access credentials for AWS Bedrock and Tavily API.

### Steps:

#### Backend Setup:
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```bash
   python -m app.main
   ```

#### Frontend Setup:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm run dev
   ```

4. Use `ngrok` to expose your backend to the internet:
   ```bash
   ./ngrok.exe http 8000
   ```

---

## Usage

1. **Trend Analysis**: Enter your company details in the provided UI. The backend will fetch current trends and campaign-specific details.
2. **Prompt Generation**: The gathered data will be transformed into detailed prompts for ad generation.
3. **Poster Generation**: The prompts are sent to the Flux model, which generates posters in bulk.
4. **Preview & Download**: View the generated posters in the frontend and download them as needed.

---

## Features
- **Real-Time Trend Analysis**: Stay updated with current marketing trends.
- **Scalable Campaign Materials**: Generate high-quality posters efficiently.
- **Flexible Design Options**: Customize designs using prompts.
- **Easy Integration**: Connect seamlessly with AWS services and other APIs.

---

## Contributors
- [Adarsh G S](https://github.com/100percentBAKA)
- [Avinash S](https://github.com/Avinashs7)
- [Aashish Nandakumar](https://github.com/AashishNandakumar)

---

## Acknowledgments
- **Rocketium** and **AWS** for organizing the hackathon and providing access to cutting-edge tools and APIs.
- Our mentors and collaborators for their support and guidance.

---

## LinkedIn Post
[P O S T](https://www.linkedin.com/posts/aashish-nandakumar-932972228_hackathonwinner-ai-innovation-activity-7269605231875756032-s5og?utm_source=share&utm_medium=member_desktop)

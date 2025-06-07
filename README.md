
# 🧠 Smart Assistant Web App

An all-in-one personal productivity assistant built using React, Node.js, and Firebase — designed to help you manage tasks, ask questions, and stay weather-aware with a clean, minimalist UI and smooth animations.

> 🔗 **Live Demo**  
[web-project-ap-frpj.vercel.app](https://web-project-ap-frpj.vercel.app/)  


---

## ⚙️ Tech Stack

- **Frontend**: React.js, CSS (Custom Styling), Vite
- **Backend**: Node.js, Express.js
- **Authentication**: Firebase Auth
- **Database/Storage**: LocalStorage (for tasks)
- **External APIs**: OpenWeatherMap API (weather info)
- **Deployment**: Vercel

---

## ✨ Features & Functionality

- 🔐 **Secure Login/Logout** with Firebase Authentication  
- 🤖 **Ask Jarvis (AI)** – Ask questions and receive answers from a local AI backend  
- ✅ **To-Do List** – Add, mark complete, delete tasks  
- ⏱️ **Time Tracking** – Track how long you spend on each task  
- 🟢 **Task Priority Levels** – Label tasks as High, Medium, or Low  
- 🌤️ **Weather Widget** – Auto-fetch current weather based on user location  
- 🕒 **Live Clock** – Date & time always visible  
- 📱 **Fully Mobile Responsive** – Smooth experience across devices  
- 🌸 **Modern & Soft UI** – Built with minimalism and animations in mind

---

## 🚀 Setup Instructions

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-assistant.git
cd smart-assistant
```

### 2. Set Up Frontend

```bash
cd client
npm install
npm run dev
```

### 3. Set Up Backend

```bash
cd server
npm install
node index.js
```

> 💡 Make sure the backend is running on `localhost:3000` and accessible by the frontend.

---

## ⚠️ Limitations & Notes

- 🎤 **Voice support** was not included due to heavy computation on free hosts — it caused lag.
- 🧠 **GPT AI API** was not used since it requires a paid key. The AI reply feature is currently a placeholder/mock or basic logic.
- Hosting was done on **Vercel** for both frontend and backend using their free tier.

---

## 🙌 Credits

This project was built by a team of 2 as part of an academic course submission.

Feel free to fork, contribute, or share feedback!

import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthForm from "./AuthForm";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [weather, setWeather] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsub;
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.running ? { ...task, time: task.time + 1 } : task,
        ),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aee3a14349a231c19ba153af88a2f267&units=metric`,
          );
          const data = await res.json();
          setWeather({
            city: data.name,
            temp: data.main.temp,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        } catch (err) {
          console.error("Weather fetch failed", err);
        }
      },
      () => {
        setLocationError("Location access denied. Weather unavailable.");
      },
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setReply("Thinking...");
    try {
      const res = await fetch("web-project-ap-52kn.vercel.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      setReply("Error connecting to AI backend.");
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskTitle,
        priority,
        completed: false,
        running: false,
        time: 0,
      },
    ]);
    setTaskTitle("");
    setPriority("Medium");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTimer = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, running: !task.running } : task,
      ),
    );
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formatDateTime = (date) => {
    return date.toLocaleString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // After all hooks, check user
  if (!user) return <AuthForm setUser={setUser} />;

  return (
    <div className="App">
      <header className="user-header">
        <h1>🧠 Task Assistant</h1>
        <div className="user-info">
          <span>Welcome, {user.email}</span>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </header>

      <div className="date-time-widget">📅 {formatDateTime(currentTime)}</div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Jarvis something..."
          className="chat-input"
        />
        <button type="submit" className="chat-btn">
          Ask
        </button>
      </form>

      <div className="reply-box" aria-live="polite">
        <strong>AI:</strong> {reply}
      </div>

      <h2>📝 Task List with Time Tracking</h2>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="New task title"
          className="task-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
          aria-label="Select task priority"
        >
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>
        <button type="submit" className="add-btn" aria-label="Add task">
          ➕ Add Task
        </button>
      </form>

      <ul className="task-list" aria-label="Task list">
        {tasks.map(({ id, title, completed, time, running, priority }) => (
          <li
            key={id}
            className={`task-item priority-${priority.toLowerCase()} ${
              completed ? "completed" : ""
            }`}
          >
            <label className="task-main" htmlFor={`task-${id}`}>
              <input
                id={`task-${id}`}
                type="checkbox"
                checked={completed}
                onChange={() => toggleTask(id)}
              />
              <span className="task-title">{title}</span>
            </label>

            <div className="task-controls">
              <span className="task-priority" title={`Priority: ${priority}`}>
                {priority === "High"
                  ? "🔴"
                  : priority === "Medium"
                    ? "🟡"
                    : "🟢"}
              </span>
              <span className="task-timer" aria-label="Time spent on task">
                {formatTime(time)}
              </span>
              <button
                className="timer-btn"
                onClick={() => toggleTimer(id)}
                aria-label={running ? "Pause timer" : "Start timer"}
              >
                {running ? "⏸️" : "▶️"}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(id)}
                aria-label="Delete task"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 🌤️ Weather Widget */}
      {weather && (
        <div className="weather-widget">
          <h2>🌤️ Current Weather</h2>
          <div className="weather-details">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.desc}
            />
            <div>
              <p>
                <strong>{weather.city}</strong>
              </p>
              <p>{weather.temp}°C</p>
              <p>{weather.desc}</p>
            </div>
          </div>
        </div>
      )}

      {locationError && (
        <div className="weather-widget">
          <p>{locationError}</p>
        </div>
      )}
    </div>
  );
}

export default App;

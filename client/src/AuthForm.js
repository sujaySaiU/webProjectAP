import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function AuthForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <div className="auth-error">{error}</div>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </form>
  );
}

const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = "mysecret";


// 🔑 Fake users with roles
const users = [
  { id: 1, username: "student", password: "1234", role: "student" },
  { id: 2, username: "teacher", password: "abcd", role: "teacher" },
  { id: 3, username: "admin", password: "root", role: "admin" }
];

// ✅ Middleware to verify JWT from cookie
function authenticate(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    req.user = jwt.verify(token, SECRET_KEY); // attach decoded user
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

// ✅ Middleware to check roles
function authorize(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

// 🔑 Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: false, // set true in production
    sameSite: "Strict"
  });

  res.json({ message: "Login successful ✅", role: user.role });
});

// 👀 Student-only route
app.get("/student/dashboard", authenticate, authorize(["student", "teacher", "admin"]), (req, res) => {
  res.json({ message: `Hello ${req.user.username}, welcome to student dashboard 🎓` });
});

// 👩‍🏫 Teacher-only route
app.get("/teacher/dashboard", authenticate, authorize(["teacher", "admin"]), (req, res) => {
  res.json({ message: `Hello ${req.user.username}, welcome to teacher dashboard 📘` });
});

// 🛠 Admin-only route
app.get("/admin/panel", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: `Hello ${req.user.username}, welcome to admin panel ⚙️` });
});


















// // 🔑 Login Route - issue JWT inside HttpOnly Cookie
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   // ✅ Fake authentication check
//   if (username === "student" && password === "1234") {
//     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

//     // Store token in HttpOnly cookie
//     res.cookie("access_token", token, {
//       httpOnly: true,    // ❌ JS cannot access
//       secure: false,     // ⚠️ true in production (HTTPS only)
//       sameSite: "Strict" // 🚫 prevent CSRF
//     });

//     return res.json({ message: "Login successful ✅" });
//   }

//   res.status(401).json({ message: "Invalid credentials ❌" });
// });

// 👀 Protected Route - only accessible if JWT valid
app.get("/dashboard", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: `Welcome, ${decoded.username}! 🎓` });
  } catch (err) {
    res.status(403).json({ message: "Token invalid or expired" });
  }
});

// 🚪 Logout - clear cookie
app.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Logged out successfully 🚪" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

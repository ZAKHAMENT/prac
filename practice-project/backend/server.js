import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import User from "./models/User.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

const PORT = 5000;
const DB_URL = "mongodb://127.0.0.1:27017/project2";
const SECRET_KEY  = 21890;

mongoose.connect(DB_URL, {
    family: 4,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

  const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
  );
  req.user = {
    username: decodedToken.username,
    userId: decodedToken.userId, 
    email: decodedToken.email,
  }  
    next();
  };

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    console.log('op');
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExist = User.findOne({email});
    if (!isUserExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    newUser.save()
    .then(() => {
        res.status(201).json({ message: "User registered successfully" });
    })
    .catch((error) => {
        res.status(500).json({ message: "Error registering user", error });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Compare passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: "Error comparing passwords", error: err });
                }
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
                // Generate JWT
                const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ message: "Login successful", token });
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error logging in", error });
        });
});

app.post('/userProfile', (req, res) => {
    
})
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
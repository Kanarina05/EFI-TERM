const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');

const User = require('./models/User');
const Post = require('./models/Post');
const verifyToken = require('./middleware/verifyToken');

const app = express();
const PORT = 4000;
const SECRET = 'K@O$@V@';


mongoose.connect('mongodb://localhost:27017/jwtReact')
  .then(() => console.log('MongoDB u lidh me sukses!'))
  .catch(err => console.error(err));


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'te gjithe fuhsat duhet te plotesohen!' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'ky email ekziston!' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await new User({ username, email, password: hashed }).save();

    res.status(201).json({ message: 'Regjistrimi u krye me sukses!' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjate regjistrimit!' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'te dhenat gabim!' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'te dhenat gabim' });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjate loginit!' });
  }
});

app.post('/posts', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, text } = req.body;
    const image = req.file ? req.file.filename : null;

    const post = await new Post({
      userId: req.user.userId,
      title,
      text,
      image
    }).save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjate procesit te postimit' });
  }
});


app.get('/allposts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Gabim!' });
  }
});


app.listen(PORT, () =>
  console.log(`Serveri po punon ne portin ${PORT}`)
);
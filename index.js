const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const multer = require('multer');

const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/users.js')
const postRoute = require('./routes/posts.js')
const categoryRoute = require('./routes/categories.js')
const path=require('path');

const app = express();

dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))

 
mongoose.connect(process.env.MONGO_URL)
    .then(console.log("DB connected successfully"))
    .catch((err) => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("Image uploaded successfully")
})





app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on port 8000")

})

const express = require('express');
const app = express();

require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT;
const databaseURL = process.env.DATABASEURL

const InfoRouter = require('./routes/InfoRouter');
const AdmissionRouter = require('./routes/AdmissionRouter');
const ForAddmissionRouter = require('./routes/ForAddmissionRouter');
const StaffRouter = require('./routes/StaffRouter');
const AdminRouter = require('./routes/AdminRouter');

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: [process.env.ORIGIN],
    method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

const path = require('path');
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', './dist/index.html'));
});


app.use('/api/info',InfoRouter)
app.use('/api/admission',AdmissionRouter)
app.use('/api/for-admission',ForAddmissionRouter)
app.use('/api/staff',StaffRouter)
app.use('/api/auth',AdminRouter)


const server = app.listen(PORT, () => {
  console.log(`Server is running at :${PORT}`);
});

app.use((err, req, res, next) => {
  if (err) {
    return console.log(err)
  }
  next();
})

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("DB connection Successfull.");
  })
  .catch((err) => {
    console.log(err.message);
});

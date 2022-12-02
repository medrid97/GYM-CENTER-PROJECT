/*const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
//require('dotenv').config();

const app = express();
const port =5000;



app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
const db  = "mongodb://127.0.0.1/my_database";
mongoose.connect(db, {
  useNewUrlParser: true, 

useUnifiedTopology: true 


}, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!!!')
})
const express = require('express')

const router = require("express").Router();

const {
    getAllProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
   

} = require('../controllers/product')





router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/product/new').post(newProduct);

router.route('/product/:id')
    .put( updateProduct)
    .delete( deleteProduct);





module.exports = router;*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')



require('dotenv').config();

const app = express();
const port =5000;



app.listen(port,()=> {
  console.log("Server is runinng on port : ",port)
});
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
const db  = "mongodb://127.0.0.1/my_database";
mongoose.connect(db, {
  useNewUrlParser: true, 

useUnifiedTopology: true 


}, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!!!')
})


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

/* 
after create our models and routes we require our routes here and use them
*/
const postRoutes = require('./routes/posts');

const products = require('./routes/Product');

const coachs = require('./routes/Coach');
const courses = require('./routes/Course' );







app.use('/posts', postRoutes);
app.use("/api/v1",products);
app.use("/api/v2",coachs);
app.use("/api/v3",courses);

//app.use("/api/v2",coachs);






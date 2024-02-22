const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const multer  = require('multer')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(cors());
const PORT = 4000
mongoose.connect('mongodb+srv://anshitsinha:G2EFw5bCR9L7SwVq@cluster0.9vn34dg.mongodb.net/');



const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Users = mongoose.model('Users', userSchema);

app.get('/', function (req, res) {
  res.send('Hello World')
})

// SIGNUP

app.post('/signup', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = new Users({
        username: username,
        password: password
    });
    user.save()
    .then(() => {
        res.send({message: 'done'})
    })
    .catch(()=> {
        res.send({message: 'err'})
    })
}
)

//Login

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Users.findOne({ username: username })
        .then((result) => {
            console.log(result, "user data");
            if (!result) {
                res.send({ message: 'User not found' });
            } else {
                if (result.password == password) {
                    const token = jwt.sign({
                        data: result
                      }, 'MYKEY', { expiresIn: '1h' });

                    res.send({
                        message: 'Login Successful',
                        token: token
                    });
                } else {
                    res.send({
                        message: 'Login Unsuccessful'
                    });
                }
            }
        })
        .catch(() => {
            res.send({ message: 'Error occurred' });
        });
});

const productsSchema = new mongoose.Schema({
    pname: String,
    pdesc: String,
    price: String,
    category: String,
    pimage: String,
    
});

const Products = mongoose.model('Products', productsSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'productsimg')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

app.post('/add-product',upload.single('pimage'), (req,res)=> {
    console.log(req.body);
    console.log(req.file);
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    const pimage = req.file.path;
    const product = new Products({
        pname,
        pdesc,
        price,
        category,
        pimage
    });
    product.save()
    .then(() => {
        res.send({message: 'done'})
    })
    .catch(()=> {
        res.send({message: 'err'})
    })

})

app.get('/products', (req,res) => {
    Products.find()
    .then((result) => {
        console.log(result, "user data")
        res.send({message: "success", products: result})
    })
    .catch((err) => {
        res.send({message: "server err"})
    })
    
})




app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
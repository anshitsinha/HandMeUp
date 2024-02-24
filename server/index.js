const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const multer  = require('multer')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/productsimg', express.static(path.join(__dirname, 'productsimg')));


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
                        
                        token: token,
                        userId: result._id
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
    location: String,
    age: String,
    category: String,
    pimage: String,
    pimage2: String,
    addedBy: mongoose.Schema.Types.ObjectId
    
});

const Products = mongoose.model('Products', productsSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'productsimg');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

app.post('/add-product', upload.fields([{ name: 'pimage', maxCount: 1 }, { name: 'pimage2', maxCount: 1 }]), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const location = req.body.location;
    const age = req.body.age;
    const category = req.body.category;
    const pimage = req.files['pimage'][0].path;
    const pimage2 = req.files['pimage2'][0].path;
    const addedBy = req.body.userId;
    const product = new Products({
        pname,
        pdesc,
        price,
        location,
        age,
        category,
        pimage,
        pimage2,
        addedBy
    });
    product.save()
        .then(() => {
            res.send({ message: 'done' });
        })
        .catch(() => {
            res.send({ message: 'err' });
        });
});


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

app.get('/search', (req,res) => {

    let search = req.query.search;

    Products.find({
        $or: [
            { pname: { $regex: search } },
            { pdesc: { $regex: search } },
            { price: { $regex: search } },
        ]
    })
        .then((results) => {
            res.send({ message: 'success', products: results })
        })
        .catch((err) => {
            res.send({ err })
        })

})

app.get('/products/:pId', (req,res) => {
    console.log(req.params);

    Products.findOne({ _id: req.params.pId })
        .then((result) => {
            res.send({ message: 'success', product: result })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
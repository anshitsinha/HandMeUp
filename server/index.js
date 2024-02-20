const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

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


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
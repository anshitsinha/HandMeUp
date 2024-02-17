const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const Products = require('./productController')

const Users = mongoose.model('Users', {
    username: String,
    mobile: String,
    email: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports.likeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}

module.exports.deleteProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Products.findByIdAndDelete(productId)
    .then(() => {
        res.send({ message: 'Product deleted successfully.' });
    })
    .catch((err) => {
        console.error('Error deleting product:', err);
        res.status(500).send({ message: 'Internal server error.' });
    });

}

module.exports.signup = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const user = new Users({ username: username, password: password, email, mobile });
    user.save()
        .then(() => {
            res.send({ message: 'saved success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}

module.exports.myProfileById = (req, res) => {
    let uid = req.params.userId

    Users.findOne({ _id: uid })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

    return;

}

module.exports.getUserById = (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}

module.exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const result = await Users.findOne({ username: username });

        if (!result) {
            return res.status(404).json({ message: 'User not found.' });
        } else {
            if (result.password === password) {
                const token = jwt.sign({ data: result }, 'MYKEY', { expiresIn: '1h' });
                return res.status(200).json({ message: 'Login successful.', token: token, userId: result._id });
            } else {
                return res.status(401).json({ message: 'Incorrect password.' });
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};


    



module.exports.likedProducts = (req, res) => {

    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}
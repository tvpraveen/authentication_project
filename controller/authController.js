const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const env = require('dotenv')


const signup = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = req.body
            const newUser = await userModel.create({
                firstName: data.firstName,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword
            })
            // const token = jwt.sign({id : newUser._id},'ad7_iur$mfakm_dag-dsagknvuerf_oanfe', {
            //     expiresIn: 1000000  // third option is added to first payload
            // })
            resolve({
                message: "Success",
                newUser
            })
        } catch (err) {
            reject({
                message: err.message
            })
        }
    })
}

const login = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userEmail = req.body.email;
            const userPassword = req.body.password;

            //const {email, password} = req.body; //destructuring
            //check if email & password is present in request body
            if (!userEmail || !userPassword) {
                console.error("please enter email and password");
                reject({
                    message: "please enter email and password"
                })
            }

            //check if user exists with given email
            const user = await userModel.findOne({ email: userEmail }).select("+password");
            // const isMatch = await user.comparePasswordInDb(password, user.password)

            //check if the user exists & password matches
            if (!user || !(await user.comparePasswordInDb(userPassword, user.password))) {
                console.error("incorrect email or password");
                reject({    
                    message: "incorrect email or password"
                })
            }
            const token = jwt.sign({ id: user._id }, process.env.AUTH_KEY, {
                // expiresIn: 1000000  // third option is added to first payload
            })

            resolve({
                message: "success",
                token
            })
        }
        catch (err) {
            reject({
                message: err.message
            })
        }
    })
}

const getUsers = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("coming...");
            const getusers = await userModel.find();
            resolve({
                message: "successfully got users",
                getusers
            })
        }
        catch (err) {
            reject({
                message: err.message
            })
        }
    })
}

const getUserById = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = req.params.id;
            const getuserbyid = await userModel.findById(id);
            if (!getUserById) {
                reject({
                    message: "user not found"
                })
            }
            console.log(getuserbyid);
            resolve({
                message: "user found",
                getuserbyid
            })
        }
        catch (err) {
            reject({
                message: err.message
            })
        }
    })
}

const updateUser = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = req.params.id;
            const { email, password, firstName } = req.body;
            const updateduser = await userModel.findByIdAndUpdate(id, { email, password, firstName }, { new: true }).select("+password")
            if (!updateduser) {
                reject({
                    message: "user not found"
                })
            }
            console.log(updateduser);
            resolve({
                message: "user updated",
                updateduser
            })
        }
        catch(err){
            reject({
                message: err.message
            })
        }
    })
}





// const authenticateUser = async (req, res, next) => {
//     try {
//         // Extract token from request header
//         const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//         // Verify token
//         if (!token) {
//             throw new Error('Authentication token missing');
//         }

//         const decoded = jwt.verify(token, 'ad7_iur$mfakm_dag-dsagknvuerf_oanfe');

//         // Find user by id
//         const user = await userModel.findById(decoded.id);

//         // Check if user exists
//         if (!user) {
//             throw new Error('User not found');
//         }

//         // Attach user object to request for further use in routes
//         req.user = user;

//         // Proceed to next middleware
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Authentication failed' });
//     }
// };

// module.exports = authenticateUser;

// Protected route
// router.get('/protected', authenticate, (req, res) => {
//     // Access req.user to get the authenticated user details
//     res.json({ message: 'You are authorized!', user: req.user });
// });


    module.exports = {
        signup, login, getUsers, getUserById, updateUser
    }
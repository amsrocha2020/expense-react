const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../Models/User");

// Register User
router.post('/register', async (req, res) => {
    try{
        let { firstName, lastName, email, password, isDeleted } = req.body;

        // Validate
        if (!email || !password) {
            return res
                .status(400)
                .json({msg: "Not all fields have been entered!"});
        }
        if (password.length < 5) {
            return res
                .status(400)
                .json({msg: "Password needs to be at least 5 characteres long"});
        }
        
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res
                .status(400)
                .json({msg: "An account with this email already exists."});
        }

        if (!firstName && !lastName) {
            firstName = email;
            lastName = '';
        }

        //Hashing password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        // console.log(passwordHash);

        const newuser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            isDeleted: false
        });

        const savedUser = await newuser.save();
        res.json(savedUser);

    } catch (err) {
        res.status(500).json({error: err.message})
    }

});

// Login User
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;

        // Validate
        if (!email || !password) {
            return res
                .status(400)
                .json({msg: "Not all fields have been entered!"});
        }

        const user = await User.findOne({email: email});
        if (!user){
            return res
                .status(400)
                .json({msg: "Not account with this email has been registered!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({msg: "Invalid credentials."});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        })
        console.log(token);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

// Delete Account
router.delete("/delete", auth, async (req, res) => {
    // console.log(req.user);
    try {
        const deleteUser = await User.findByIdAndDelete(req.user);
        res.json(deleteUser);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id
    });
})

module.exports = router;
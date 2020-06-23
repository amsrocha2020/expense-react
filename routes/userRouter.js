const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/User");

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

module.exports = router;
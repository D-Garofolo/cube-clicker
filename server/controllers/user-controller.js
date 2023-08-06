const user = require('../models/user-model')
const bcrypt = require('bcryptjs')

createUser = async (req, res) => {
    const name = req.body.name;
    const pw = req.body.password;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = await bcrypt.hash(pw, salt);
    const newUser = user({name, password});
    if (!newUser) {
        return res.status(400).json({ success: false, error: err })
    }
    newUser
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                user: newUser
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({
                error,
                message: 'Failed to create user.'
            })
        })
}


deleteUser = async (req, res) => {
    const userInfo = req.body;
    await user.findOneAndDelete({name: userInfo.name}, (error, userToDelete) => {
        if (error) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if (!userToDelete) {
            return res.status(404).json({
                success: false,
                error: 'Failed to find user.'
            })
        }

        return res.status(200).json({ success: true, user: userToDelete })
    })
}

findUser = async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const foundUser = await user.findOne({name: name});
        if (foundUser) {
            const correct = await bcrypt.compare(password, foundUser.password);
            if (correct) {
                return res.status(200).json({ success: true, user: foundUser })
            }
            else {
                return res.status(401).json({ errorMessage: "Wrong password."})
            }
        }
        return res.status(400).json({
            success: false
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            error: err
        })
    }
}

updateUser = async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const foundUser = await user.findOne({name: name});
        if (foundUser) {
            foundUser.count = req.body.count;
            foundUser.CpS = req.body.CpS;
            foundUser.CpC = req.body.CpC;
            foundUser.upgrades = req.body.upgrades;
            foundUser.buildings = req.body.buildings;

            let updatedUser = await foundUser.save();
            if (updatedUser) {
                return res.status(200).json({
                    success: true,
                    user: updatedUser
                })
            }
            return res.status(400).json({
                success: false,
                message: 'Failed to update user.'
            })
        
        }
        return res.status(400).json({
            success: false
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false, 
            error: err
        })
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    findUser
}
const userModel = require('../models/userSchema');

module.exports.addUserEmployer = async (req,res) => {
    try {
        const {email,username,password} = req.body;
        const roleEmployer ='employer'
        const user = await userModel.create({
            username,email,password,role:roleEmployer
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports.addUserEmployerWithImg = async (req,res) => {
    try {
        const {email,username,password} = req.body;
        const roleEmployer ='employer'
        const {filename} = req.file

        const user = await userModel.create({
            username,email,password,role:roleEmployer , user_imag
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports.addUserAdmin = async (req,res) => {
    try {
        const {email,username,password} = req.body;
        const roleAdmin ='admin'
        const user = await userModel.create({
            username,email,password,role:roleAdmin
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAllUsers = async (req,res) => {
    try {
        const userList = await userModel.find()
        res.status(200).json({userList});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getUsersById = async (req,res) => {
    try {
        const {id} = req.params
        //const {id} = req.params
        console.log(req.params)
        const user = await userModel.findById(id)
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.deleteUserById= async (req,res) => {
    try {
        const {id} = req.params

        const checkIfUserExists = await userModel.findById(id);
        if (!checkIfUserExists) {
          throw new Error("User not found");
        }

        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
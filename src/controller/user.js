
const User = require(`${__models}/users`);
const _ = require('underscore');
const { connectToDatabase, disconnectFromDatabase, startIdleTimer } =require(`${__config}/dbConn`)
const { responseHandler } = require(`${__utils}/responseHandler`)

exports.helloWorld = async (req, res) => {
   try {
    await connectToDatabase();
    const body = req.body;
    let user = new User(body);
    const result = await user.save();
    startIdleTimer();
    res.send({success:true,data:result})
   } catch (error) {
    console.log(error)
    res.send({success:false,message:error})
   }
}

exports.addUser = async (req, res) => {
    try {
        await connectToDatabase();

        const {
            email,
            password,
            fullName,
            mobileNo,
            gender,
        } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase(), isDeleted: false });
        if (existingUser) {
            return responseHandler.validationError(res, "User already exists with this email");
        }

        // Create a new user instance
        const newUser = new User({
            email: email.toLowerCase(),
            password,
            fullName,
            mobileNo,
            gender,
        });

        const savedUser = await newUser.save();

        return responseHandler.success(res, savedUser, "User created successfully");

    } catch (error) {
        console.error(error);
        return responseHandler.error(res, error);
    }
};


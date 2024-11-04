const {Schema, model} = require('mongoose');

const validateEmail = (email) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
//      validate: [validateEmail, 'Please use a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
//      match and validate do the same thing: uses a regex for custom validation
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(passowrd, this.password, function(){
        return result;
    });
};

module.exports = model('User', userSchema);
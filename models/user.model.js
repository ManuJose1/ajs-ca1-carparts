const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = Schema({
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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password, function(){
        return result;
    });
};

module.exports = model('User', userSchema);
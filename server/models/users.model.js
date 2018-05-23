const mongoose = require('mongoose')
const { encryptPassword } = require('../helpers/password.helper')

const userSchema = mongoose.Schema({
    title: {
        type: String,
        enum: ['rookie', 'advanced', 'master', 'legend']
    },
    email: {
        type: String,
        required: [true, 'email cannot be empty'],
        unique: true,
        validate: {
            validator: function(email){
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                let checkEmail = re.test(String(email).toLowerCase())
                return checkEmail
            },
            message: 'email is not in valid format'
        }
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty'],
        minlength: [7, 'password must be 7 character or longer']
    },
    exp: Number,
    lvl: Number,
    hp: Number,
    atk: Number,
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps: true
})

userSchema.pre('save', function () {
    this.password = encryptPassword(this.password)    
})

userSchema.post('find', function (result) {
    console.log(result)
})

const User = mongoose.model('User', userSchema)

module.exports = User
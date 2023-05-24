const mongoose = require('mongoose')
const {v4} = require('uuid')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    encryptedPassword: String,
    salt: String
},{timestamps: true})

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = v4()
        this.encryptedPassword = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    authenticate: function(password){
        return this.encryptedPassword === this.securePassword(password)
    },
    securePassword: function(password){
        if(!password) return ''

        try {
        return crypto.createHmac("sha256",this.salt)
                        .update(password)
                        .digest('hex')            
        } catch (error) {
            return ''
        }

    }
}

module.exports = mongoose.model("User",userSchema)
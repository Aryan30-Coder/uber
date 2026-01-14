const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minLength: [3, 'Last name must be atleast 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            minLength: [3, 'Color must be at least 3 characters long'],
            required: true
        },
        plate: {
            type: String,
            minLength: [3, 'Plate must be at least 3 characters long'],
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            minLength: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            enum: ['Car', 'Bike', 'Auto'],
            required: true
        }
        
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id : this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password) 
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('captain', captainSchema)

module.exports = captainModel;
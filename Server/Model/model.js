const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    CompanyLogoURL: { type: String, required: true },
    Position: { type: String, required: true },
    Salary: { type: String, required: true },
    JobType: { type: String, required: true },
    RemoteOrOffice: { type: String, required: true },
    JobLocation: { type: String, required: true },
    Description: { type: String, required: true },
    Skills : {type : [String],required:true},
    AboutCompany: { type: String, required: true },
    Information: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    UserName: { type: String, required: true },
    UserMobile: { type: String, required: true },
    UserEmail: { type: String, required: true },
    UserPassword: { type: String, required: true },
    Jobs: [jobSchema] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;

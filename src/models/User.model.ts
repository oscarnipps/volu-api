import {Schema ,model} from 'mongoose'

interface User {
    first_name : string;
    last_name : string;
    sex : string;
    email : string;
    phone : string;
    password : string;
}

const userSchema = new Schema<User>({
    first_name : {
        type : String,
        required : true,
        trim : true
    },

    last_name : {
        type : String,
        required : true,
        trim : true
    },

    sex : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    
    phone : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
        trim : true
    }
});

//add an index on the email field
userSchema.index({email : 1});

//create the model
const UserModel = model<User>("User",userSchema);

export default UserModel;
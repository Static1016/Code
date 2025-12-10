import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, // Removes spaces between, before and after the username
            minLength: 8,
            maxLength: 10
        },

        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 12
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
    },

    {
        timestamps: true
    }
)

// Hashing of password using bcrypt
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// compare passwords
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
};

export const User = mongoose.model("User", userSchema)

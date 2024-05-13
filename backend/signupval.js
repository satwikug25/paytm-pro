const {z} = require("zod"); 

const createUser = z.object({
    username: z.string().email(),
    password:z.string(),
    firstName: z.string(),
    lastName:z.string()
    

});

const userSignin = z.object({
    username:z.string().email(),
    password:z.string()
})

module.exports = {
    createUser,userSignin
}
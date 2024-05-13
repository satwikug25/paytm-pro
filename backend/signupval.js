const {z} = require("zod"); 

const createUser = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName:z.string(),
    password:z.string()

});

module.exports = {
    createUser
}
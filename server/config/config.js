const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        DATABASE:"mongodb+srv://shyam:shyam123@cluster0.rxk6v.mongodb.net/<dbname>?retryWrites=true&w=majority",
        SECRET:'SUPERSECRET'
    }
}

exports.get = function get(env){
    return config[env] || config.default
} 

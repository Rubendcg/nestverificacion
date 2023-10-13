
export const EnvConfiguration = ()=>({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaullimit: process.env.DEFAUL_LIMIT || 3

})
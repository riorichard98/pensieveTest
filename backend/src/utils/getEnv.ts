export function getEnv(envName:string):string{
    try {
        const envVariable = process.env[envName]
        if(envVariable == undefined){
            throw new Error(`env is of ${envName} is missing`);
        }
        return envVariable
    } catch (error) {
        console.log(error)
        throw(error)
    }
}
export default class CustomError extends Error {
    private statusCode : number;
    constructor(msg : string, statusCode : number){
        super(msg);
        this.statusCode = statusCode;
    }
}

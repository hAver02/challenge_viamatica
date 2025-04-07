export const errorMiddleware = (err, req, res, next) => {
    console.log("err!", {err : err.message});
    
    const status = err.statusCode || 500;
    res.status(status).json({ ok : false, message : err.message});
}
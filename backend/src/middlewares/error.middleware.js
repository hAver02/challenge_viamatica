export const errorMiddleware = (err, req, res, next) => {

    const status = err.statusCode || 500;
    return res.status(status).json({ ok : false, message : err.message});
}
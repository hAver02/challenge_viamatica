export const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ ok : false, message : err.message});
}
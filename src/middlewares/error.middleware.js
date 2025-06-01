function ErrorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        statusCode,
        message: process.env.NODE_ENV === 'production' ? "Internal Server Error" : err.message,
        ...err
    })
}
export default ErrorMiddleware;

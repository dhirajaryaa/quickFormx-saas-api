function ErrorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        statusCode,
        message: err.message || "something went wrong!",
        ...err
    })
}
export default ErrorMiddleware;

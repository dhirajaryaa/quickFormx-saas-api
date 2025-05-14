class ApiError extends Error {
    constructor(
        statusCode = 400,
        message = "something went wrong!",
        data = null,
        isError = true,
        isSuccess = false,
        error = [],
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.isError = isError;
        this.isSuccess = isSuccess;
        this.error = error;
        this.stack = stack;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export default ApiError;

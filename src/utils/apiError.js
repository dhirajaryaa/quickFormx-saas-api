class ApiError {
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
        if (stack) {
            this.stack = statusCode;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export default ApiError;

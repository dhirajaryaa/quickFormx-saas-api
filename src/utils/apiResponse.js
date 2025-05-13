class ApiResponse {
    constructor(
        statusCode = 200,
        message = "successful",
        data = null,
        isError = false,
        isSuccess = true
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.isError = isError;
        this.isSuccess = isSuccess;
    }
}
export default ApiResponse

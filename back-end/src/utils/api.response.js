class ApiResponse {
    constructor(success, message, data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static successResponse(data, message = 'Operation successful') {
        return new ApiResponse(true, message, data);
    }

    static errorResponse(message = 'Operation failed', data = null) {
        return new ApiResponse(false, message, data);
    }
}

module.exports = ApiResponse;

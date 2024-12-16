const httpStatusCodes = require('http-status-codes');

class BaseController {
    constructor(repoClass) {
        this.repo = new repoClass();
    }

    ok(res, data) {
        if (!!data) {
            res.status(httpStatusCodes.OK).send(data);
        } else {
            res.status(httpStatusCodes.NO_CONTENT);
        }
    }

    created(res, data) {
        res.status(httpStatusCodes.CREATED).send({ message: 'Created', data: data });
    }

    unauthorized(res, message) {
        return res.status(httpStatusCodes.UNAUTHORIZED).send({ message: 'UNAUTHORIZED' });
    }

    forbidden(res, message) {
        return res.status(httpStatusCodes.FORBIDDEN).send({ message: 'Forbidden' });
    }

    notFound(res, message) {
        return res.status(httpStatusCodes.NOT_FOUND).send({ message: 'Not Found' });
    }

    conflict(res, message) {
        return res.status(httpStatusCodes.CONFLICT).send({ message: 'Conflict' });
    }

    internalServerError(res, error) {
        console.error(error); // Log chi tiết lỗi để debug dễ dàng hơn
        return res
            .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: 'Internal Server Error', error: error.message || error });
    }

    getAll = (req, res) => {
        this.repo
            .findAll()
            .then((data) => this.ok(res, data))
            .catch((error) => this.internalServerError(res, error));
    };

    getById = (req, res) => {
        this.repo
            .findById(req.params.id)
            .then((data) => this.ok(res, data))
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    res.status(httpStatusCodes.BAD_REQUEST).send({ message: 'Validation Error', error: error.message });
                } else if (error.name === 'CastError') {
                    res.status(httpStatusCodes.BAD_REQUEST).send({
                        message: 'Invalid ID format',
                        error: error.message,
                    });
                } else {
                    this.internalServerError(res, error);
                }
            });
    };

    add = (req, res) => {
        this.repo
            .create(req.body)
            .then((data) => this.created(res, data))
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    res.status(httpStatusCodes.BAD_REQUEST).send({ message: 'Validation Error', error: error.message });
                } else if (error.name === 'CastError') {
                    res.status(httpStatusCodes.BAD_REQUEST).send({
                        message: 'Invalid ID format',
                        error: error.message,
                    });
                } else if (error.code === 11000) {
                    res.status(409).send({ message: 'Duplicate Key Error', details: error.keyValue });
                } else {
                    this.internalServerError(res, error);
                }
            });
    };

    updateById = (req, res) => {
        this.repo
            .updateById(req.params.id, req.body)
            .then((data) => {
                console.log('Updated data:', data); // Kiểm tra log dữ liệu mới
                this.ok(res, data); // Trả về dữ liệu mới
            })
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    res.status(httpStatusCodes.BAD_REQUEST).send({ message: 'Validation Error', error: error.message });
                } else if (error.name === 'CastError') {
                    res.status(httpStatusCodes.BAD_REQUEST).send({
                        message: 'Invalid ID format',
                        error: error.message,
                    });
                } else {
                    this.internalServerError(res, error);
                }
            });
    };

    deleteById = (req, res) => {
        this.repo
            .deleteById(req.params.id)
            .then((data) => this.ok(res, data))
            .catch((error) => {
                if (error.name === 'CastError') {
                    res.status(httpStatusCodes.BAD_REQUEST).send({
                        message: 'Invalid ID format',
                        error: error.message,
                    });
                } else {
                    this.internalServerError(res, error);
                }
            });
    };
}

module.exports = BaseController;

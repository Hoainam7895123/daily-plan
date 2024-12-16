class BaseRepository {
    constructor(_collection) {
        this.collection = _collection;
    }

    async findAll() {
        const data = await this.collection.find().lean().exec();
        return data;
    }

    async findById(id) {
        const data = await this.collection.findById(id);
        return data;
    }

    async create(data) {
        const newData = await this.collection.create(data);
        return newData;
    }

    async updateById(id, data) {
        // Thêm `{ new: true }` để nhận lại dữ liệu mới nhất sau khi cập nhật
        const updatedData = await this.collection.findByIdAndUpdate(id, data, { new: true });

        // Kiểm tra nếu không tìm thấy todo với ID đã cho
        if (!updatedData) throw new Error('Todo not found');

        return updatedData; // Trả về dữ liệu mới nhất
    }

    async deleteById(id) {
        const deletedData = await this.collection.findByIdAndDelete(id);
        if (!deletedData) throw new Error('Todo not found');
        return deletedData;
    }
}

module.exports = BaseRepository;

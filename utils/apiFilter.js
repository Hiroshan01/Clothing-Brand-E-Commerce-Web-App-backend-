class APIFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filters() {
        const queryCopy = { ...this.queryStr };

        // Remove fields
        const fieldsToRemove = ["keyword", "page", "limit"];
        fieldsToRemove.forEach((el) => delete queryCopy[el]);

        // Category filter
        if (queryCopy.category) {
            this.query = this.query.find({
                category: { $regex: new RegExp(queryCopy.category, 'i') }
            });
            delete queryCopy.category;
        }

        // Size filter  
        if (queryCopy.size) {
            this.query = this.query.find({
                size: { $regex: new RegExp(queryCopy.size, 'i') }
            });
            delete queryCopy.size;
        }

        if (queryCopy.price) {
            const priceQuery = {};

            // Handle price[gte], price[gt], price[lte], price[lt]
            Object.keys(queryCopy.price).forEach(key => {
                priceQuery[`$${key}`] = Number(queryCopy.price[key]);
            });

            this.query = this.query.find({ price: priceQuery });
        }

        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

export default APIFilters;
const {transaction, commit, rollback, query} = require('./mysqlcon');

const createProduct = async (product, variants) => {
    try {
        await transaction();
        const result = await query('INSERT INTO product SET ?', product);
        await query('INSERT INTO variant(color_code,color_name,size,stock,product_id) VALUES ?', [variants]);
        await commit();
        return result.insertId;
    } catch (error) {
        await rollback();
        return error;
    }
};

const getProducts = async (pageSize, paging = 0, requirement = {}) => {
    console.log(requirement);
    const condition = {sql: '', binding: [], orderby: 'ORDER BY id'};
    if (requirement.category) {
        condition.sql = 'WHERE category = ?';
        condition.binding = [requirement.category];

    } else if (requirement.keyword != null) {

        if(requirement.filter != null){
            if(requirement.filter === 'priceHToL'){
                condition.orderby = 'ORDER BY `price` DESC ';
            }else if(requirement.filter === 'priceLToH'){
                condition.orderby = 'ORDER BY `price` ';
            }
            condition.sql = 'WHERE title LIKE ?';
            condition.binding = [`%${requirement.keyword}%`];
        }else {
            condition.sql = 'WHERE title LIKE ?';
            condition.binding = [`%${requirement.keyword}%`];
        }



    }  else if (requirement.id != null) {
        condition.sql = 'WHERE id = ?';
        condition.binding = [requirement.id];
    }

    const limit = {
        sql: 'LIMIT ?, ?',
        binding: [pageSize * paging, pageSize]
    };

    const productQuery = 'SELECT * FROM product ' + condition.sql + condition.orderby + limit.sql;
    const productBindings = condition.binding.concat(limit.binding);
    const products = await query(productQuery, productBindings);

    const productCountQuery = 'SELECT COUNT(*) as count FROM product ' + condition.sql;
    const productCountBindings = condition.binding;

    const productCounts = await query(productCountQuery, productCountBindings);
    const productCount = productCounts[0].count;

    return {
        products,
        productCount
    };
};

const getHotProducts = async (hotId) => {
    const productQuery = 'SELECT product.* FROM product INNER JOIN hot_product ON product.id = hot_product.product_id WHERE hot_product.hot_id = ? ORDER BY product.id';
    const productBindings = [hotId];
    return await query(productQuery, productBindings);
};

const getProductsVariants = async (productIds) => {
    const queryStr = 'SELECT * FROM variant WHERE product_id IN (?)';
    const bindings = [productIds];
    return await query(queryStr, bindings);
};

const getProductCollection = async (email) => {
    const collectionList = await query('SELECT * FROM collection WHERE email = ?', [email]);
    return(collectionList);
};

module.exports = {
    createProduct,
    getProducts,
    getHotProducts,
    getProductsVariants,
    getProductCollection
};
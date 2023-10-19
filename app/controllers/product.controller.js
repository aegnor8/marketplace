const Product = require('../../model/products.model');
const Category = require('../../model/categories.model')

exports.getMessage = (req, res) => {
    res.json({"message": "Welcome to DressStore application."});
};

exports.getAllProducts = (req, res) => {
    Product.find()
        .then(products => res.status(200).json(products))
        .catch(err => res.status(400).json({ "error": err }))
};

exports.getProductById = (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        if (!product) {
            return res.status(404).json({ "message": "Product not found" });
        }
        res.status(200).json(product);
    })
    .catch(err => {
        console.error(err);
        res.status(400).json({ "error": err });
    }); 
}

exports.addNewProduct = (req, res) => {
    let product = new Product(req.body)
    product.save()
        .then(product=>res.status(200).json(product))
        .catch(err=>res.status(400).json({"error": err}))
};

exports.updateProductById = async (req, res) => {
    Product.findById(req.params.id)
    .then(products=>res.status(200).json(products))
        .catch(err=>res.status(400).json({"error": err}))
};

exports.removeProductById = (req, res) => {
    const productId = req.params.id;
    Product.findByIdAndRemove(productId)
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).json({ error: "Entry not found" });
            }
            res.status(200).json({ message: "Entry deleted successfully" });
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
};

exports.removeAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({ message: "All products deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getProductThatContainKw = (req, res) => {
    const keyword = req.query.name;
    const regex = new RegExp(`.*${keyword}.*`, 'i');

    Product.find({ name: { $regex: regex } })
        .then(products => {
            if (products.length === 0) {
                return res.status(404).json({ message: "Nessun prodotto trovato." });
            }
            res.status(200).json(products);
        })
        .catch(err => res.status(400).json({ error: err }));
}

/*
exports.addCategory = (req, res) => {
    let category = new Category(req.body)
    category.save()
        .then(categories=>res.status(200).json(categories))
        .catch(err=>res.status(400).json({"error": err}))
};
*/
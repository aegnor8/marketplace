const Product = require('../../model/products.model');

exports.getMessage = (req, res) => {
    res.json({"message": "Welcome to DressStore application."});
};

exports.getAllProducts = (req, res) => {
    ProductSchema.find()
        .then(products => res.status(200).json({
            "message": "Welcome to DressStore application.",
            "products": products
        }))
        .catch(err => res.status(400).json({ "error": err }))
};

exports.getProductById = (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        if (!product) return res.status(404).json({ "message": "Product not found" });
        res.status(200).json(product);
    })
    .catch(err => res.status(400).json({ "error": err })); 
}

exports.addNewProduct = (req, res) => {
    let product = new Product(req.body)
    product.save()
        .then(product=>res.status(200).json(product))
        .catch(err=>res.status(400).json({"error": err}))
};

exports.updateProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
          return res.status(404).send();
        }
        res.send(product);
      } catch (error) {
        res.status(400).send(error);
      }
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
    const keyword = 'kw';
    Product.find({ name: { $regex: keyword, $options: 'i' } })
        .then(products => {
            if (products.length === 0) {
                return res.status(404).json({ message: "Entry not found." });
            }
            res.status(200).json(products);
        })
        .catch(err => res.status(400).json({ error: err }));
}
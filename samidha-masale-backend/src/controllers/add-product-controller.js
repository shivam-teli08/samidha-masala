const Product = require('../models/admin-add-product.model')
async function addProduct(req,res){
    try{
        if (!req.body.image) {
            return res.status(400).json({ message: 'Image URL is required' });
        }

        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category
        });
        res.status(201).json(product);
    }
    catch(err){
        console.log("Add product error:", err.message);
        res.status(500).json({message:err.message})
    }
}
module.exports={
    addProduct
}

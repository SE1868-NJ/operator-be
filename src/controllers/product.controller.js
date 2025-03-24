import ProductService from "../services/product.service.js";

export const getTop5BestSellingProducts = async (req,res) => {
    try {
        const response = await ProductService.getSalesByPeriod();
        res.status(200).json({
            sucess: true,
            message: "Get top 5 best selling product succesfully",
            data: response
        })
    } catch (error) {
        console.error("An error occured during get top 5 best selling product", error)
        return res.status(500).json({
            sucess: false,
            message: "Get top 5 best selling product was failed"
        })
    }
}
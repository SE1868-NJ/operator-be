import BannerSevices from "../services/banner.service.js";

export const getBanners = async (req, res) => {
    try {
        const { page = 1, size = 10, status = 'all', search = '' } = req.query;
        const bannersData = await BannerSevices.getBanners({
            page: parseInt(page),
            size: parseInt(size),
            status,
            search,
        });
        res.status(200).json(bannersData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await BannerSevices.getBannerById(id);
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createBanner = async (req, res) => {
    try {
        const banner = await BannerSevices.createBanner(req.body);
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await BannerSevices.updateBanner(id, req.body);
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await BannerSevices.deleteBanner(id);
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const changeBannerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // assuming status is sent in the request body
        const banner = await BannerSevices.changeStatus(id, status);
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
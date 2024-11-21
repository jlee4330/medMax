const express = require("express");
const { getCalender, getThirtyDay, getSevenDay, getTogetherMedi, getFullMedi } = require("../Services/myPageService");

const myPageRouter = express.Router();

// 캘린더 조회 API
myPageRouter.get("/calender", async (req, res) => {
    const { userId } = req.query;
    try {
        const calender = await getCalender(userId);
        res.status(200).json(calender);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch calender" });
    }
});

// 30일 복약 조회 API
myPageRouter.get("/thirty-day", async (req, res) => {
    const { userId } = req.query;
    try {
        const thirtyDay = await getThirtyDay(userId);
        res.status(200).json(thirtyDay);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ThirtyDayMedi" });
    }
});

// 7일 복약 조회 API
myPageRouter.get("/seven-day", async (req, res) => {
    const { userId } = req.query;
    try {
        const sevenDay = await getSevenDay(userId);
        res.status(200).json(sevenDay);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch SevenDayMedi" });
    }
});

// 함께 복약 조회 API
myPageRouter.get("/together-medi", async (req, res) => {
    const { userId } = req.query;
    try {
        const togetherMedi = await getTogetherMedi(userId);
        res.status(200).json(togetherMedi);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch TogetherMedi" });
    }
});

// 모두 복약 조회 API
myPageRouter.get("/full-medi", async (req, res) => {
    const { userId } = req.query;
    try {
        const fullMedi = await getFullMedi(userId);
        res.status(200).json(fullMedi);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch FullMedi" });
    }
});

module.exports = myPageRouter;
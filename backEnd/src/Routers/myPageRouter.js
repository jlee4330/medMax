const express = require("express");
const { getCalender } = require("../Services/myPageService");

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


module.exports = myPageRouter;
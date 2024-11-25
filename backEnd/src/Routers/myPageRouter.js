const express = require("express");
const { getUserNumMedi, getUserName, getCalender, getThirtyDay, getSevenDay, getTogetherMedi, getFullMedi, getQNum, getPokers } = require("../Services/myPageService");

const myPageRouter = express.Router();

// 하루 복약 횟수 조회 API
myPageRouter.get("/num-medi", async (req, res) => {
    const { userId } = req.query;
    try {
        const numMedi = await getUserNumMedi(userId);
        res.status(200).json(numMedi);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch numMedi" });
    }
});

// 사용자 이름 조회 API
myPageRouter.get("/user-name", async (req, res) => {
    const { userId } = req.query;
    try {
        const userName = await getUserName(userId);
        res.status(200).json(userName);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch userName" });
    }
});

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

// 질문 개수 조회 API
myPageRouter.get("/q-num", async (req, res) => {
    const { userId } = req.query;
    try {
        const qNum = await getQNum(userId);
        res.status(200).json(qNum);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch QNum" });
    }
});

myPageRouter.get("/statistics", async (req, res) => {
    const { userId } = req.query;
    try {
        const togetherMedi = await getTogetherMedi(userId);
        const fullMedi = await getFullMedi(userId);
        const qNum = await getQNum(userId);

        const result = [ togetherMedi[0][0], fullMedi[0][0], qNum[0][0] ];
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch statistics" });
    }
});

myPageRouter.get("/pokers", async (req, res) => {
    const { userId } = req.query;
    try {
        const pokers = await getPokers(userId);
        res.status(200).json(pokers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch pokers" });
    }
});

module.exports = myPageRouter;
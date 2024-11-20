const express = require("express");
const { getCandidate, getGoal, getIds } = require("../Services/mainPageService");

const mainPageRouter = express.Router();

//콕 찌르기 Candidate 가져오기
mainPageRouter.get("/candidate", async (req, res) => {
    const userId = req.query.userId;
    const roomId = req.query.roomId;
    const time = req.query.time;
    // res.status(200).json({userId : userId, roomId : roomId, time : time});
    try {
        const candidates = await getCandidate(userId, roomId, time);
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch candidates" });
    }
});

// 공동의 목표 정보 불러오기
mainPageRouter.get("/goalStat", async (req, res) => {
    const { roomId } = req.query.roomId;
    try {
        const goalStatus = await getGoal(roomId);
        res.status(200).json(goalStatus);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch goalStatus" });
    }
});

mainPageRouter.get("/getIds", async (req, res) => {
    const uID = req.query.uID;
    try {
        const IdsStatus = await getIds(uID);
        
        res.status(200).json(IdsStatus);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch goalStatus" });
    }
});



module.exports = mainPageRouter;
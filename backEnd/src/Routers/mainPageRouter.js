const express = require("express");
const { getCandidate, getGoal, getIds, signUp, getUsers, poke, eatMed } = require("../Services/mainPageService");

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

mainPageRouter.get("/signUp", async (req, res) => {
    const userId = req.query.userId;
    const roomId = req.query.roomId;
    const time1 = req.query.time1;
    const time2 = req.query.time2;
    const time3 = req.query.time3;

    try {
        const result = await signUp(userId, roomId, time1, time2, time3);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch goalStatus" });
    }
});

mainPageRouter.get("/getUsers", async (req, res) => {

    try {
        const result =  await getUsers();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch goalStatus" });
    }
});

mainPageRouter.get("/poke", async (req, res) => {
    const uto = req.query.uto;
    const ufrom = req.query.ufrom;
    const when = req.query.when;

    try {
        const result = await poke(ufrom, uto, when);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch goalStatus" });
    }
});

mainPageRouter.get("/eatMed", async (req, res) => {
    const userId = req.query.userId;
    const time = req.query.time;

    try {
        const result = await eatMed(userId, time);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch goalStatus" });
    }
});




module.exports = mainPageRouter;
SELECT date, mediCount
FROM Date_medi
WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)


SELECT mediCount, Count(mediDate) AS mediDateCount
FROM Date_medi
WHERE userId = 1
    AND mediDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY mediCount
ORDER BY mediCount DESC

SELECT mediCount, Count(mediDate) AS mediDateCount FROM Date_medi WHERE userId = ? AND mediDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY mediCount ORDER BY mediCount DESC

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/weather", async (req, res) => {

    try {

        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({
                error: "Latitude and Longitude required"
            });
        }

        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${lat},${lon}&aqi=yes`
        );

        const data = await response.json();

        res.json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Server Error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
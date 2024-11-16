import express from "express"
import { Request, Response } from "express"

const app = express()

app.get("/", (req: Request, res: any) => {
    return res.status(200).json({
        status: "healthy",
    })
})

app.listen(4004, () => {
    console.log(`Server is running on port 4004`)
})
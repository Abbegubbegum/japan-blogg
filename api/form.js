import { connectToDatabase } from "../lib/database.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const db = await connectToDatabase();

        // put recieved data into variables
        const title = req.body.title;
        const author = req.body.author;
        const dateWritten = req.body.date;
        const location = req.body.location;
        const content = req.body.content;
        // get and format the publishing date
        const timeStamp = new Date();
        const yyyy = timeStamp.getFullYear();
        let mm = timeStamp.getMonth() + 1; // Months start at 0!
        let dd = timeStamp.getDate();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        const datePublished = yyyy + '/' + mm + '/' + dd;
    }
    else {
        res.status(501).send("only POST method is allowed");
    }
}
import { connectToDatabase } from "../lib/database.js";


export default async function handler(req, res) {
    try {

        if (req.method === "POST") {
            const db = await connectToDatabase();

            // put recieved data into variables
            const title = req.body.title;
            const author = req.body.author;
            const date = req.body.date;
            const location = req.body.location;
            const content = req.body.content;
            const timestamp = Date.now();

            // get and format the publishing date
            // const yyyy = timestamp.getFullYear();
            // let mm = timestamp.getMonth() + 1; // Months start at 0!
            // let dd = timestamp.getDate();

            // if (dd < 10) dd = '0' + dd;
            // if (mm < 10) mm = '0' + mm;

            // const datePublished = yyyy + '/' + mm + '/' + dd;

        }
        else {
            res.status(501).send("only POST method is available");
        }
    }
    catch {
        res.status(500).send("error occured when posting blog");
    }
}
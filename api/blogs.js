import { connectToDatabase } from "../lib/database.js";

export default async function handler(req, res) {

    try {
        if (req.method === "GET") {

            const db = await connectToDatabase();
            const blogs = db.collection("blogs");

            if (isNaN(req.query.timestamp)) {
                const blogs = await blogs.find({}).toArray();   // get all blogs from database here
                res.status(200).send(blogs);
            }

            else {
                const blog = await blogs.findOne({"timestamp": req.query.timestamp}); // add getting blog based on timestamp from database
                res.status(200).send(blog);
            }
        }
        else {
            res.status(501).send("only GET method is available");
        }
    }
    catch {
        res.status(500).send("error occured when getting blog(s)");
    }
}
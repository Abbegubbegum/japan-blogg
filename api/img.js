import { connectToDatabase } from "../lib/database.js";

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const db = await connectToDatabase();
            const blogsDB = db.collection("blogs");
            const blogs = await blogsDB.find({}).toArray();
            let imgArray = [];
            blogs.forEach(blog => {
                blog.content.forEach(element => {
                    if (element.type === "img" && !imgArray.find((img) => img.path === element.path)) {
                        imgArray.push(element);
                    }
                })
            });
            res.status(200).send(imgArray);
        } else {
            res.status(501).send("only GET method is allowed");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("error occured when getting image paths");
    }
}
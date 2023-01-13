import { connectToDatabase } from "../lib/database.js";
import { getImages } from "../lib/images.js";

export default async function handler(req, res) {
	try {
		if (req.method === "GET") {
			const db = await connectToDatabase();
			const blogsDB = db.collection("blogs");
			const blogs = await blogsDB.find({}).toArray();
			let blogImgs = [];
			blogs.forEach((blog) => {
				blog.content.forEach((element) => {
					if (
						element.type === "img" &&
						!blogImgs.find((img) => img.path === element.path)
					) {
						blogImgs.push(element);
					}
				});
			});

			const miscImgs = getImages();
			miscImgs.forEach((element) => {
				// this will not find duplicates from miscImgs
				if (!imgArray.find((img) => img.path === element))
				{
					imgArray.push(element);
				}
			})
			
            
            
            res.status(200).send(imgArray);
		} else {
			res.status(501).send("only GET method is allowed");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("error occured when getting image paths");
	}
}

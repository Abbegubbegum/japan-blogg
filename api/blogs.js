import { connectToDatabase } from "../lib/database.js";

export default async function handler(req, res) {
	try {
		if (req.method === "GET") {
			const db = await connectToDatabase();
			const blogs = db.collection("blogs");

			if (req.query.preview === "true") {
				//Get preview
				let blogsResult = await blogs.find({}).toArray();
				const previewResults = blogsResult.map((blog) => {
					delete blog["content"];
					return blog;
				});
				res.status(200).send(previewResults);
			} else if (isNaN(req.query.timestamp)) {
				const blogResult = await blogs.find({}).toArray(); // get all blogs from database here

				blogResult.sort((a, b) => {
					const aInt = parseInt(a.date.slice(-2));
					const bInt = parseInt(b.date.slice(-2));

					return bInt - aInt;
				});
				res.status(200).send(blogResult);
			} else {
				const blog = await blogs.findOne({
					timestamp: parseInt(req.query.timestamp),
				}); // add getting blog based on timestamp from database
				res.status(200).send(blog);
			}
		} else {
			res.status(501).send("only GET method is available");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("error occured when getting blog(s)");
	}
}

import aws from "aws-sdk";

aws.config.update({
	region: "eu-central-1",
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_KEY,
});

const s3 = new aws.S3();

export async function getImages() {
	const response = await s3
		.listObjectsV2({ Bucket: "japanblog-imgs" })
		.promise();

	const imageKeys = [];

	response.Contents?.forEach((content) => {
		imageKeys.push(content.Key);
	});

	console.log(imageKeys);

	return imageKeys;
}

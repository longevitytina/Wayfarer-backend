require("dotenv").config();
const db = require("./models");
let id = "5ea21ab68d07a4fe2034791c";

// db.Post.findById(id, function(err, post) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	post.author = author;
// 	console.log(post.author);
// })

db.Post.findById(id).populate('author').populate('city')
	.exec(function (err, post) {
		if (err) {
			console.log(err);
		}
		console.log(post.author.name);
		console.log(post.author._id);
		
		console.log(post.city.name);
		console.log(post.city._id);
	})
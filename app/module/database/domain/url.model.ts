import mongoose from "mongoose";

export const urlSchema = new mongoose.Schema({
	slug: { type: String, require: true, default: "" },
	original: { type: String, require: true, default: "" },
	views: { type: Number, default: 0 },
	created: { type: Date, default: new Date() },
});

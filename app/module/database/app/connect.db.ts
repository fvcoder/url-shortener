/* eslint-disable no-console */
import mongoose from "mongoose";

import { models } from "../domain/models";

export async function connectDb(): Promise<mongoose.Connection> {
	if (mongoose.connection.readyState > 0) {
		if (process.env.NODE_ENV === "development") {
			for (const model of models) {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (mongoose.connection.models[model.name]) {
					mongoose.connection.deleteModel(model.name);
				}
				mongoose.connection.model(model.name, model.schema, model.collection);
			}
		}

		return mongoose.connection;
	}

	mongoose.connection.on("connected", () => {
		console.log("Mongoose connected, NODE_ENV=%s", process.env.NODE_ENV);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongoose DISCONNECTED, NODE_ENV=%s", process.env.NODE_ENV);
	});

	await mongoose.connect(process.env.MONGO_URI as string);

	for (const model of models) {
		mongoose.connection.model(model.name, model.schema, model.collection);
	}

	return mongoose.connection;
}

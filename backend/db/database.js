import mongoose from "mongoose";
import { mongoDBURL } from "../config.js";

main().catch(err => console.log(err));

export default async function main() {
  await mongoose.connect(mongoDBURL);
}
// import * as _ from "lodash-es";
import { writeFileSync } from "fs";
import { users } from "./reseed-data.js";
import { nextAdventure } from "./reseed-data.js";
import { visited } from "./reseed-data.js";

const data = JSON.stringify({ users, nextAdventure, visited });
writeFileSync("db.json", data, { encoding: "utf-8" });

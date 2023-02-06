// import * as _ from "lodash-es";
import { writeFileSync } from "fs";
import { users } from "./reseed-data.js";
import { nextVisit } from "./reseed-data.js";
import { visited } from "./reseed-data.js";

const data = JSON.stringify({ users, nextVisit, visited });
writeFileSync("db.json", data, { encoding: "utf-8" });

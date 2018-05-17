import { Server } from "../src/server";
import * as supertest from "supertest";


export let request = supertest.agent(Server.bootstrap().app);
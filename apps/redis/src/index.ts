import { createClient } from "redis";
const client = createClient();



async function startWorker() {

    try {
        await client.connect();
        console.log("Worker connected to Redis.");


    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();
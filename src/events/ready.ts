import { Event } from "../structures/Event";
import { client } from "..";

export default new Event("ready", () => {
    console.log("Bot is online");
    client.user?.setActivity("Rick Astley dance", { type: "WATCHING" });
});

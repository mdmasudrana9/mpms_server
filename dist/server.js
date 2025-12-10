"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
const start = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://masud:TitForTat953218@cluster0.myz2n.mongodb.net/mpms?appName=Cluster0");
        console.log("MongoDB connected");
        const port = config_1.default.port;
        app_1.default.listen(port, () => {
            console.log(`Server running on http://localhost:${config_1.default.port}`);
        });
    }
    catch (err) {
        console.error("Failed to start server", err);
        process.exit(1);
    }
};
start();

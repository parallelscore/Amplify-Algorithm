"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const { port } = config_1.default;
// Handle Errors
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('something went wrong');
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

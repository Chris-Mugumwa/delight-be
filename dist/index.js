"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
let config = {
    method: 'get',
    url: 'https://api.twitter.com/2/tweets/search/recent?query=frozen_custard',
    headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
};
app.get('/', (req, res) => {
    (0, axios_1.default)(config)
        .then(response => {
        res.json({ data: response.data });
    })
        .catch(error => console.log(error.message));
});
app.listen(process.env.PORT || 3001, () => {
    console.log(`[server] : Server is running at http://localhost:${process.env.PORT || 3001}`);
});

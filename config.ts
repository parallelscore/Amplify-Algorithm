import dotenv from "dotenv";

dotenv.config();

const {
API_Key,
API_Key_Secret,
Access_Token,
Access_Token_Secret,
PORT,
Bearer_Token,
} = process.env;

const config = {
    api_key: API_Key as string,
    api_key_secret: API_Key_Secret as string,
    access_token: Access_Token as string,
    access_token_secret: Access_Token_Secret as string,
    port: PORT,
    bearer_token: Bearer_Token as string
};

export default config;
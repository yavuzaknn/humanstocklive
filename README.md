# HumanStock GPT API

Simple Express.js proxy to connect securely to OpenAI GPT API.

## Setup
1. Run `npm install`
2. Create `.env` file with your API key:
```
OPENAI_API_KEY=sk-...your-key
```
3. Run `node index.js`

API endpoint will be available at `http://localhost:3001/api/gpt`.
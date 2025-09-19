# Hello Region Bot

An Azure Bot Framework POC with regional awareness functionality built using the Microsoft 365 Agents SDK.

## Features

- **Regional Awareness**: Displays the current deployment region
- **Greeting Functionality**: Greets users with regional information
- **Echo Capability**: Repeats user messages for general interaction
- **Error Handling**: Comprehensive error handling to prevent crashes
- **In-Memory Storage**: Uses in-memory storage for lightweight operation

## Requirements

- Node.js 18.0.0 or higher (required for ES modules support)
- npm or yarn package manager
- Microsoft 365 Agents Playground (for interactive testing): `npx @microsoft/agents-playground`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bspender/hello-region-bot.git
   cd hello-region-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Starting the Bot

#### Default (Local) Region
```bash
npm start
```

#### Custom Region

**Bash (Mac/Linux):**

```bash
DEPLOY_REGION=EastUS npm start
```

**PowerShell (Windows):**

```powershell
$env:DEPLOY_REGION="EastUS"
npm start
```

The bot will start on port 3978 by default.

### Environment Variables

- `DEPLOY_REGION`: Sets the deployment region (default: "local")
- `PORT`: Sets the server port (default: 3978)

### Endpoints

- **`/api/messages`**: Main bot messaging endpoint
- **`/health`**: Health check endpoint with region information
- **`/`**: Root endpoint with bot information

### Bot Commands

- **Greeting**: Say "hello", "hi", or "hey" to get a greeting with region information
- **Region Query**: Ask "Where are you running?" or mention "region" to get the current deployment region
- **Echo**: Any other message will be echoed back to you

## Architecture

The bot uses the Microsoft 365 Agents SDK with the following key components:

- **@microsoft/agents-hosting**: Core bot framework
- **@microsoft/agents-hosting-express**: Express.js integration
- **AgentApplication**: Main application class for handling conversations
- **MemoryStorage**: In-memory storage for bot state

### ES Modules Configuration

This project is configured as an ES module:

- `"type": "module"` in package.json enables ES module syntax
- Uses `import`/`export` instead of `require`/`module.exports`
- Compatible with modern Node.js versions (18+)

## Development

### Running in Development Mode
```bash
npm run dev
```

This uses Node.js `--watch` flag for automatic restarts on file changes.

### Testing Health Endpoint
```bash
curl http://localhost:3978/health
```

Expected response:
```json
{
  "status": "healthy",
  "region": "local",
  "timestamp": "2025-09-19T19:08:32.098Z"
}
```

### Testing with M365 Agents Playground

The recommended way to test the bot interactively:

1. Start the bot locally:

   ```bash
   npm start
   ```

2. In a separate terminal, start the M365 Agents Playground:

   ```bash
   npx @microsoft/agents-playground start
   ```

3. The playground will connect to your local bot at `http://localhost:3978/api/messages`

4. Test the bot functionality:
   - Initial connection should show a welcome message
   - Try "hello" or "hi" for greetings
   - Ask "Where are you running?" to test region awareness
   - Send any other message to test echo functionality

## Deployment

The bot can be deployed to various cloud platforms. Set the `DEPLOY_REGION` environment variable to reflect the actual deployment region:

- `DEPLOY_REGION=centralus` for Azure Central US
- `DEPLOY_REGION=us-east-1` for AWS US East
- `DEPLOY_REGION=europe-west1` for Google Cloud Europe

## Troubleshooting

### Port Already in Use Error

If you see `EADDRINUSE: address already in use :::3978`:

**Windows:**
```bash
taskkill /f /im node.exe
```

**Mac/Linux:**
```bash
pkill -f node
# or find the specific process
lsof -ti:3978 | xargs kill -9
```

### Bot Not Responding

1. Verify the bot is running on the correct port (3978)
2. Check the console for error messages
3. Restart both the bot and the M365 Agents Playground
4. Ensure no firewall is blocking localhost connections

### M365 Agents Playground Connection Issues

1. Make sure the bot is started first
2. Verify the playground is connecting to `http://localhost:3978/api/messages`
3. Check that both processes are running in separate terminals

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues, please open an issue on the GitHub repository.

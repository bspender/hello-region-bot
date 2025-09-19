# Hello Region Bot

An Azure Bot Framework POC with regional awareness functionality built using the Microsoft 365 Agents SDK.

## Features

- **Regional Awareness**: Displays the current deployment region
- **Greeting Functionality**: Greets users with regional information
- **Echo Capability**: Repeats user messages for general interaction
- **Error Handling**: Comprehensive error handling to prevent crashes
- **In-Memory Storage**: Uses in-memory storage for lightweight operation

## Requirements

- Node.js 18.0.0 or higher
- npm or yarn package manager

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
```bash
DEPLOY_REGION=us-east-1 npm start
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

## Deployment

The bot can be deployed to various cloud platforms. Set the `DEPLOY_REGION` environment variable to reflect the actual deployment region:

- `DEPLOY_REGION=us-east-1` for AWS US East
- `DEPLOY_REGION=us-west-2` for AWS US West  
- `DEPLOY_REGION=europe-west1` for Google Cloud Europe
- `DEPLOY_REGION=eastus` for Azure East US

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

import { AgentApplication, MemoryStorage, TurnState } from '@microsoft/agents-hosting';
import { startServer } from '@microsoft/agents-hosting-express';

// Get deployment region from environment variable, default to "local"
const DEPLOY_REGION = process.env.DEPLOY_REGION || 'local';

console.log(`Starting Hello Region Bot in "${DEPLOY_REGION}" region...`);

// Create memory storage for in-memory data (doesn't persist)
const memoryStorage = new MemoryStorage();

// Create the bot application
const app = new AgentApplication({
    storage: memoryStorage
});

// Handle greeting messages
app.onMessage(['hello', 'hi', 'hey'], async (context, state) => {
    const responseText = `Hello! I'm running in the "${DEPLOY_REGION}" region. How can I help you today?`;
    await context.sendActivity(responseText);
});

// Handle region inquiry messages
app.onMessage(['where are you running', 'where are you', 'region'], async (context, state) => {
    const responseText = `I am currently running in the "${DEPLOY_REGION}" region.`;
    await context.sendActivity(responseText);
});

// Handle all other messages (echo functionality)
app.onMessage(async (context, state) => {
    const userMessage = context.activity.text?.trim();
    
    if (!userMessage) {
        const responseText = 'Hello! I\'m your regional awareness bot. Ask me "Where are you running?" to learn about my deployment region, or just chat with me!';
        await context.sendActivity(responseText);
    } else {
        // Check if this message was already handled by specific handlers
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') ||
            lowerMessage.includes('where are you running') || lowerMessage.includes('where are you') || lowerMessage.includes('region')) {
            // Already handled by specific handlers, do nothing
            return;
        }
        
        // Echo back the user's message
        const responseText = `You said: "${userMessage}"`;
        await context.sendActivity(responseText);
    }
});

// Handle members added (greeting new users)
app.onConversationUpdate('membersAdded', async (context, state) => {
    const membersAdded = context.activity.membersAdded;
    for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
            const welcomeText = `Welcome! I'm your regional awareness bot running in the "${DEPLOY_REGION}" region. ` +
                'Ask me "Where are you running?" to learn about my deployment region, or just start chatting!';
            await context.sendActivity(welcomeText);
        }
    }
});

// Handle errors to prevent crashes
app.onError(async (context, error) => {
    console.error('Bot error:', error);
    try {
        await context.sendActivity('Sorry, I encountered an unexpected error. Please try again.');
    } catch (sendError) {
        console.error('Failed to send error message:', sendError);
    }
});

// Start the server using the Microsoft agents hosting Express integration
const server = startServer(app);

// Add health check endpoint
server.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        region: DEPLOY_REGION,
        timestamp: new Date().toISOString()
    });
});

// Add root endpoint with basic info
server.get('/', (req, res) => {
    res.json({
        name: 'Hello Region Bot',
        description: 'Azure Bot Framework POC with regional awareness functionality',
        region: DEPLOY_REGION,
        endpoints: {
            messages: '/api/messages',
            health: '/health'
        }
    });
});

console.log(`Bot is configured for deployment region: ${DEPLOY_REGION}`);

// Graceful shutdown handling
process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
});
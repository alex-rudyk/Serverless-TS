export default {
    failureFactor: 0.2, // Failure factor from 0 to 1. (0 - 0%, 1 - 100%, default: 0.2 - 20%).
    maxDelaySec: 15,
    region: process.env.AWS_REGION || 'us-east-1',
    accountId: process.env.ACCOUNT_ID || ''
}
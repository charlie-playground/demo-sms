# demo-sms
Demo repo

## Twilio SMS Service

This project now integrates the official Twilio SDK to reliably send SMS messages.

### Added dependency
- `twilio` ^4.18.0

### Required environment variables
| Variable | Description |
|---|---|
| `TWILIO_ACCOUNT_SID` | Your Twilio account SID |
| `TWILIO_AUTH_TOKEN`  | Your Twilio auth token |
| `TWILIO_FROM_NUMBER` | The verified phone number to send messages from |

### Example
```ts
import { twilio } from './services/twilioService.js';

await twilio.sendMessage('+14155550123', 'Hello from demo-sms!');
```

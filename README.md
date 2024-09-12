# Create Bot

This project provides a template to create a WhatsApp chatbot. It allows users to add and demo bot messages, design message flows, and deploy the Chatbot by adding their WhatsApp Business API credentials.

## Create

![create bot](<https://create-bot-sage.vercel.app/assets/screenshots/Screenshot%202024-09-10%20001009.png>)

## Deploy

![deploy bot](<https://create-bot-sage.vercel.app/assets/screenshots/IMG_9231.jpg>)

## Features

- **Message Demo**: Easily add and preview bot messages.
- **Flow Design**: Create and manage your chatbot's message flow.
- **Deployment**: Integrate your WhatsApp Business phone number, and deploy your chatbot.

## TODO

### front-end

1. ~~Add display and editing functionality for interactive list menus~~
2. Add display and editing support for the remaining WhatsApp message types (3/8)
   - ~~Text~~
   - ~~Image~~
   - ~~Document~~
   - ~~Location~~
   - ~~Video~~
   - ~~Interactive reply buttons~~
   - ~~Interactive list~~
   - ~~Interactive CTA with URL buttons~~
3. Add custom form message type
   - new WA message type
      - fields property e.g. name, surname, dob
   - high level, display WAForm instead of WAMessage
   - WAForm component handles capturing and "sending" messages step by step after user input
   - Add completion and failure message related to form
3. ~~Improve look and feel of select message type by adding icons/skeletons for each message type~~
4. ~~Add image upload support on front-end from message editing~~
5. Add build-flow support
   - ~~Logic~~
   - Error handling
   - How-to/info content
6. Add error/retry WhatsApp message support
7. Add config page with step by step on how to get your:
   - WA number
   - WA Access token
      - 24hr temp
      - Permanent
   - Integrate webhook
   - Add get help/contact button to reach out

### back-end

1. ~~Add image upload support on back-end to cloud service like cloudinary~~
2. ~~Save bot to DB~~
3. ~~Import flow server side and use with assigned verified WhatsApp number using a webhook~~
   - ~~Implement code~~
      - ~~`GET /api/whatsapp/webhook`~~
         - ~~Verifies webhook~~
      - ~~`POST /api/whatsapp/webhook`~~
         - ~~Handles user responses and follow-up messages~~
   - Add error handling
4. User sign in - social sign in - start with Google

### both

1. Add message actions - e.g. send email, slack w/ user response
2. Manage user bots
   - ~~Add~~
   - ~~Edit~~
   - ~~Delete~~
3. Show how to documentation/links/video on how to set up:
   - WhatsApp business number on Meta Developers console
   - access token/permanent access token
4. ~~Assign verified phone number to flow~~ - show QR to test https://wa.me/{number}?text=hi 
   - Bot config
      - ~~Input phone number~~
      - ~~Input `WHATSAPP_TOKEN` (used as auth for sending messages)~~

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- npm, yarn, pnpm, or bun as your package manager

## Running the development server

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   Choose your preferred package manager:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open the application:**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the result.
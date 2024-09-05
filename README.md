# WhatsApp Chatbot Template

This project provides a template to create a WhatsApp chatbot. It allows users to add and demo bot messages, design message flows, and deploy the Chatbot by adding their WhatsApp Business API credentials.

## TODO

### front-end

1. ~~Add display and editing functionality for interactive list menus~~
2. Add display and editing support for the remaining WhatsApp message types (3/8)
   - ~~Text~~
   - ~~Image~~
   - Document
   - Location
   - Video
   - Interactive reply buttons
   - ~~Interactive list~~
   - Interactive CTA with URL buttons
3. Improve look and feel of select message type by adding icons/skeletons for each message type
4. Add image upload support on front-end from message editing
5. Add logic for follow up messages - flow logic
6. Add error/retry WhatsApp message support

### back-end

1. Add image upload support on back-end to cloud service like cloudinary `{userId}/{flowId}/images/{imageId}.{imageFileExtension}`
2. Export flow to JSON - write to file/DB
   - Could write as JSON file on cloudinary - `userId/flowId`
3. Import flow server side and assign to verified WhatsApp number using a webhook
4. User sign in - social sign in - start with Google

### both

1. Add message actions - e.g. send email, slack w/ user response
2. Manage user phone numbers
3. Show how to documentation/links/video on how to set up WhatsApp business number on Meta Developers console
4. Assign verified phone number to flow - show QR to test https://wa.me/{number}?text=hi 

## Features

- **Message Demo**: Easily add and preview bot messages.
- **Flow Design**: Create and manage your chatbot's message flow.
- **Deployment**: Integrate your WhatsApp Business phone number and secret key, and deploy your chatbot.

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- npm, yarn, pnpm, or bun as your package manager

## Getting Started

Follow these steps to run the development server:

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
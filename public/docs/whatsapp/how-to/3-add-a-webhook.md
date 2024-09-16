### 3. **Adding the Webhook**

#### Step 1: Access Webhooks Settings
- In the **App Dashboard**, navigate to **WhatsApp** > **Getting Started**.
- Under the **Webhook** section, you’ll be asked to provide a URL for receiving webhook notifications.

#### Step 2: Verify the Webhook
- Enter `https://create-bot-sage.vercel.app/api/whatsapp/webhook` into the **Callback URL** field.
- Enter `create_bot` into the **Verify Token** field.
- Click **Verify and Save**. Meta will send a request to our webhook URL which will respond with the verification token to confirm the webhook.

#### Step 3: Set Subscription Fields
- Once verified, subscribe to the **messages** and **status updates** events.
- Save the settings.
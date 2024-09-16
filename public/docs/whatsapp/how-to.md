### 1. **Setting up a Meta Developers Account**

#### Step 1: Go to Meta for Developers
- Open your browser and navigate to the Meta for Developers portal: [https://developers.facebook.com/](https://developers.facebook.com/).

#### Step 2: Create a Meta Developer Account
- Click on **Get Started** and log in with your Facebook credentials.
- Accept the terms and conditions.
- Complete the setup by providing any additional required information.

#### Step 3: Verify Your Email
- Once you’ve completed the account setup, you will receive a verification email.
- Verify your email to activate your developer account.

---

### 2. **Creating an App with the WhatsApp Business Service**

#### Step 1: Create a New App
- Once logged in to the Meta Developer Portal, go to **My Apps** and click on **Create App**.
- Choose **Business** as the app type.

#### Step 2: Provide App Details
- Enter the **App Name** and your **email address**.
- Under **App Purpose**, select **Yourself or your own business**.
- Click **Create App**.

#### Step 3: Add WhatsApp Business API
- In your app dashboard, navigate to the **Add a Product** section and select **WhatsApp**.
- Click on **Set Up** next to the WhatsApp Business API.

---

### 3. **Adding the Webhook**

#### Step 1: Access Webhooks Settings
- In the **App Dashboard**, navigate to **WhatsApp** > **Getting Started**.
- Under the **Webhook** section, you’ll be asked to provide a URL for receiving webhook notifications.

#### Step 2: Provide the Webhook URL
- Your application should generate a webhook URL for the user (e.g., `https://yourapp.com/webhook`).
- Copy the generated webhook URL from your application.

#### Step 3: Verify the Webhook
- Enter the webhook URL into the **Callback URL** field.
- Provide a **Verify Token** (a unique string that you’ll also store on your server to verify webhook requests).
- Click **Verify and Save**. Meta will send a request to the URL, and your server must respond with the verification token to confirm the webhook.

#### Step 4: Set Subscription Fields
- Once verified, choose the types of events you want to subscribe to, such as **messages** or **status updates**.
- Save the settings.

---

### 4. **Adding a Phone Number**

#### Step 1: Access WhatsApp Settings
- In the WhatsApp Business API settings, you’ll see a section for **Getting Started**.
- Under **Step 2: Add a Phone Number**, click on **Add Phone Number**.

#### Step 2: Enter Phone Number Details
- Provide your **Business Phone Number** (must be able to receive messages).
- Verify the phone number by entering the verification code sent via SMS or voice call.

#### Step 3: Activate Phone Number
- Once verified, the number will be added to your WhatsApp Business account, and you’ll be ready to send messages.

---

### 5. **Generating a Temporary Access Token**

#### Step 1: Generate Token
- Go to your **App Dashboard** and select the **WhatsApp** product.
- In the left menu, click on **Getting Started**.
- Under **Step 4: Get Temporary Access Token**, click on **Generate Token**.
- This token will allow you to make API requests to WhatsApp Business for a limited time (expires in 24 hours).

#### Step 2: Copy the Token
- Copy the generated token, as you’ll need it for API requests.
- Remember, this is a temporary token and will need to be refreshed regularly.

---

### 6. **Creating a System User with a Permanent Access Token**

#### Step 1: Create a System User
- Navigate to the **Business Settings** in Meta Business Manager: [https://business.facebook.com/settings/](https://business.facebook.com/settings/).
- On the left side menu, click on **System Users**.
- Click **Add** and create a new **System User**, selecting the role as **Admin** or **Employee**, based on your needs.

#### Step 2: Assign Assets to System User
- Assign the WhatsApp Business app to the system user by clicking **Add Assets** and selecting the app.

#### Step 3: Generate a Permanent Access Token
- In **Business Settings**, go to the **System User** you just created.
- Click on **Generate New Token**.
- Select the app and the necessary permissions (e.g., `whatsapp_business_management`, `whatsapp_business_messaging`).
- This will create a **Permanent Access Token** that does not expire.

#### Step 4: Save the Token
- Copy the permanent token and store it securely. This token will be used for making authorized API requests.

---

### **Tips:**
- **Webhook Verification:** Your server must respond with the verification token in response to Meta’s request when you set up the webhook.
- **Webhook Events:** Make sure your webhook is set to handle different event types based on your application needs, such as receiving messages or status updates.
- **Security:** Ensure the permanent access token is stored securely and is not exposed in public codebases.
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
# Blockonomics-Node-js-API-Tester
This repository contains sample code for testing integration with the Blockonomics API. 

🚀 Getting Started
Prerequisites
1. To successfully run and test this application, you will need the following:
2. Blockonomics Account: Required to access your API key and manage payment settings (wallets, callbacks).
3. Node.js and npm: Used to build and run your backend server. (v14 or higher is recommended)
4. Code Editor (VS Code): A tool for writing and editing your application code.
5. Ngrok: Essential for exposing your local server to the internet so Blockonomics can send payment notification callbacks (IPNs).


🚀 Step-by-Step Implementation
Follow these steps exactly as they appear in the tutorial video. Steps 5 through 9 involve using the code files provided in this repository.

Step 1: Let’s start by setting up Node.js project. (use: create a folder locally eg on desktop)

Step 2: Create account on Blockonomics. (on Blockonomic.co)

Step 3: Add wallets. (on Blockonomic.co)

Step 4: Create your store. (on Blockonomic.co)

Step 5: Installing your project dependencies in Visual Studio Code on your local machine. (Use: package.json) (https://github.com/planetpluto163/Blockonomics-Node-js-API-Tester/blob/main/package.json)

Step 6: Create a .env file to store our Blockonomics API key and callback settings. (Use: .env.example) (https://github.com/planetpluto163/Blockonomics-Node-js-API-Tester/blob/main/.env)

Step 7: Building the Backend in index.js for BTC Address Generation, Live Price Fetching & Transaction Monitoring. (Use: index.js)

Step 8: Build your Crypto Checkout Page with BTC & USDT Options locally. (Use: index.html)

Step 9: Build Your USDT Payment Confirmation Page. (Use: confirmation.html)

Step 10: Expose your local server with ngrok (remember to have installed ngrok). (use: Local command line action)

💻 Code Setup and Execution
1. Running the Server & Ngrok
Start your Node.js server:

node index.js

Run Ngrok in a separate terminal window:

# Assuming your server is running on port 3000
ngrok http 3000

Configure Callback URL: Once Ngrok is running, copy the public HTTPS URL it provides. You must then:

Restart your Node.js server (node index.js).

Plug the public URL into your .env file for the CALLBACK_URL variable, ensuring the path remains correct (e.g., https://your-domain.ngrok.app/payment_callback?secret=...).

Note: The code samples are set to run on testnet for safe initial testing. Always update configurations for mainnet before deploying for live transactions.

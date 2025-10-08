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

Step 1: Let’s start by setting up Node.js project. (N/A – Local command line action)

Step 2: Create account on Blockonomics. (N/A – External action)

Step 3: Add wallets. (N/A – External action)

Step 4: Create your store. (N/A – External action)

Step 5: Installing your project dependencies in Visual Studio Code on your local machine. (Uses: package.json)

Step 6: Create a .env file to store our Blockonomics API key and callback settings. (Uses: .env.example)

Step 7: Building the Backend in index.js for BTC Address Generation, Live Price Fetching & Transaction Monitoring. (Uses: index.js)

Step 8: Build your Crypto Checkout Page with BTC & USDT Options locally. (Uses: index.html)

Step 9: Build Your USDT Payment Confirmation Page. (Uses: confirmation.html)

Step 10: Expose your local server with ngrok (remember to have installed ngrok). (N/A – Local command line action)

💻 Code Setup and Execution
To quickly set up the code from the repository, follow the consolidated steps below.

1. Get the Code & Install Dependencies
Download or Clone this repository.

Open your terminal in the project directory.

Run the installation commands (as shown in Step 5):

npm init -y
npm install express axios dotenv


2. Configure Credentials (Step 6)
Locally, rename the provided file .env.example to .env.

Fill in your specific values in the .env file, getting the key and secret from your Blockonomics store settings.

3. Running the Server
Start the Node.js server from your terminal:

node index.js


4. Setting up Ngrok (Step 10)
Expose your local server to the public internet to receive payment callbacks:

# Assuming your server is running on port 3000
ngrok http 3000


CRITICAL: Update your .env file's CALLBACK_URL with the public HTTPS URL provided by Ngrok, ensuring it includes the /payment_callback endpoint.

Note: The code samples are set to run on testnet for safe initial testing. Always update configurations for mainnet before deploying for live transactions.

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const product = {
  name: 'Cool T-Shirt',
  priceUSD: 25
};

const paymentStatusMap = {}; // address → status

async function getCryptoPrice(crypto, currency) {
  const url = `https://www.blockonomics.co/api/price?crypto=${crypto}&currency=${currency}`;
  const headers = { accept: 'application/json' };
  const response = await axios.get(url, { headers });
  return response.data.price;
}

async function getBTCAddress(callbackUrl, apiKey) {
  const url = `https://www.blockonomics.co/api/new_address?match_callback=${encodeURIComponent(callbackUrl)}&crypto=BTC`;
  const response = await axios.post(url, {}, {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${apiKey}`
    }
  });
  if (!response.data.address) throw new Error('BTC address generation failed');
  return response.data.address;
}

async function getUSDTAddress(callbackUrl, apiKey) {
  const url = `https://www.blockonomics.co/api/new_address?match_callback=${encodeURIComponent(callbackUrl)}&crypto=USDT`;
  const response = await axios.post(url, {}, {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${apiKey}`
    }
  });
  if (!response.data.address) throw new Error('USDT address generation failed');
  return response.data.address;
}

async function monitorUSDTTransaction(txhash, callbackUrl, apiKey) {
  const url = `https://www.blockonomics.co/api/monitor_tx`;
  const payload = {
    crypto: 'USDT',
    testnet: 1,
    txhash,
    match_callback: callbackUrl
  };
  await axios.post(url, payload, {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${apiKey}`
    }
  });
}

app.get('/checkout', async (req, res) => {
  try {
    const btcPriceUSD = await getCryptoPrice('BTC', 'USD');
    const btcAmount = (product.priceUSD / btcPriceUSD).toFixed(8);
    const btcAddress = await getBTCAddress(process.env.CALLBACK_URL, process.env.BLOCKONOMICS_API_KEY);

    res.json({
      product: product.name,
      priceUSD: product.priceUSD,
      btcAmount,
      btcAddress
    });
  } catch (error) {
    console.error('❌ BTC Checkout error:', error.message);
    res.status(500).json({ error: 'BTC checkout failed' });
  }
});

app.get('/checkout-usdt', async (req, res) => {
  try {
    const usdtPriceUSD = await getCryptoPrice('USDT', 'USD');
    const usdtAmount = (product.priceUSD / usdtPriceUSD).toFixed(2);
    const usdtAddress = await getUSDTAddress(process.env.CALLBACK_URL, process.env.BLOCKONOMICS_API_KEY);

    res.json({
      product: product.name,
      priceUSD: product.priceUSD,
      usdtAmount,
      usdtAddress
    });
  } catch (error) {
    console.error('❌ USDT Checkout error:', error.message);
    res.status(500).json({ error: 'USDT checkout failed' });
  }
});

app.post('/monitor-usdt', async (req, res) => {
  const { txhash } = req.body;
  try {
    await monitorUSDTTransaction(txhash, process.env.CALLBACK_URL, process.env.BLOCKONOMICS_API_KEY);
    res.status(200).send('Monitoring started');
  } catch (error) {
    console.error('❌ Monitor USDT error:', error.message);
    res.status(500).send('Failed to monitor transaction');
  }
});

app.post('/payment-callback', (req, res) => {
  const secret = req.query.secret;
  const { addr, status, txid, value } = req.query;

  if (secret !== process.env.CALLBACK_SECRET) {
    return res.status(403).send('Forbidden: Invalid secret');
  }

  paymentStatusMap[addr] = {
    status: parseInt(status),
    txid,
    value: parseInt(value)
  };

  res.status(200).send('Callback received');
});

app.get('/payment-status', (req, res) => {
  const { address } = req.query;
  const status = paymentStatusMap[address];
  if (status) {
    res.json(status);
  } else {
    res.json({ status: -1 });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

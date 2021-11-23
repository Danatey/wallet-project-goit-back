const db = require("../config/db");
const app = require("../app");
const express = require('express');
require("dotenv").config();
const { OAuth2Client } = require('google-auth-library');

const PORT = process.env.PORT || 3001;
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

app.use(express.json());

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});

db.then(() => {
  app.listen(PORT, async () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not run. Error: ${err.message}`);
});

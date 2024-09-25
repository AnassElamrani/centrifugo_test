commands :

npm install -y
npm run start


config file :

{
  "token_hmac_secret_key": "",
  "admin_password": "your_admin_password",
  "admin_secret": "your_admin_secret",
  "allowed_origins": ["*"],
  "client_insecure": true
}


login into centrefugo interface and send this object as example :

{
  "id": 1,
  "name": "ahmed",
  "age": 22
}

method : Publish
channel: updates

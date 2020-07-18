# node-xmpp-vcard

# Install

```
$ git clone https://github.com/skorotkiewicz/node-xmpp-vcard
$ mv config.default.js config.js
$ vim config.js
$ yarn install (npm install)
$ yarn run start (npm start)
```

### Install using Docker

```
$ git clone https://github.com/skorotkiewicz/node-xmpp-vcard
$ mv config.default.js config.js
$ vim config.js
```

### Without docker-compose:  
```
$ docker build -t node-xmpp-vcard .
$ docker run -p 3000:3000 -d node-xmpp-vcard
```


### With docker-compose:  
```
$ docker-compose up -d
```



# Usage
```
/api/vcard/:jid/:data
```

## Data

| :data      | description  |
| ---------- | ------------ |
| `FN`       | Full name    |
| `NUMBER`   | Phone number |
| `USERID`   | Mail         |
| `URL`      | Website      |
| `BDAY`     | Birthday     |
| `NICKNAME` | Nickname     |
| `DESC`     | Description  |

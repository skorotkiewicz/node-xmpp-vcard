const express  = require('express');
const app      = express();
const cors     = require('cors');
const config   = require('./config');
const jsdom    = require("jsdom");
const {client, xml} = require('@xmpp/client')
const debug = require('@xmpp/debug')


const xmpp = client({
  service: config.service,
  username: config.username,
  password: config.password,
});

if (process.env.NODE_ENV !== 'production')
    debug(xmpp, true)


const {iqCaller} = xmpp
xmpp.start().catch(console.error)

app.use(cors());
app.get('/', info)
app.get('/api/vcard/:jid/:data', getVCard)

async function getVCard(req, res) {

        let jid = req.params.jid;
        let data = req.params.data.toUpperCase();

        let allowedData = ['FN', 'NUMBER', 'USERID', 'URL', 'BDAY', 'NICKNAME', 'DESC'];

        if (!allowedData.includes(data)) {
            return res.status(400).json('Allowed data are: FN, NUMBER, USERID, URL, BDAY, NICKNAME, DESC');
        }

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(jid)) {
            const response = await iqCaller.request(
                xml("iq", { type: "get", to: jid }, xml("vCard", "vcard-temp")), 30 * 1000
            );
        
            const vcardRow = response.getChild("vCard", "vcard-temp").toString();

            const dom = new jsdom.JSDOM(vcardRow);
            var vcard = dom.window.document.querySelector(data).textContent;
            
            return res.status(200).json(vcard);
        } else {
            return res.status(400).json('This is no valid JID.');
        }

}

function info(req, res) {
    return res.status(200).json('Usage: /api/vcard/:jid/:data -> Allowed data are: FN, NUMBER, USERID, URL, BDAY, NICKNAME, DESC');
}

// handle errors
if (process.env.NODE_ENV == 'production') {
    // eslint-disable-next-line no-unused-vars
    app.use(function(err, req, res, next) {
      if (err.status === 500)
          res.status(500).json({ message: "Something looks wrong" });
      else
          res.status(500).json({ message: "Something looks wrong" });
    });
}

// throw 404 if URL not found
app.all("*", function(req, res) {
    return res.status(404).json({ message: "Page not found" });
});
  
app.listen(3000, function() {
    console.log('Node server listening on port 3000');
});
  
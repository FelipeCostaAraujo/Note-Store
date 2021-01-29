const functions = require('firebase-functions');
const watson = require('watson-developer-cloud/assistant/v1')
require('dotenv').config()

const cors = require('cors')({ origin: true })

const chatbot = new watson({
    'username': process.env.ASSISTANT_USERNAME,
    'password': process.env.ASSISTANT_PASSWORD,
    'version': process.env.VERSION,
});

const workspace_id = process.env.ASSISTANT_ID;

exports.conversa = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let payload = {
            workspace_id,
            context: req.body.context || {},
            input: req.body.input || {}
        };
        console.log(req);

        chatbot.message(payload, (err, data) => {
            if (err) {
                return res.status(err.code || 500).json(err);
            }

            return res.json(trataResposta(payload, data));
        })
    })
});

const trataResposta = (payload, resposta) => {
    console.log('watson disse: ', resposta.output.text[0]);
    return resposta;
}
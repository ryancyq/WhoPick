'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand

const tg = process.env.NODE_ENV === 'production' ?
    new Telegram.Telegram(process.env.BOT_TOKEN, {
        webhook: {
            url: process.env.HEROKU_URL + '/' + process.env.BOT_TOKEN,
            port: process.env.PORT,
            host: 'localhost'
        }
    }) : 
    new Telegram.Telegram(process.env.BOT_TOKEN)

class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('pong')
    }

    get routes() {
        return {
            'pingCommand': 'pingHandler'
        }
    }
}

tg.router
    .when(
        new TextCommand('ping', 'pingCommand'),
        new PingController()
    )
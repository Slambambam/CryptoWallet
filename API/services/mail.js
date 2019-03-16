const mailer = require('node-mandrill');
sendMail = async (to, toName, sub, body) => {
    let mandrill = mailer('P1lzcHMGpN9II7tbEKpiCg');
    // return new Promise((rs, rj) => {
    mandrill('/messages/send', {
        message: {
            to: [{
                email: to,
                name: toName
            }],
            from_email: 'no-reply@mail.com',
            subject: sub,
            html: body
        }
    }, console.log);
};
module.exports = { sendMail };
// const faunadb = require('faunadb')
// const faunaClient = new faunadb.Client({
//     secret: process.env.FAUNADB_SERVER_SECRE,
//     domain: "db.us.fauna.com"
// })
// const q = faunadb.query

// exports.handler = async (event, context) => {
//     let resp

//     console.log('PLEASE SHOW UP')
//     if (event.httpMethod === 'POST') {
//         resp = await uploadData()
//     } else {
//         resp = { statusCode: 500, body: 'GET OUTTA HERE' }
//     }

//     return { statusCode: resp.statusCode, body: resp.body }

//     async function uploadData() {
//         console.log('uploading dataaaa')
//         try {
//             console.log(event.body)
//             const result = {
//                 data: event.body
//             }
//             const req = await faunaClient.query(q.Create(q.Collection('test'), { data: result }))
//             console.log(req)
//             return { statusCode: 200, body: JSON.stringify({ newMem: req }) }
//         } catch (err) {
//             return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
//         }
//     }
// }

exports.handler = function (event, context, callback) {
    callback(null, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        statusCode: 200,
        body: 'hello-world'
    });
};
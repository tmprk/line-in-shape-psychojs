// Grab our credentials from a .env file or environment variables
require('dotenv').config();
const { DATABASE_URL, SUPABASE_SERVICE_API_KEY} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async event => {
    if (event.httpMethod == 'POST') {
        console.log(typeof(event.body))
        console.log('body:', event.body, '\n')
        console.log('filename:', JSON.parse(event.body).filename, '\n')
        console.log('contents:', JSON.parse(event.body).csv, '\n')

        const body = JSON.parse(event.body)
        const filename = body.filename
        const contents = body.csv

        // Insert a row
        const { data, error } = await supabase.storage
            .from('results')
            .upload(filename, contents, {
                contentType: 'text/csv'
            })

        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({
        //         message: 'sent a post request containing blob'
        //     }),
        // }

        // Did it work?
        if (data) {
            console.log(data);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'sent a post request containing blob'
                }),
            }
        } else {
            console.log(error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: "POST didn't go through"
                }),
            }
        }
    }

}
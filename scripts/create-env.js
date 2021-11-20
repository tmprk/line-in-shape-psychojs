const fs = require('fs')
fs.writeFileSync('./.env', `DATABASE_URL=${process.env.DATABASE_URL}\nSUPABASE_SERVICE_API_KEY=${process.env.SUPABASE_SERVICE_API_KEY}`)
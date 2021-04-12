'use strict'
const http = require('http')
const s3Service = require('./services/s3Service')

const { APP_PORT, APP_HOST } = process.env

const server = http.createServer(function (req, res) {
  // TODO: Create a more interesting test example
  const currentDateString = new Date().toISOString();
  const bucketName = 'testbucket'; // It could be into .env if were necessary
  const fileName = `testfile_${currentDateString}.txt`;
  const fileContent = `File created at ${currentDateString}`;

  // Creates a file named testfile into minio bucket when ANY request is received
  s3Service.uploadTestFile(bucketName, fileName, fileContent)
    .then(
      result => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'Application/json')
        res.end(JSON.stringify(result))
      },
      err => {
        console.error('ERROR:', err.message)

        res.statusCode = 500
        res.setHeader('Content-Type', 'Application/json')
        res.end(JSON.stringify({
          error: err.message
        }))
      })
})

// Start the server
server.listen(APP_PORT, () => {
  // console.log('Server running on port', PORT)
})

server.on('listening', () => { console.log(`Running version ${process.env.npm_package_version} on %s:%s`, APP_HOST, APP_PORT) })
server.on('error', (err) => { console.error('Something wrong happened:', err) })
server.on('close', () => { console.log('server closed...') })

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //Solution 1 - Bad
    // fs.readFile('test-file.txt', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //     }
    //     res.end(data);
    // });
    //Solution 2: Streams - this has the back pressure issue
    // const readable = fs.createReadStream('test-file111.txt');
    // readable.on('data', (chunk) => res.write(chunk));
    // readable.on('end', () => res.end());
    // readable.on('error', () => {
    //     res.statusCode = 500;
    //     res.end('File not found!!!');
    // });
    // Solution 3: pipe
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
});

server.listen(8000, 'localhost', () => console.log('Listening...'));

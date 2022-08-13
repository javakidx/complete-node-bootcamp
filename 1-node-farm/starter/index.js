const http = require('http');
const fs = require('fs');
const slugify = require('slugify');

// const textIn = fs.readFileSync("./txt/input.txt", "utf8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.`;
// fs.writeFileSync("./txt/out-test.txt", textOut, "utf8");

// Asynchronous Non-blocking
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         if (err) {
//           console.error(err);
//         }
//       });
//     });
//   });
// });

// console.log("Will read and then write file");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);
const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW**');
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');
  } else if (pathName === '/api') {
    fs.readFile(`${__dirname}/dev-data/data.json`, 'utf8', (err, data) => {
      console.log(data);
      res.writeHead(200, {
        'content-type': 'application/json',
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});

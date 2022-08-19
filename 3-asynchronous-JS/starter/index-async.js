const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject("I couldn't read the file. 😢");
            resolve(data);
        });
    });
};

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject("I couldn't write the file.😢");
            resolve('Data successfully written.');
        });
    });
};

const getPic = async () => {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(data);
        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );

        console.log(res.body.message);

        const result = await writeFilePromise(
            `${__dirname}/dog-image.txt`,
            res.body.message
        );
        console.log(result);
    } catch (err) {
        if (err.message) {
            console.log(err.message);
        } else {
            console.log(err);
        }
    }
};

getPic();

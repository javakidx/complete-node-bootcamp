const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

const writeFilePromise = (file, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve('File written');
    });
  });

const getDogPic = async () => {
  try {
    const data = await readFilePromise('dog.txt');
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const responses = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const images = responses.map((e) => e.body.message);

    const result = await writeFilePromise('dog-image.txt', images.join('\n'));
    console.log(result);
  } catch (err) {
    return err.message;
  }

  return '2: READY😎';
};

(async () => {
  console.log('1: STARTED PROCESSING');
  const result = await getDogPic();
  console.log(result);
})();
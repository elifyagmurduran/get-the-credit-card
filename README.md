# get the credit card 💳

this is a simple node.js project that provides information about credit cards through API calls. the application retrieves details about credit cards, including validity, scheme (VISA, MASTERCARD, AMEX), and, when available, the bank.

## description

the goal is to retrieve a series of information on credit cards through API calls.
the application should provide its consumers with the details about credit cards:

- valid/not valid;
- the scheme (i.e VISA, MASTERCARD or AMEX);
- the bank when it is available.

### step 1 — card verification

a REST API service that replies to a GET call:

`GET http://localhost:3000/api/card-scheme/verify/<card-number>`

example response:

```json
{
  "success": true,
  "payload": {
    "scheme": "visa",
    "type": "debit",
    "bank": "UBS"
  }
}
```

card info is fetched from [BinList](https://binlist.net/).

### step 2 — card scheme stats

a REST API service that includes the verify endpoint from step 1 and adds a stats endpoint. every call to verify is tracked in memory, and the stats endpoint returns hit counts:

`GET http://localhost:3001/api/card-scheme/verify/<card-number>`
`GET http://localhost:3001/api/card-scheme/stats?start=1&limit=3`

example stats response:

```json
{
  "success": true,
  "start": 1,
  "limit": 3,
  "size": 133,
  "payload": {
    "45717360": 5,
    "52345300": 4,
    "37456789": 1
  }
}
```

where `size` is the byte length of the payload and the payload lists cards that were verified alongside the number of requests made for each.

---

## how to use the project 🚀

### prerequisites

- [Node.js](https://nodejs.org/) installed (or [Docker](https://www.docker.com/) if you prefer containers)

### running with node

#### step 1

```bash
cd step1_verify
npm install
node step1.js
```

server starts on port 3000. test it:

```
http://localhost:3000/api/card-scheme/verify/45717360
```

#### step 2

```bash
cd step2_card-scheme
npm install
node step2.js
```

server starts on port 3001. test it:

```
http://localhost:3001/api/card-scheme/verify/45717360
http://localhost:3001/api/card-scheme/stats?start=1&limit=3
```

### running with docker

#### step 1

```bash
cd step1_verify
docker build -t step1-verify .
docker run -p 3000:3000 step1-verify
```

#### step 2

```bash
cd step2_card-scheme
docker build -t step2-card-scheme .
docker run -p 3001:3001 step2-card-scheme
```

---

## license 📝

this project is licensed under the MIT License.

## contact 📬

if you have any further questions:

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Gmail][gmail-shield]][gmail-url]
[![twitter][twitter-shield]][twitter-url]

[linkedin-shield]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/ya%C4%9Fmur-duran-645510182/
[twitter-shield]: https://img.shields.io/badge/twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white
[twitter-url]: https://www.linkedin.com/in/ya%C4%9Fmur-duran-645510182/
[gmail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: mailto:elifyagmurduran@gmail.com?

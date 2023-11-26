# get the credit card 💳

this is a simple node.js project that provides information about credit cards through API calls. the application retrieves details about credit cards, including validity, scheme (VISA, MASTERCARD, AMEX), and, when available, the bank.

## description

the goal is to retrieve a series of information on credit cards through API calls.
the application should provide its consumers with the details about credit cards:

- valid/not valid;
- the scheme (i.e VISA, MASTERCARD or AMEX);
- the bank when it is available.

### step 1

create a REST API service that will reply to a GET call. The endpoint should look like this: this:

`GET <web-server-address>/api/card-scheme/verify/<card-number>`

in case of successful response, the returned object should look like this:

```
{
  "success": true
    "payload" : {
          "scheme": "visa",
          "type" : "debit",
          "bank" : "UBS"
        }
}
```

to obtain this information, you should use a 3rd party service, such as [BinList](https://binlist.net/).

### step 2 (incomplete for now)

create a REST API service that will reply to a GET call. The endpoint should look like this:

`GET <web-server-address>/api/card-scheme/stats?start=1&limit=3`

in case of successful response, the returned object should look like this:

```
{
      "success": true
      "start": 1,
      "limit": 3,
      "size": 133,
      "payload": {
        "<card-xyz>": 5,
        "<card-jkl>": 4,
        "<card-bnm>": 1
      }
}
```

where `size` represents the byte of the payload. Inside the payload, provide the list of cards that were checked in the step 1 alongside the number of requests made for each card. You can store this information in memory or on a file.

---

## how to use the project 🚀

### prerequisites

- you should have [Node.js](https://nodejs.org/) installed.

### installation

clone the repository:

```bash
git clone https://github.com/your-username/node-project_credit-card.git
```

#### for step 1:

1. navigate to the project folder:
   ```node
   cd step1_verify
   ```
2. install dependencies:
   ```node
   npm install express
   npm install axios
   ```
3. run the project

#### for step 2

1. Navigate to the project folder:
   ```node
   cd step2_card-scheme
   ```
2. Install dependencies:
   ```node
   npm install express
   ```
3. run the project

---

## license 📝

This project is licensed under the MIT License.

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

# Get the Credit Card

This is a simple Node.js project that provides information about credit cards through API calls. The application retrieves details about credit cards, including validity, scheme (VISA, MASTERCARD, AMEX), and, when available, the bank.

## Description

The goal is to retrieve a series of information on credit cards through API calls.
The application should provide its consumers with the details about credit cards:
* Valid/not valid;
* The scheme (i.e VISA, MASTERCARD or AMEX);
* The bank when it is available.

### Step 1
Create a REST API service that will reply to a GET call. The endpoint should look like this: this:

`GET <web-server-address>/api/card-scheme/verify/<card-number>`

In case of successfull response, the returned object should look like this:
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
To obtain this information, you should use a 3rd party service, such as [BinList](https://binlist.net/).

### Step 2 (incomplete for now)

Create a REST API service that will reply to a GET call. The endpoint should look like this:

`GET <web-server-address>/api/card-scheme/stats?start=1&limit=3`

In case of successfull response, the returned object should look like this:
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
where `size` represents the byte of the payload. Inside the payload, provide the list of cards that were checked in the Step 1 alongside the number of requests made for each card. You can store this information in memory or on a file.

---

## How To Use The project

### Prerequisites

- [Node.js](https://nodejs.org/) installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/node-project_credit-card.git
```

#### For Step 1:

1. Navigate to the project folder:
   ```node
   cd step1_verify
   ```
2. Install dependencies:
   ```node
   npm install express
   npm install axios
   ```

#### For Step 2

1. Navigate to the project folder:
   ```node
   cd step2_card-scheme
   ```
2. Install dependencies:
   ```node
   npm install express
   ```

---

## License

This project is licensed under the MIT License.

## Contact

If you have any further questions:

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Gmail][gmail-shield]][gmail-url]
[![twitter][twitter-shield]][twitter-url]

[linkedin-shield]: https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/ya%C4%9Fmur-duran-645510182/
[twitter-shield]: https://img.shields.io/badge/twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white
[twitter-url]: https://www.linkedin.com/in/ya%C4%9Fmur-duran-645510182/
[gmail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: mailto:elifyagmurduran@gmail.com?

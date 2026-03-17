# Get the card

The following is a **TDD Kata**, an exercise in _coding_, _refactoring_ and _test-first_.

## Description

The goal is to retrieve a series of information on credit cards through API calls.
The application should provide its consumers with the details about credit cards:
* Valid/not valid;
* The scheme (i.e VISA, MASTERCARD or AMEX);
* The bank when it is available.

## Before you start..
- You should commit your code on GitHub (or any other SCM repository you prefer);
- You should release your work under an OSI-approved open-source license of your choice;
- Include your documentation/notes on README files within the repo.

## Business Requirements
_note:_ you can create two separate project/folders for each step. If so, provide a common method to execute and test e.g. Docker

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
#### Useful info
To obtain this information, you should use a 3rd party service, such as [BinList](https://binlist.net/).


### Step 2 - bonus

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

## Technical requirements
- No restriction on packages/libraries.
- We do not suffer from [NIH](https://en.wikipedia.org/wiki/Not_invented_here)
- No need for authentications systems.


**IMPORTANT:** Provide a README with instructions on how to compile and run the application.

**CODE SUBMISSION:** Add the code to your own Github account and send us the link.

---

For more questions contact: recruitment@datatellers.info

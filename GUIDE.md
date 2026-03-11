# Exercise Guide: Get the Credit Card (Beginner-Friendly)

---

## PART 0: Understanding the Fundamentals

Before we touch the exercise, let's learn (or review) every concept you'll need. If you already know some of these, feel free to skip ahead.

---

### 0.1 — What is JavaScript?

JavaScript (JS) is a programming language. It was originally created to make web pages interactive (buttons, animations, form validation), but today it's used everywhere — including on servers.

Key things to know:
- **Variables** store values. You declare them with `const` (can't change) or `let` (can change):
  ```js
  const name = "Alice";   // can't reassign
  let counter = 0;        // can reassign later
  counter = counter + 1;  // now counter is 1
  ```
- **Objects** are collections of key-value pairs (like a dictionary):
  ```js
  const person = {
    name: "Alice",
    age: 30
  };
  console.log(person.name);  // prints "Alice"
  ```
- **Functions** are reusable blocks of code:
  ```js
  function greet(name) {
    return "Hello, " + name;
  }
  greet("Alice");  // returns "Hello, Alice"
  ```
- **Arrow functions** are a shorter way to write functions:
  ```js
  const greet = (name) => {
    return "Hello, " + name;
  };
  ```
- **`require()`** is how you import libraries (packages) in Node.js:
  ```js
  const express = require("express");  // loads the "express" library
  ```

---

### 0.2 — What is Node.js?

Normally, JavaScript only runs inside a web browser (Chrome, Firefox, etc.). **Node.js** lets you run JavaScript *outside* the browser — on your computer, on a server, anywhere.

Why does this matter? Because we're building a **web server** (a program that listens for requests from the internet and sends back responses). Node.js lets us write that server in JavaScript.

**npm** (Node Package Manager) comes bundled with Node.js. It lets you:
- **Install libraries** (other people's code you can reuse): `npm install express`
- **Manage your project** via a `package.json` file (more on that below)

---

### 0.3 — What is `package.json`?

Every Node.js project has a `package.json` file. Think of it as your project's **ID card**. It contains:
- The project name and version
- Which libraries (dependencies) your project needs
- Scripts (shortcuts for commands)

Example:
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.1"
  }
}
```

When someone clones your project and runs `npm install`, npm reads this file and downloads all the listed dependencies into a folder called `node_modules/`.

The `^` symbol means "this version or any compatible newer version."

---

### 0.4 — What is a REST API?

Let's break this down word by word:

- **API** (Application Programming Interface) — a way for two programs to talk to each other. Think of it like a waiter in a restaurant: you (the client) tell the waiter what you want, the waiter goes to the kitchen (the server), and brings back your food (the response).

- **REST** (Representational State Transfer) — a set of rules for how APIs should work over the web. The key ideas:
  - You use **URLs** (web addresses) to identify resources
  - You use **HTTP methods** to say what you want to do:
    - `GET` = "give me data" (like reading)
    - `POST` = "here's new data" (like creating)
    - `PUT` = "update this data"
    - `DELETE` = "remove this data"
  - The server sends back data (usually as **JSON**)

In this exercise, we only use `GET` — we're just *reading* card information.

**Example:** When you type `http://localhost:3000/api/card-scheme/verify/45717360` in your browser, your browser sends a GET request to your server, and the server sends back JSON data about that card.

---

### 0.5 — What is JSON?

**JSON** (JavaScript Object Notation) is a format for structuring data as text. It looks like this:
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

Rules:
- Keys must be in double quotes: `"name"`
- Values can be: strings (`"hello"`), numbers (`42`), booleans (`true`/`false`), objects (`{}`), arrays (`[]`), or `null`
- It's basically JavaScript objects, but stricter (keys must be quoted)

APIs almost always send and receive data in JSON format.

---

### 0.6 — What is Express.js?

**Express** is a library (package) for Node.js that makes it easy to build web servers. Without Express, you'd have to write a lot of low-level code to handle HTTP requests. Express simplifies everything.

Here's the minimal Express server:
```js
const express = require("express");  // 1. Import the library
const app = express();               // 2. Create an app instance

app.get("/hello", (req, res) => {    // 3. Define a route
  res.json({ message: "hi there" }); // 4. Send a JSON response
});

app.listen(3000, () => {             // 5. Start listening on port 3000
  console.log("Server running!");
});
```

Let's break down each piece:

**`app.get("/hello", (req, res) => { ... })`**
- `app.get` — "when someone sends a GET request..."
- `"/hello"` — "...to this URL path..."
- `(req, res) => { ... }` — "...run this function"
  - `req` = the **request** object (contains info about what the client sent)
  - `res` = the **response** object (you use this to send data back)

**`res.json({ ... })`** — sends a JavaScript object back to the client as JSON.

**`app.listen(3000)`** — tells the server to start running and listen for requests on **port 3000**. A port is like a door number on your computer — different services use different ports.

After running this, you'd visit `http://localhost:3000/hello` in your browser and see `{"message":"hi there"}`.

---

### 0.7 — What is Axios?

**Axios** is a library for making HTTP requests from your JavaScript code. It's how your server talks to *other* servers.

In this exercise, your server needs to call the BinList API to get card info. Axios does that:
```js
const axios = require("axios");

const response = await axios.get("https://lookup.binlist.net/45717360");
console.log(response.data);  // the JSON data from BinList
```

**`await`** — this is important. Calling an external API takes time (it has to travel over the internet). `await` tells JavaScript to *wait* for the response before continuing. You can only use `await` inside a function marked as `async`:
```js
async function getCard() {
  const response = await axios.get("https://...");
  // response is now ready to use
}
```

---

### 0.8 — What is `async` / `await`?

When your code does something slow (calling an API, reading a file), JavaScript doesn't just freeze and wait. It uses **asynchronous** operations — it starts the slow thing, then moves on to other work, and comes back when it's done.

- **`async`** — put this before a function to say "this function contains asynchronous operations"
- **`await`** — put this before a slow operation to say "wait here until this finishes"

```js
// WITHOUT async/await (confusing callback style):
axios.get("https://...").then((response) => {
  console.log(response.data);
});

// WITH async/await (much cleaner):
const response = await axios.get("https://...");
console.log(response.data);
```

---

### 0.9 — What is `try` / `catch`?

Things can go wrong: the internet might be down, the card number might be invalid, the API might return an error. `try/catch` lets you handle errors gracefully instead of crashing:

```js
try {
  // Try to do something that might fail
  const response = await axios.get("https://lookup.binlist.net/INVALID");
  res.json({ success: true, data: response.data });
} catch (error) {
  // If anything in the "try" block fails, we land here
  res.json({ success: false, error: "something went wrong" });
}
```

Without `try/catch`, an error would crash your entire server. With it, you catch the error and send a friendly error message instead.

---

### 0.10 — Route Parameters vs. Query Parameters

These are two ways to pass data through a URL:

**Route Parameters** (part of the URL path):
```
/api/card-scheme/verify/45717360
                        ^^^^^^^^
                        This is a route parameter
```
In Express, you define it with a colon: `/verify/:cardNumber`
Access it with: `req.params.cardNumber` → `"45717360"`

**Query Parameters** (after the `?` in the URL):
```
/api/card-scheme/stats?start=1&limit=3
                       ^^^^^^^^^^^^^^^
                       These are query parameters
```
- `?` starts the query string
- `&` separates multiple parameters
- Access them with: `req.query.start` → `"1"`, `req.query.limit` → `"3"`
- **Important:** query params always come in as **strings**, so you need `parseInt()` to convert to numbers

---

### 0.11 — What is the BinList API?

A credit card number isn't random. The first 6–8 digits are called the **BIN** (Bank Identification Number). They identify:
- The card network (Visa, Mastercard, Amex)
- The issuing bank
- The card type (debit, credit)

[BinList](https://binlist.net/) is a free, public API that looks up this information. You send it a BIN, it sends back the details.

**Example request:**
```
GET https://lookup.binlist.net/45717360
```

**Example response:**
```json
{
  "scheme": "visa",
  "type": "debit",
  "bank": {
    "name": "JYSKE BANK",
    "url": "www.jyskebank.dk",
    "city": "Hjørring"
  },
  "country": { ... },
  ...
}
```

Notice that `bank` is a nested object — so to get the bank name, you access `response.data.bank.name`. But sometimes `bank` is missing entirely (not all cards have bank info), so you need to check: `response.data.bank ? response.data.bank.name : "N/A"`.

---

### 0.12 — What is In-Memory Storage?

"In-memory storage" just means storing data in a variable while your program is running. It's the simplest form of data storage — no database, no files, just a JavaScript object:

```js
const hitCounter = {};
```

Every time someone looks up a card, you add to this object:
```js
hitCounter["45717360"] = (hitCounter["45717360"] || 0) + 1;
```

After 3 lookups of "45717360" and 1 lookup of "52345678":
```js
hitCounter = {
  "45717360": 3,
  "52345678": 1
}
```

**The downside:** when you restart the server, all data is lost (it only lives in RAM). The exercise says this is fine — you can store data "in memory or on a file."

The `(hitCounter[card] || 0) + 1` pattern works like this:
- If `hitCounter[card]` exists (e.g., `3`), use that value → `3 + 1 = 4`
- If it doesn't exist yet, it's `undefined`. `undefined || 0` gives `0` → `0 + 1 = 1`

---

### 0.13 — What is Pagination?

When you have a large list of data, you don't want to send it all at once. **Pagination** means sending it in pages/chunks.

The exercise uses `start` and `limit`:
- `start` — which item to start from (1-based, so 1 means "from the beginning")
- `limit` — how many items to include

Example: you have 10 cards. `start=3&limit=2` means "give me 2 items, starting from the 3rd one."

In JavaScript, arrays are 0-indexed (first item is at index 0), but `start` is 1-indexed (first item is 1). So you convert: `array.slice(start - 1, start - 1 + limit)`.

---

### 0.14 — What is Docker?

Imagine you build your app on your computer. It works great! But when your friend tries to run it on their computer, it breaks — they have a different version of Node.js, or they're on Mac instead of Windows, etc.

**Docker** solves this by packaging your app along with *everything it needs* (Node.js, libraries, etc.) into a **container**. A container is like a tiny, isolated mini-computer that runs inside your real computer.

Key terms:
- **Image** — a blueprint/recipe for a container (like a template). You build it from a `Dockerfile`.
- **Container** — a running instance of an image (like a running virtual machine, but lighter).
- **Dockerfile** — a text file with instructions for building an image.

---

### 0.15 — What is a Dockerfile?

A Dockerfile is a recipe that tells Docker how to build your image, step by step. Let's walk through one:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "step1.js"]
```

Line by line:

| Line | What it does |
|------|-------------|
| `FROM node:18-alpine` | "Start from a base image that already has Node.js 18 installed." Alpine is a tiny Linux distribution — it keeps the image small. |
| `WORKDIR /app` | "Create a folder called `/app` inside the container and work there from now on." Like doing `cd /app`. |
| `COPY package*.json ./` | "Copy `package.json` (and `package-lock.json` if it exists) from your computer into the container." The `*` is a wildcard. |
| `RUN npm install` | "Run `npm install` inside the container." This downloads all the dependencies listed in `package.json`. |
| `COPY . .` | "Copy everything else from your project folder into the container." We do this *after* `npm install` so Docker can cache the dependencies step. |
| `EXPOSE 3000` | "Document that this container will listen on port 3000." (This is just documentation — it doesn't actually open the port.) |
| `CMD ["node", "step1.js"]` | "When someone starts this container, run `node step1.js`." This is the default command. |

**Why copy `package.json` separately?** Docker caches each step. If your code changes but `package.json` doesn't, Docker reuses the cached `npm install` step instead of re-downloading everything. This makes rebuilds faster.

---

### 0.16 — Docker Commands You'll Use

```bash
# Build an image from a Dockerfile (run this in the folder with the Dockerfile)
docker build -t my-app-name .
#  -t my-app-name  = give the image a name (a "tag")
#  .               = look for the Dockerfile in the current directory

# Run a container from that image
docker run -p 3000:3000 my-app-name
#  -p 3000:3000 = map port 3000 on YOUR computer to port 3000 in the container
#  Without -p, you can't reach the server from your browser!

# Run in the background (detached mode)
docker run -d -p 3000:3000 my-app-name

# See running containers
docker ps

# Stop a container
docker stop <container-id>
```

The `-p HOST:CONTAINER` flag is crucial. Your container is isolated — it has its own network. `-p 3000:3000` creates a tunnel: requests to `localhost:3000` on your machine get forwarded to port 3000 inside the container.

---

### 0.17 — What is `localhost`?

`localhost` is a special hostname that means "this computer." When you run a server on your machine and visit `http://localhost:3000`, you're talking to the server running on your own computer. It's the same as `http://127.0.0.1:3000`.

---

## PART 1: What This Exercise Is Asking You to Do

Now that we understand the building blocks, let's look at the big picture.

You're building a **credit card information lookup service** with two endpoints:

| Step | Endpoint | What it does |
|------|----------|-------------|
| **Step 1** | `GET /api/card-scheme/verify/:cardNumber` | Takes a card number, calls BinList, returns card info (scheme, type, bank) |
| **Step 2** | `GET /api/card-scheme/stats?start=1&limit=3` | Returns paginated stats of how many times each card was looked up |

The data flow looks like this:
```
[Browser/Client]
       |
       | GET /api/card-scheme/verify/45717360
       v
[Your Server (Express)]
       |
       | GET https://lookup.binlist.net/45717360
       v
[BinList API (external)]
       |
       | Returns: { scheme: "visa", type: "debit", bank: { name: "JYSKE BANK" } }
       v
[Your Server]
       |
       | Reformats it and sends back:
       | { success: true, payload: { scheme: "visa", type: "debit", bank: "JYSKE BANK" } }
       v
[Browser/Client]
```

---

## PART 2: Step-by-Step Implementation Guide

---

### STEP 1: Card Verification Endpoint

> **Goal:** Build `GET /api/card-scheme/verify/:cardNumber` that calls BinList and returns card info.

#### 1.1 — Initialize the project

Open a terminal, navigate into the `step1_verify` folder, and run:
```bash
cd step1_verify
npm init -y
npm install express axios
```

**What each command does:**
- `cd step1_verify` — changes directory into the Step 1 folder
- `npm init -y` — creates a `package.json` file with default values. The `-y` flag means "yes to all defaults" (skip the questionnaire).
- `npm install express axios` — downloads the `express` and `axios` libraries into a `node_modules/` folder and adds them to `package.json` under `"dependencies"`.

After this, your folder should contain:
```
step1_verify/
├── node_modules/      ← downloaded libraries (don't edit these)
├── package.json       ← project config
├── package-lock.json  ← exact versions of all dependencies
└── step1.js           ← YOUR code goes here (create this)
```

#### 1.2 — Create the server file (`step1.js`)

Create a file called `step1.js`. Here's what you need to write, and **why** each part exists:

**Line by line walkthrough:**

```js
// STEP A: Import the libraries we installed
const express = require("express");  // web server framework
const axios = require("axios");      // HTTP client for calling BinList
```
> `require()` loads a library. Think of it like `#include` in C or `import` in Python.

```js
// STEP B: Create the Express app
const app = express();
const port = 3000;
```
> `express()` creates a new web application. `port` is which "door" our server listens on.

```js
// STEP C: Define the route (endpoint)
app.get("/api/card-scheme/verify/:cardNumber", async (req, res) => {
```
> This says: "When someone sends a GET request to `/api/card-scheme/verify/ANYTHING`, run this function."
> - `:cardNumber` is a **placeholder** — whatever the user types there gets captured.
> - `async` — because we'll use `await` inside (to wait for the BinList API response).
> - `req` — the incoming request. `res` — the outgoing response.

```js
  // STEP D: Get the card number from the URL
  const cardNumber = req.params.cardNumber;
```
> If the URL is `/verify/45717360`, then `req.params.cardNumber` is `"45717360"`.

```js
  // STEP E: Try to call BinList (might fail)
  try {
    const response = await axios.get(`https://lookup.binlist.net/${cardNumber}`);
```
> `axios.get(url)` sends a GET request to BinList.
> The backtick string `` `https://.../${cardNumber}` `` is a **template literal** — it inserts the variable into the string.
> `await` pauses execution until BinList responds.
> `try` means "attempt this, and if anything goes wrong, jump to `catch`."

```js
    // STEP F: Build and send the success response
    const cardInfo = {
      success: true,
      payload: {
        scheme: response.data.scheme,
        type: response.data.type,
        bank: response.data.bank ? response.data.bank.name : "N/A",
      },
    };
    res.json(cardInfo);
```
> `response.data` is the JSON object BinList sent back.
> `response.data.bank ? response.data.bank.name : "N/A"` — this is a **ternary operator**:
>   - If `bank` exists → use `bank.name`
>   - If `bank` is missing/null → use `"N/A"`
> `res.json(...)` sends the object back to the client as JSON.

```js
  } catch (error) {
    // STEP G: If BinList returned an error (bad card number, etc.)
    res.json({ success: false, error: "invalid card number" });
  }
});
```
> If `axios.get()` fails (404, network error, etc.), we land here and send an error response.

```js
// STEP H: Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```
> This starts the server. It'll keep running until you press `Ctrl+C` in the terminal.
> The `() => { console.log(...) }` is a callback that runs once the server is ready.

#### 1.3 — Test it

**Test 1: Run the server**
```bash
node step1.js
```
You should see: `Server is running on port 3000`

**Test 2: Make a request** (open a new terminal window, or use your browser)
```bash
curl http://localhost:3000/api/card-scheme/verify/45717360
```
> `curl` is a command-line tool for making HTTP requests. You can also just paste the URL into your browser.

You should see something like:
```json
{
  "success": true,
  "payload": {
    "scheme": "visa",
    "type": "debit",
    "bank": "JYSKE BANK"
  }
}
```

**Test 3: Try an invalid card number**
```bash
curl http://localhost:3000/api/card-scheme/verify/000000
```
You should see:
```json
{
  "success": false,
  "error": "invalid card number"
}
```

Press `Ctrl+C` in the first terminal to stop the server when you're done.

#### 1.4 — Dockerfile for Step 1

Create a file called `dockerfile` (no extension) inside `step1_verify/`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "step1.js"]
```

> See section 0.15 above for a detailed explanation of every line.

**Build the Docker image:**
```bash
cd step1_verify
docker build -t step1-verify .
```
> This reads the Dockerfile and creates an image named `step1-verify`.

**Run a container from the image:**
```bash
docker run -p 3000:3000 step1-verify
```
> This starts the container. `-p 3000:3000` maps your computer's port 3000 to the container's port 3000.
> Now visit `http://localhost:3000/api/card-scheme/verify/45717360` — same as before, but it's running in Docker!

---

### STEP 2: Card Stats Endpoint

> **Goal:** Build `GET /api/card-scheme/stats?start=1&limit=3` that returns paginated hit-count stats for cards looked up in Step 1.

#### Understanding the problem

Step 2 needs to answer: "Which cards have been looked up, and how many times each?"

This means:
1. Every time Step 1 handles a card lookup, **we need to record it somewhere.**
2. Step 2 reads that record and returns it in a paginated format.

**There are two approaches:**
- **Approach A (simpler):** Put both endpoints in ONE server file. Both endpoints share the same `hitCounter` variable in memory.
- **Approach B (two separate services):** Keep them in separate folders. Step 1 writes data to a shared JSON file on disk, Step 2 reads from that file.

Since the exercise says "you can create two separate projects," and you already have two folders, I'll explain **both approaches.** Pick whichever you prefer.

---

#### APPROACH A: Single Server (Both Endpoints in One File)

This is the easiest approach. You modify `step1.js` to also serve the stats endpoint.

##### 2A.1 — Add a hit counter variable

At the top of your file (after imports, before routes), add:
```js
const hitCounter = {};
```
> This creates an empty object. It will store data like: `{ "45717360": 3, "52345678": 1 }`

##### 2A.2 — Record each lookup in Step 1

Inside your Step 1 route handler, **after a successful BinList response** (inside the `try` block, before `res.json`), add:
```js
hitCounter[cardNumber] = (hitCounter[cardNumber] || 0) + 1;
```
> **How this works step by step:**
> 1. `hitCounter[cardNumber]` — look up the current count for this card
> 2. If the card was never looked up before, it's `undefined`
> 3. `undefined || 0` evaluates to `0` (JavaScript's "or" operator returns the second value if the first is falsy)
> 4. `0 + 1` = `1` — so the first lookup sets the count to 1
> 5. On the next lookup: `1 || 0` = `1`, then `1 + 1` = `2`
> And so on.

##### 2A.3 — Create the stats endpoint

Add a new route handler (before `app.listen`):

```js
app.get("/api/card-scheme/stats", (req, res) => {
```
> Note: no `async` needed here because we're not calling any external APIs.
> Also note: no `:parameter` in the path — we use query params instead (`?start=1&limit=3`).

```js
  // Read query parameters, with defaults
  const start = parseInt(req.query.start) || 1;
  const limit = parseInt(req.query.limit) || 10;
```
> `req.query.start` is a string (e.g., `"1"`). `parseInt()` converts it to a number (`1`).
> `|| 1` means "if parsing fails (NaN) or the param is missing, use 1 as the default."

```js
  // Get all entries as an array: [["45717360", 3], ["52345678", 1], ...]
  const allEntries = Object.entries(hitCounter);
```
> `Object.entries()` converts an object into an array of `[key, value]` pairs.
> Example: `Object.entries({ a: 1, b: 2 })` → `[["a", 1], ["b", 2]]`

```js
  // Paginate: pick the right slice
  const sliced = allEntries.slice(start - 1, start - 1 + limit);
```
> `slice(startIndex, endIndex)` extracts a portion of an array.
> We subtract 1 from `start` because arrays are 0-indexed but `start` is 1-indexed.
> Example: `start=1, limit=3` → `slice(0, 3)` → first 3 items.

```js
  // Convert back from array to object
  const payload = {};
  for (const [card, count] of sliced) {
    payload[card] = count;
  }
```
> This loop rebuilds an object from the sliced array.
> `[card, count]` is **destructuring** — it unpacks each `["45717360", 3]` pair into two variables.

```js
  // Calculate the byte size of the payload
  const size = Buffer.byteLength(JSON.stringify(payload));
```
> `JSON.stringify(payload)` converts the object to a JSON string: `'{"45717360":3,"52345678":1}'`
> `Buffer.byteLength(...)` counts how many bytes that string takes up.
> The exercise says `size` should be "the byte of the payload."

```js
  // Send the response
  res.json({
    success: true,
    start: start,
    limit: limit,
    size: size,
    payload: payload,
  });
});
```

##### 2A.4 — Pseudocode summary (single server)

```
IMPORT express, axios
CREATE app
CREATE hitCounter = {}

ROUTE GET "/api/card-scheme/verify/:cardNumber":
    cardNumber = req.params.cardNumber
    TRY:
        response = await HTTP GET to BinList
        hitCounter[cardNumber] = (hitCounter[cardNumber] OR 0) + 1   ← NEW
        SEND JSON { success: true, payload: { scheme, type, bank } }
    CATCH:
        SEND JSON { success: false, error: "invalid card number" }

ROUTE GET "/api/card-scheme/stats":                                   ← NEW
    start = parseInt(query.start) OR 1
    limit = parseInt(query.limit) OR 10
    entries = Object.entries(hitCounter)
    sliced = entries.slice(start-1, start-1+limit)
    payload = convert sliced back to object
    size = byte length of JSON.stringify(payload)
    SEND JSON { success: true, start, limit, size, payload }

LISTEN on port 3000
```

---

#### APPROACH B: Two Separate Servers (Shared File)

If you want to keep the two folders completely separate (Step 1 in `step1_verify/`, Step 2 in `step2_card-scheme/`), they can communicate through a **shared JSON file**.

##### 2B.1 — Step 1 writes to a file after each lookup

You need an additional built-in module called `fs` (filesystem):
```js
const fs = require("fs");
```
> `fs` is built into Node.js — no need to `npm install` it.

Create a folder called `shared/` at the project root, and define the path:
```js
const HITS_FILE = "../shared/hits.json";
```

After a successful lookup, save the counter to disk:
```js
hitCounter[cardNumber] = (hitCounter[cardNumber] || 0) + 1;
fs.writeFileSync(HITS_FILE, JSON.stringify(hitCounter));
```
> `fs.writeFileSync(path, data)` writes data to a file. If the file doesn't exist, it creates it. If it does exist, it overwrites it.
> `JSON.stringify(hitCounter)` converts the object to a JSON string so it can be saved as text.

##### 2B.2 — Step 2 reads from that file

In your `step2.js`, read the file when the stats endpoint is called:
```js
const fs = require("fs");
const HITS_FILE = "../shared/hits.json";

// Inside the route handler:
let hitCounter = {};
if (fs.existsSync(HITS_FILE)) {
  hitCounter = JSON.parse(fs.readFileSync(HITS_FILE, "utf-8"));
}
```
> `fs.existsSync(path)` checks if the file exists (avoids crashing if Step 1 hasn't been called yet).
> `fs.readFileSync(path, "utf-8")` reads the file content as a string.
> `JSON.parse(...)` converts the JSON string back into a JavaScript object.

Then the rest of the stats logic is the same as Approach A (paginate, calculate size, send response).

##### 2B.3 — Fix the bugs in your current step2.js

Your current `step2.js` has a few issues:

1. **Empty route path** (`card_scheme.get("")`) — should be `card_scheme.get("/api/card-scheme/stats", ...)`
2. **Wrong variable names** on the last line — `app.listen(port, ...)` should be `card_scheme.listen(port_num, ...)`
   - `app` doesn't exist (you named it `card_scheme`)
   - `port` doesn't exist (you named it `port_num`)
3. **Missing logic** inside try/catch — needs the full stats implementation
4. **`package.json`** says `"main": "index.js"` but your file is called `step2.js` — change it to `"main": "step2.js"`

##### 2B.4 — Dockerfile for Step 2

Create a `dockerfile` in `step2_card-scheme/`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "step2.js"]
```
> Same structure as Step 1, but uses port 3001 (so it doesn't conflict with Step 1's port 3000).

Build and run:
```bash
cd step2_card-scheme
docker build -t step2-stats .
docker run -p 3001:3001 step2-stats
```

> **Note on Docker + shared files:** If you use Approach B with Docker, the shared file gets tricky because each container has its own filesystem. You'd need to use Docker **volumes** to share a folder. That's more advanced — Approach A (single server) is much simpler for Docker.

---

## PART 3: Testing Everything Together

### 3.1 — Test without Docker

**Terminal 1:** Start the server
```bash
cd step1_verify
node step1.js
```

**Terminal 2:** Make requests
```bash
# Look up some cards (Step 1)
curl http://localhost:3000/api/card-scheme/verify/45717360
curl http://localhost:3000/api/card-scheme/verify/45717360
curl http://localhost:3000/api/card-scheme/verify/52345678

# Now check the stats (Step 2)
curl "http://localhost:3000/api/card-scheme/stats?start=1&limit=3"
```

> **Important:** put the URL in quotes when it has `?` and `&` — otherwise your terminal may interpret those characters specially.

Expected stats response:
```json
{
  "success": true,
  "start": 1,
  "limit": 3,
  "size": 28,
  "payload": {
    "45717360": 2,
    "52345678": 1
  }
}
```

### 3.2 — Test with Docker

```bash
cd step1_verify
docker build -t step1-verify .
docker run -p 3000:3000 step1-verify
```

Then test the same URLs in your browser or with `curl`.

---

## PART 4: Error Handling Checklist

| Scenario | How it's handled |
|----------|-----------------|
| Invalid card number (BinList returns 404) | `try/catch` catches it → send `{ success: false, error: "invalid card number" }` |
| BinList is down / network error | Same — `catch` block handles any axios error |
| Missing `start`/`limit` query params | `parseInt(undefined) || 1` gives the default value |
| `start` or `limit` are garbage text | `parseInt("abc")` returns `NaN`, then `NaN || 1` gives the default |
| Card never looked up (empty stats) | `Object.entries({})` returns `[]`, everything still works with empty results |

---

## PART 5: Common Mistakes to Watch Out For

1. **Forgetting `async` on the route handler** — if you use `await` without `async`, you'll get a syntax error.

2. **Not converting query params to numbers** — `req.query.start` is `"1"` (a string), not `1` (a number). Always use `parseInt()`.

3. **Using wrong variable names** — if you name your app `card_scheme` but then write `app.listen(...)`, it won't work. Be consistent.

4. **Not handling missing `bank` data** — some cards don't have bank info. Always check with `response.data.bank ? response.data.bank.name : "N/A"`.

5. **Port conflicts** — if something is already running on port 3000, your server won't start. Either stop the other process or use a different port.

6. **Forgetting to install dependencies** — if you clone the repo and skip `npm install`, nothing will work because `node_modules/` isn't committed to git.

---

## PART 6: Summary — Files You Need

### If using single server (Approach A):
```
step1_verify/
├── package.json         ← lists express and axios as dependencies
├── step1.js             ← server with BOTH /verify and /stats endpoints
└── dockerfile           ← Docker recipe for containerizing
```

### If using two servers (Approach B):
```
step1_verify/
├── package.json         ← lists express, axios, (and uses fs for file writing)
├── step1.js             ← /verify endpoint + writes hits to shared file
└── dockerfile

shared/
└── hits.json            ← auto-generated by Step 1 (don't create manually)

step2_card-scheme/
├── package.json         ← lists express (and uses fs for file reading)
├── step2.js             ← /stats endpoint + reads from shared file
└── dockerfile
```

---

## PART 7: Quick Reference — JavaScript Cheat Sheet

| Concept | Syntax | Meaning |
|---------|--------|---------|
| Constant | `const x = 5;` | Declare a variable that can't be reassigned |
| Let | `let x = 5;` | Declare a variable that can be reassigned |
| Object | `{ key: "value" }` | A collection of key-value pairs |
| Arrow function | `(a, b) => { return a + b; }` | A concise function |
| Template literal | `` `Hello ${name}` `` | String with embedded variables (use backticks!) |
| Ternary | `condition ? valueIfTrue : valueIfFalse` | Inline if/else |
| OR default | `value \|\| fallback` | Use `fallback` if `value` is falsy |
| Destructuring | `const [a, b] = [1, 2];` | Unpack array elements into variables |
| Object.entries | `Object.entries({a:1})` → `[["a",1]]` | Convert object to array of pairs |
| Array.slice | `arr.slice(1, 3)` | Extract elements from index 1 to 2 (end excluded) |
| parseInt | `parseInt("42")` → `42` | Convert string to integer |
| JSON.stringify | `JSON.stringify({a:1})` → `'{"a":1}'` | Object to JSON string |
| JSON.parse | `JSON.parse('{"a":1}')` → `{a:1}` | JSON string to object |
| try/catch | `try { ... } catch(e) { ... }` | Handle errors without crashing |
| async/await | `async () => { await ... }` | Wait for async operations |
| require | `const x = require("lib")` | Import a module/library |

---

Good luck! Work through it step by step, test frequently, and don't hesitate to experiment.

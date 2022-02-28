
# SWE Take Home Assignment

A foaming classification system

 
## Author

- [Nisa Champagne](https://github.com/nisaChampagne)


## Demo

https://loom.com/share/c7f1ac00e6584a60bae034509af0ede2


## Features

- You can view images from the reactor run
- You have the ability to mark them as foaming or not.
- Your decisions are stored for the next time I use the app.
- You can filter by foaming, non-foaming and unclassified / all images.
- Pagination has been incorporated to allow 50 images on each page.


## Run Locally

Clone the project

```bash
  git clone https://github.com/nisaChampagne/SWE-Foam-Take-Home----Nisa.git
```

### Create a .env file and Set your env variables 

```
AWS_ACCESS_KEY={aws access key}
AWS_SECRET_ACCESS_KEY={aws secret key}
REGION={aws region}
BUCKET={aws bucket}

MONGODBATLAS_URL={mongodb atlas url}
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  cd server

  node index.js
```

Go to the project directory and start the react app

```bash
  cd swe-take-home 

  npm start
```


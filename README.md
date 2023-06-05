## Getting Started

First, install package:

```bash
npm install
# or
yarn install
```

And then Open docker, run on terminal:

```bash
docker compose up dev-db -d
```

When docker already start running, then run:

```bash
npx prisma generate
# after done, then run
npx prisma db push
```

Now run the development server :

```bash
npm run start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000)

EXAMPLE FORM WHEN CREATE USER

```JSON
{
  "email": "abc@gmail.com",
  "firstName": "Aiden",
  "lastName": "Pearce",
  "birthday": "2023-06-05",
  "location": "Australia/Sydney"
}
```

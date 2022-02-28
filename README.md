## Getting Started

1. Install node version 16.0.0 or greater and npm version 7.0.0 or greater using this [link](https://nodejs.org/download/release/v16.0.0/)
2. Clone this repo to your local machine

### Launch the applicaton

1. `npm install`
2. `npm run build` to build the assets
3. `npm run start` to start the server

### Run test
1. `npm run test:integration` to test integration test using cypress
2. `npm run test:jest` to test jest test

### Assumptions

1. Since the Nextrip API always returns same set of routes irrespective of the user we can generate the html with prepopulated routes as a dropdown. To achieve this utlized `Next.js` as it provides the framework to preload data and generate the HTML when we do `npm run build`.
2. Since we need to navigate using browser's back&forward buttons and display the required stop I used native `Select` element as it allows keyboard navigation and also the `useRouter` hook provided by Next.js to update the browser navigation bar.
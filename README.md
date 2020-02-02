# Plotter Backend

## Running the Plotter Backend

1. Clone this repo `git@github.com:crumplepunch/plotter-backend.git`, and `cd plotter-backend`
2. Run `cp .env.sample .env` to grab the default env settings. Otherwise, use your custom ones but follow the `.env.sample` variable naming scheme
. Run `npm install && npm start`.
4. Make a `GET` request to `localhost:420/plotter/locations` from your favorite API sending tool. I recommend PostMan.

Optionally, you can run `DEBUG=* npm start` to see the debug logs
Make sure your mongodb service is running!

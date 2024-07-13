# Currency Converter

This is a currency converter application built with Angular. It fetches the current exchange rates for USD and EUR against UAH from open public API and allows users to convert between these currencies. The application also includes an auto-update feature to refresh exchange rates at specified intervals.

## Features

- Fetches current exchange rates for USD and EUR against UAH
- Allows conversion between UAH, USD, and EUR
- Auto-updates exchange rates at specified intervals
- User can enable/disable auto-update and set the update interval
- Displays data source with a link to public API

## Technologies Used

- Node.js (v20.14.0)
- npm (v10.8.1)
- Angular, Angular CLI (V18.1.0)
- RxJS
- HTML, CSS, Bootstrap

## Project Structure
- src/app: Contains the main application components and services
- header: Contains the header component which displays exchange rates and update settings
- currency-converter: Contains the currency converter component
- currency.service.ts: Contains the service for fetching exchange rates from the API

## Usage
- The header displays the current exchange rates for USD and EUR against UAH.
- The "Update Interval" field allows the user to set the interval (in seconds) for auto-updating exchange rates.
- The "Enable Auto Update" checkbox enables/disables the auto-update feature.
- The currency converter component allows the user to convert between UAH, USD, and EUR.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

## License
This project is licensed under the MIT License.

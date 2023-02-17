# PageScrapper

PageScrapper is a NodeJS application that uses the Puppeteer plugin to obtain the body of any requested page, while avoiding detection as a bot.

## Installation

To install PageScrapper, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Run `npm install` to install the project dependencies.

## Usage

To use PageScrapper, send a JSON object to the server using the HTTP `POST` method. The JSON object should have the following format:

```json
{
  "url": "https://example.com"
}
```

To send the JSON object to the server, you can use tools such as `curl` or `Postman`. Here's an example `curl` command:

```cURL
curl -X POST -H "Content-Type: application/json" -d '{"url": "https://example.com"}' http://localhost:5001/scrape/page
```

The response will be the body of the requested page.

PageScrapper is designed to avoid being detected as a bot, but please use it responsibly and in accordance with the terms of service of the websites you are scraping.

## Contributing

If you would like to contribute to PageScrapper, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

PageScrapper is released under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for more information.

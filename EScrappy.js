const axios = require('axios');
const cheerio = require('cheerio');

const targetURL = 'https://example.com'; // Replace with the URL you want to scrape

axios.get(targetURL)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const emailAddresses = [];

    // Regular expression to match email patterns
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;

    // Find email addresses in the webpage content
    const content = $('body').text();
    const matches = content.match(emailPattern);

    if (matches) {
      matches.forEach(email => {
        if (!emailAddresses.includes(email)) {
          emailAddresses.push(email);
        }
      });

      console.log('Extracted email addresses:', emailAddresses);
    } else {
      console.log('No email addresses found on the page.');
    }
  })
  .catch(error => {
    console.error('Error fetching or parsing the webpage:', error);
  });

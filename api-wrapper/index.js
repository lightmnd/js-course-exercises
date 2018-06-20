window.onload = () => {

// ------------------------------------------------------ //
// Simple JavaScript API wrapper
// ------------------------------------------------------ //

// For demo purposes I'm using this awesome Star Wars API
const API_URL = 'https://swapi.co/api';

// Custom API error to throw
function ApiError(message, data, status) {
  let response = null;
  let isObject = false;

  // We are trying to parse response
  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }

  this.response = response;
  this.message = message;
  this.status = status;
  this.toString = () => {
    return `${ this.message }\nResponse:\n${ isObject ? JSON.stringify(this.response, null, 2) : this.response }`;
  };
}

// API wrapper function
    const fetchResource = async (path, userOptions = {}) => {
    // Define default options
    const defaultOptions = {};
    // Define default headers
    const defaultHeaders = {};

    const options = {
        // Merge options
        ...defaultOptions,
        ...userOptions,
            // Merge headers
            headers: {
                ...defaultHeaders,
                ...userOptions.headers,
            },
    };

    // Build Url
    const url = `${ API_URL }/${ path }`;

    // Detect is we are uploading a file
    const isFile = options.body instanceof File;

    // Stringify JSON data
    // If body is not a file
    if (options.body && typeof options.body === 'object' && !isFile) {
        options.body = JSON.stringify(options.body);
    }

    // Variable which will be used for storing response
    let response = null;

    //return fetch(url, options)
    let result = await fetch(url, options)

    let responseObject = await result
    //.then(responseObject => {
        // Saving response for later use in lower scopes
        response = responseObject;
        try {
            // HTTP unauthorized
            if (response.status === 401) {
                // Handle unauthorized requests
                // Maybe redirect to login page?
            }

            // Check for error HTTP error codes
            if (response.status < 200 || response.status >= 300) {
                // Get response as text
                return response.text();
            }

            // Get response as json
            return response.json();
            //})
            // "parsedResponse" will be either text or javascript object depending if
            // "response.text()" or "response.json()" got called in the upper scope
            //.then(parsedResponse => {
            // Check for HTTP error codes
            if (response.status < 200 || response.status >= 300) {
                // Throw error
                throw parsedResponse;
            }

            // Request succeeded
            return parsedResponse;
        //})
        } catch (err) {
            console.log(err)
        // .catch(error => {
        // Throw custom API error
        // If response exists it means HTTP error occured
        if (response) {
            throw new ApiError(`Request failed with status ${ response.status }.`, error, response.status);
        } else {
            throw new ApiError(error, null, 'REQUEST_FAILED');
        }
    }
    // });
};

// ------------------------------------------------------ //
// DEMO
// PLEASE NOTE:
// this is a very naive implementation for demo purposes
// ------------------------------------------------------ //

// Define API calls
const getPeople = () => {
  return fetchResource('people');
};

const getPerson = (personId) => {
  return fetchResource(`people/${ personId }`);
};

const getJsonError = () => {
  return fetchResource('not-found');
};

// Get dom nodes
const consoleElement = document.querySelector('#console');
const buttonPeople = document.querySelector('#req-people');
const buttonPerson = document.querySelector('#req-person');

// Create "actions"
function requestPeople() {
  // Save button text and set it to loading
  const buttonText = this.innerHTML;
  this.innerHTML = 'Loading...';

  getPeople()
    .then(data => {
      consoleElement.innerHTML = `<div>${ JSON.stringify(data, null, 2) }</div>${ consoleElement.innerHTML }`;
      // Reset button text
      this.innerHTML = buttonText;
    })
    .catch(error => {
      consoleElement.innerHTML = `<div>${ error }</div>${ consoleElement.innerHTML }`;
      // Reset button text
      this.innerHTML = buttonText;
    });
}

function requestPerson() {
  // Save button text and set it to loading
  const buttonText = this.innerHTML;
  this.innerHTML = 'Loading...';

  getPerson(1)
    .then(data => {
      consoleElement.innerHTML = `<div>${ JSON.stringify(data, null, 2) }</div>${ consoleElement.innerHTML }`;
    // Reset button text
      this.innerHTML = buttonText;
    })
    .catch(error => {
      consoleElement.innerHTML = `<div>${ error }</div>${ consoleElement.innerHTML }`;
      // Reset button text
      this.innerHTML = buttonText;
    });
}


// Bind actions to buttons
buttonPeople.addEventListener('click', requestPeople);
buttonPerson.addEventListener('click', requestPerson);

}
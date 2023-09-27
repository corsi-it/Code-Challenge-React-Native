# Coding-Challenge-React-Native

Create a simple React Native application that makes an API call to fetch data from this REST API endpoint (https://dummyjson.com/todos) and displays the data in a list view.
The documentation for the API is available at https://dummyjson.com/docs/todos

## Requirements

- The application should have two screens, a home screen, and a details screen. It uses react-navigation v6.
- The home screen should show the list of data items fetched from the API endpoint, in a paginated
- When a user clicks on an item in the list, it should navigate to the details screen and show detailed information about the selected item.
- The details screen should have a back button to navigate back to the home screen.
- Show a loader while fetching data from the API endpoint.
- The UI does not be too fancy, but should be usable.
- Implement error handling if the API call fails.
- Implement pull to refresh functionality to fetch the latest data from the API endpoint.

### Optional Requirements (only if you have time to spare)
- First focus on the requirements, then feel free to implement the following features if you have time
- Implement pagination (https://dummyjson.com/docs/todos#limit_skip)
- New TODO Functionality (https://dummyjson.com/docs/todos#add)
- Checkbox to complete TODO (https://dummyjson.com/docs/todos#update)
- Swipe to delete TODO (https://dummyjson.com/docs/todos#delete)
- Obviously if you implement these, refresh will wipe out the changes, this is not a problem
- Add relevant Jest tests

## Instructions
- Download Expo Go Client @ https://expo.dev/client
- **Fork** this repository and start working on your own version.
- This project uses expo, to setup and run
```bash
npm i
npx expo start
```
- scan the expo QR code to test on your device, or use the emulators


## Submission
- When you are done, from your fork, open a PR on this repository (https://github.com/corsi-it/Coding-Challenge-React-Native)
- Include any additional information you think is important for reviewing your project.

## Rules
- You have 90 minutes to complete the challenge.
- You may use any resources available to you, including documentation and Google.
- Your code must be written in Typescript/Javascript using React-Native and Expo frameworks.
- Your code must be well-organized and easy to understand.
- Your code should adhere to React/React-Native best practices.
- Your code should be documented with clear comments and/or inline documentation ONLY where necessary.

- You may refactor existing code, if needed.
- Your code should be committed to a new branch in your forked repository.
- Do not cheat or plagiarize. The evaluator reserves the right to disqualify any submissions suspected of cheating.


## Definition of Done
- The application is usable and respects the requirements

## Evaluation
Your solution will be evaluated based on the following acceptance criteria:

- The program should be able to make API calls, handle errors and use appropriate data structures.
- The program should be written in a way that is easy to read, maintain, and understand by other developers.
- The program should be free of syntax errors, runtime errors, and logical errors.
- The program should follow good programming practices, such as using appropriate variable names, code commenting, and indentation.
- The program should be submitted within the given time frame of 90 minutes

**Bonus Points:**
- Implement pagination
- Use Add/Update/Delete API endpoints


### *Good luck!*




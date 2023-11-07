// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
// simple regex for email validation from: https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your full name?",
  },
  {
    type: "input",
    name: "user",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
    validate(value) {
      const pass = value.match(/^\S+@\S+\.\S+$/);
      if (pass) {
        return true;
      }

      return "Please enter a valid email address.";
    },
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Please enter a description of your project:",
  },
  {
    type: "input",
    name: "install",
    message: "Please enter the installation instructions for your project:",
  },
  {
    type: "input",
    name: "usage",
    message: "Please enter usage information for your project:",
  },
  {
    type: "input",
    name: "contribution",
    message: "Please enter the contribution guidelines for your project:",
  },
  {
    type: "input",
    name: "test",
    message: "Please enter test instructions for your project:",
  },
  {
    type: "list",
    name: "license",
    message: "Please select the license you would like to use:",
    choices: ["MIT", "GNU", "no license"],
  },
];

// TODO: Create a function to write README file
// we create the file in an output folder to avoid overwriting our own README for this application.
function writeToFile(fileName, data) {
  //check if our output folder exists. If it doesn't, make it. From https://stackoverflow.com/questions/21194934/how-to-create-a-directory-if-it-doesnt-exist-using-node-js
  const dir = "./output";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  //write the file to the output folder.
  fs.writeFile(`./output/${fileName}`, data, (err) =>
    err
      ? console.log(err)
      : console.log(
          "Your file has been created. Please check the Outputs folder."
        )
  );
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    let userAnswers = answers;
    let readmeText = generateMarkdown(userAnswers);
    writeToFile("README.md", readmeText);
  });
}

// Function call to initialize app
init();

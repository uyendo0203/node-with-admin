const { exec } = require('child_process');

// Function to run build commands
function runBuildCommand(command) {
    exec(`npx ${command}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`);
        console.error(stderr);
        process.exit(1);
      }
      console.log(stdout);
    });
  }

// Example build commands
function build() {
  console.log('Starting build process...');
  
  // Run your build commands here
  runBuildCommand('babel app.js -o dist/app.js'); // Transpile code from src to dist
  // Add more commands as needed
}

// Execute the build function
build();
# JARVIS - A Voice Assistant
## A feature-rich virtual assistant built with JavaScript, utilizing browser APIs for speech recognition, speech synthesis, and integration with APIs for weather updates, contact management, WhatsApp calling, and basic calculations. This project provides an interactive, voice-command-based user experience.

### Features
1. Speech Recognition and Synthesis
Converts spoken commands into actionable tasks.
Provides spoken responses to user queries.
2. Contact Management
Add new contacts by voice.
Make WhatsApp calls to saved contacts.
3. Calculation
Perform basic arithmetic calculations via voice commands.
Example: Calculate 5 plus 10.
4. Weather Updates
Fetch and speak weather details for any city using the OpenWeatherMap API.
Example: What is the weather in London?
5. Dark Mode Toggle
Switch between light and dark modes for better user experience.
6. Live Uptime Counter
Displays how long the assistant has been running.
Installation and Setup
Prerequisites
A modern browser with support for Speech Recognition and Speech Synthesis (e.g., Chrome).
Node.js installed (if running on a local server).
Steps
Clone the repository:
` git clone https://github.com/<your-username>/voice-powered-virtual-assistant.git
cd voice-powered-virtual-assistant `
Open the project directory.
Launch the index.html file in a browser to test locally.
### How to Use
Voice Commands
Greet: Hello or Hi.
Call Contact: Call <name>.
Add Contact: Add contact <name> <phone number>.
Calculate: Calculate <expression>.
Example: Calculate 10 divided by 2.
Weather: What is the weather in <city>?.
Buttons
Talk Button: Activates the voice assistant to listen to commands.
Dark Mode Toggle: Switches between dark and light themes.
### Project Structure
A-Voice-Assistant-JARVIS/
├── index.html         # Main HTML file for the project.
├── styles.css         # Styles for the project (dark mode support included).
├── script.js          # JavaScript for functionalities and logic.
├── README.md          # Documentation for the project.
└── assets/            # Folder for any images, icons, or additional resources.
Technologies Used
JavaScript: Core functionality and interactivity.
HTML & CSS: User interface and styling.
OpenWeatherMap API: Fetch weather updates.
Web APIs: Speech Recognition, Speech Synthesis.

### Future Enhancements
Add more advanced features like reminders and calendar integration.
Improve natural language processing for better command interpretation.
Add support for more languages.

### License
This project is licensed under the Apache License 2.0. See the LICENSE file for details.

### Contributors
Pragya Prakhar

### Acknowledgments
OpenWeatherMap for weather data.
Inspiration from personal projects and real-world use cases.

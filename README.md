# QuickForm

QuickForm is a mobile application that allows users to create video-based forms. Users can record a video while asking a question and create a form with multiple questions. These forms can then be shared with other users, who can respond to each question by recording their own videos. The main goal of the application is to facilitate video-based form creation and response collection.

## Features

- Create forms by recording videos and asking questions.
- Share forms with other users.
- Respond to each question in a form by recording videos.
- View responses to your forms.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v12 or higher)
- Expo CLI

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mehmetsinann/quickform.git
```

2. Navigate to the project directory:

```bash
cd quickform
```

3. Install dependencies:

```bash
yarn install
```

## Before Starting QuickForm
Before running the project, you need to create a `.env` file that contains your Firebase credentials. This file will include the secret information that allows the application to access the Firebase server.

### Steps:

1. Create a new file named .env in the project directory.
2. Open the .env file with a text editor.
3. Add your Firebase credentials to the file following the format below:

```bash
API_KEY=your_api_key
AUTH_DOMAIN=your_auth_domain
DATABASE_URL=your_database_url
PROJECT_ID=your_project_id
STORAGE_BUCKET=your_storage_bucket
MESSAGING_SENDER_ID=your_messaging_sender_id
APP_ID=your_app_id
```

Note: Replace the values such as `your_api_key`, `your_auth_domain`, etc. with your own Firebase project's information. You can access these details by selecting your project in the Firebase console.

After completing these steps, you can start the application and establish a connection with the Firebase server.

## Running the App

1. Start the development server:

```bash
yarn start
```

2. Open the Expo app(for Android) or the Camera app(for iOS) on your mobile device and scan the QR code displayed in the terminal.
  <br /> Note: Make sure your mobile device is connected to the same network as your development machine.
3. The app will be loaded on your mobile device, and you can now start using QuickForm.

## Built With

- Expo (React Native)
- Firebase

# Weather App

## Getting Started

To get started with this project, follow these instructions:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/asaduh07/Weather-App.git
cd weather-app
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Environment Variables

To run the Weather App locally, you need to configure the following environment variables. Create a `.env` file in the root of your project and add the variables with your values:

```plaintext
REACT_APP_API_KEY=YOUR_API_KEY
REACT_APP_SERVER_DOMAIN=https://api.openweathermap.org
REACT_APP_ICON=https://openweathermap.org/img/wn
```


### 4. Run the Development Server
Start the development server:
```bash
npm start
```

### 5.Build for Production
To build the app for production:
```bash
npm run build
```

This will run the app in development mode. Open http://localhost:3000 in your browser to view it. The page will reload automatically when you make changes.
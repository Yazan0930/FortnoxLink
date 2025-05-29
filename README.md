# FortnoxLink

A full-stack application demonstrating integration with the Fortnox API. This project serves as a learning implementation to understand how to connect and interact with Fortnox's accounting system.

## Overview

FortnoxLink is built to explore and implement Fortnox API integration patterns. The application consists of a React frontend powered by Vite and a Node.js backend using Express and TypeScript.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Fortnox Developer Portal account
- Valid Fortnox API credentials

## Getting Started

### Frontend (Client)

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
npm run dev
```

The frontend will start running on the default Vite development server (typically `http://localhost:5173`).

### Backend (Server)

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
npm run start
```

The backend server will start running on the configured port.

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and development server
- **Template-based** - Built using a React template for rapid development

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript

## Fortnox Integration

This project demonstrates integration with Fortnox's accounting API. To use the integration features:

1. Register for a Fortnox Developer Portal account
2. Create an application to obtain API credentials
3. Configure your API keys in the application
4. Follow Fortnox's authentication flow

## Project Structure

```
FortnoxLink/
├── client/          # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/          # Express backend
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Development Notes

This project was created as a learning exercise to understand:
- Fortnox API integration patterns
- OAuth authentication flows
- Full-stack TypeScript development
- Modern React development with Vite

## Contributing

This is a learning project, but contributions and suggestions are welcome. Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Resources

- [Fortnox Developer Portal](https://developer.fortnox.se/)
- [Fortnox API Documentation](https://developer.fortnox.se/documentation/)
- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
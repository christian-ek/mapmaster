
# MapMaster

[Play MapMaster Now](https://map.christianek.io)

MapMaster is an innovative game developed using React and TypeScript, offering a unique gaming experience. This project includes all necessary files to set up and run the game. Experience the challenge and excitement of identifying world flags right in your browser!

## Features

- **React and TypeScript**: Built using modern web technologies for a seamless gaming experience.
- **Engaging Gameplay**: MapMaster challenges players to guess the country of a displayed flag. Points are awarded for correct guesses, with a time limit to add excitement. Clues are available to assist, but they come at a points cost. The game demands quick thinking and sharp knowledge of world flags, offering a fun and educational experience. Whether you're a geography enthusiast or just looking for a fun challenge, MapMaster provides an engaging and interactive way to test your skills.
- **Responsive Design**: MapMaster offers an optimized experience on both desktop and mobile devices. Its interface adjusts seamlessly to different screen sizes, ensuring enjoyable gameplay on any device.

## APIs and Integrations

MapMaster utilizes several APIs for its core functionalities:

- **Google Maps API**: For map integration.
- **Google Geocoding API**: To determine the country when clicking on the map.
- **Restcountries.com API**: For fetching random flags and country information.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn (recommended) or npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/christian-ek/mapmaster.git
   ```
2. Navigate to the project directory:
   ```
   cd mapmaster
   ```
3. Install dependencies:
   ```
   yarn install
   ```
   or
   ```
   npm install
   ```

### Running the Game

To start the game, run:
```
yarn dev
```
or
```
npm run dev
```

This will start the game on a local server, usually at `http://localhost:3000`.

## Environment Setup

To run MapMaster locally, you need to set up the following environment variables in an `.env` file in the project root directory:

```env
VITE_REACT_APP_GOOGLE_MAPS_API_KEY='' # Your Google Maps API key
VITE_REACT_APP_SUPABASE_KEY='' # Your Supabase key for high score integration
VITE_REACT_APP_SUPABASE_URL='' # Your Supabase URL for high score integration
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the GNU General Public License v3.0. See `LICENSE` for more information.

## Contact

Christian Ek - hi@christianek.io

Project Link: https://github.com/christian-ek/mapmaster.git

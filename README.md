# HomeTopia

Welcome to HomeTopia, a powerful web platform for buying, selling, and renting properties. Find your dream home or perfect investment property with ease.

## Technologies Used

- [ReactJS](https://react.dev/) : A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) : A utility-first CSS framework for rapidly designing responsive web pages.
- [Leaflet](https://leafletjs.com/) : An open-source JavaScript library for interactive maps.
- [Firebase](https://firebase.google.com/) : A comprehensive development platform that provides authentication services for user management.
- [Swiper JS](https://swiperjs.com/) : A modern and mobile-friendly slider library for creating interactive carousels and sliders.
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) : A customizable toast notification library for React applications.
- [Vite](https://vitejs.dev/) : A fast and efficient build tool for modern web development.
- [Vercel](https://vercel.com/) : A cloud platform for static site deployment.

## Features

- Comprehensive property listings with detailed descriptions and images.
- Interactive maps powered by Leaflet to explore neighborhoods.
- Secure authentication and user management using Firebase.
- Offers: Submit offers for properties and track their status.
- Seamless deployment and hosting with Vercel.

## Getting Started

To get started with HomeTopia locally, follow these steps:

1. Clone the repository:
   ```bash
   https://github.com/gateremark/hometopia.git
   ```
   
2. Install the dependencies:
   ```bash
   cd hometopia
   ```
   ```bash
   pnpm install
   ```
   
3. Configure Firebase authentication:
   Create a Firebase project and obtain the necessary credentials.
   Update the Firebase configuration in `src/firebase.js` with your own credentials.
   
4. Start the development server:

   ```javascript
   pnpm run dev
   ```

5. Open your browser and visit specified local host port to view the app eg. `http://localhost:3000`.


## Deployment
HomeTopia is deployed using Vercel. Any changes pushed to the main branch will trigger an automatic deployment.
You can visit the live version of HomeTopia at https://hometopia-gm.vercel.app/.

## Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request.
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to the branch.
5. Submit a pull request.

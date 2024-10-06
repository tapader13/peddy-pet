# Peddy - Pet Adoption Platform

**Peddy** is a dynamic and responsive web platform that allows users to browse and adopt pets. The platform integrates several APIs to fetch pet data, display detailed pet information, and manage the adoption process. Users can view pets by category, like them, and initiate the adoption process. The application ensures a smooth and visually appealing experience, adhering to a responsive design and optimal user interaction.

## Features

- **Dynamic Pet Listings with Categories**:  
  Users can browse through a wide variety of pets by category (dogs, cats, birds, etc.). All data is dynamically fetched from an API and displayed in a grid format.

- **Adopt Your Best Friend Section**:  
  The main section of the platform displays pets with details like their name, breed, gender, birth date, and price. Users can filter pets by category and sort them by price.

- **Interactive Modal for Pet Details**:  
  Clicking the "Details" button opens a modal with complete information about the pet, fetched from the API. The modal closes when the user clicks the close button.

- **Adopt and Like Functionality**:  
  Users can like pets, and their liked pets are displayed in a right-side grid layout. When the "Adopt" button is clicked, a countdown appears, and the button text changes to "Adopted" after completion.

- **Responsive Design**:  
  The platform is fully responsive, adapting to desktops, tablets, and mobile screens. The navigation bar, banner, footer, and all sections maintain a clean and functional layout on all devices.

## ES6 Features Used

- **Arrow Functions**: Used to simplify callback functions and improve code readability.
- **Destructuring**: Applied when extracting data from API responses to work with the required properties.
- **Template Literals**: Utilized for dynamic HTML and string concatenation with embedded expressions.
- **Promises (Async/Await)**: Employed for handling API requests asynchronously, making the code clean and easy to manage.
- **Modules**: Organized code into separate JavaScript modules for better structure and maintainability.

## Challenges Overcome

- **Sorting Functionality**: Implemented a feature that sorts pets by price in descending order within their active category.
- **Countdown for Adoption**: Managed a smooth countdown with JavaScript `setInterval` before confirming the adoption process.
- **Handling API Data**: Ensured that all possible null or undefined values from the API are handled gracefully with meaningful placeholders.

## Live Link

- [Deployed Project Live Link](#) 
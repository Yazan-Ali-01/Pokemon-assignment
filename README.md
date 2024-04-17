# Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Feedback](#feedback)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction <a name="introduction"></a>

This application is built using Next.js and leverages the PokeAPI to display a dynamic list of Pokémon categories, enabling users to explore Pokémon by their types. Additionally, it utilizes React-Query for state management and Styled-Components for styling, with data visualization supported by React-ApexCharts.

## Features <a name="features"></a>

- Browse all Pokémon categories on the initial load.
- Click on a category to view all Pokémon within that category.
- View detailed information and statistical data about each Pokémon in a visually appealing graph.
- Search functionality to filter through Pokémon names.
- Display Pokémon under multiple categories if applicable.

## Demo <a name="demo"></a>

> **Note:** Live demo and screenshots will be added once the project is deployed.

## Technologies Used <a name="technologies-used"></a>

- **Next.js** for server-side rendering and routing.
- **React-Query** for efficient data fetching and state management.
- **Tailwind-CSS** for customized and readable modern CSS.
- **React-ApexCharts** for rendering responsive and interactive charts.

## Installation <a name="installation"></a>

To set up this project locally, follow these steps:

1. Clone the repository:
git clone https://github.com/Yazan-Ali-01/Pokemon-Dashboard.git

2. Navigate to the project directory:
cd Pokemon-Dashboard


3. Install dependencies:
npm install

4. Start the development server:
npm run dev

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Docker Setup

### Building the Docker Image

To containerize the application, first build the Docker image by running the following command in your project directory:

```bash
docker build -t pokemon-dashboard .
```
```bash
docker run -p 3000:3000 pokemon-dashboard
```
## Usage <a name="usage"></a>

After installation, the application will be running on your local server. Use the navigation features on the home page to explore different Pokémon and their details.

## Feedback <a name="feedback"></a>

We value your input! If you have feedback or issues, please open an issue in the GitHub repository or submit your suggestions via email.

## Contributing <a name="contributing"></a>

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## Contact <a name="contact"></a>

Feel free to reach out for more information:

- Email: [yazan.ali.dev@gmail.com](mailto:yazan.ali.dev@gmail.com)
- LinkedIn: [Yazan Ali](https://www.linkedin.com/in/yazan-ali/)
> [!IMPORTANT]  
> Project is deployed [here](https://payment-gateway-ft.vercel.app/)
> 

# Payment Gateway Frontend
This project is a frontend for the payment gateway, it uses the [React](https://reactjs.org/) framework and [Redux](https://redux.js.org/) for state management. It uses [Tailwind CSS](https://tailwindcss.com/) for styling and [Shadcn UI](https://shadcn.com/) for components.

## Installation
Make sure you have Node Version Manager (nvm) installed on your system. You can install it from https://github.com/nvm-sh/nvm.
```bash
# Clone the repository
git clone https://github.com/your-username/payment-gateway-ft.git
# Install project dependencies
npm i
```

## Configuration
Create a `.env` file in the root directory of the project and add the following variables:
```bash
VITE_USER_NODE_ENV=development
VITE_API_URL=http://localhost:3000
```

## Run
```bash
#In development mode:
npm run dev
```
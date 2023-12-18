# Crowdfunding Project on blockchain development

Our Crowdfunding Website: https://657fe3da8ccef3019f9634c7--friendly-gelato-62e82d.netlify.app/
Our Contract Address: 0xCA5060cd41BfE3af5c78DF4669435b70c664Ff1c

## Installation

Our project requires [Node.js](https://nodejs.org/) to run.

Create project "CrowdFundingProject"

```sh
mkdir CrowdFundingProject
cd CrowdFundingProject
```

Create 3 subfolders

```sh
mkdir client web3_test
```

- client: Vite development
- web3_test: test smart contract on hardhat environment

# Client

For UI and backend interact with Smart Contract

```sh
cd client
npx thirdweb create --app
```

```sh
What is your project named? ./
What framework do you want to ues? Vite
What language do you want to use? JavaScript
```

Install react-router-dom

```sh
npm install react-router-dom
```

Install Icon from fontawesome

```sh
npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
```

Install tailwindcss

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Install tailwind daisyUI

```sh
npm i -D daisyui@latest
```

Delete `public`
Replace `src`,`index.html`, and `tailwind.config.js` by our `src`,`index.html`, and `tailwind.config.js` `index.html`

```sh
npm run dev
```

The local website is on `http://localhost:5173/`

## Web3_test

Write Smart Contract and test with Hardhat
Go to web3_test folder

```sh
cd ../web3_test
```

Init npm

```sh
npm init -y
```

Install Hardhat module

```sh
npm install --save-dev hardhat
```

Craete Hardhat project

```sh
npx hardhat
```

√ What do you want to do? · Create a JavaScript project
√ Hardhat project root: · path/to/your/project
√ Do you want to add a .gitignore? (Y/n) · y
Install Hardhat toolbox

```sh
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Replace `Lock.sol` in `contract` by `Crowdfunding.sol`
Replace `Lock.js` in `test` by `Test.js`

Start the test

```sh
npx hardhat test
```

The result should look like

```sh
  CrowdFunding
    ✔ Should allow donors to contribute to the campaign (89ms)
    ✔ Should create a campaign with valid parameters (38ms)
    ✔ Should reject creating a campaign with a past deadline (73ms)
    ✔ Should reject creating a campaign with a zero target
    ✔ Should return correct campaign count (38ms)
    ✔ Should reject donations to a closed campaign (52ms)
    ✔ Should reject donations of zero amount
    ✔ Should return the correct details of all campaigns (68ms)
    ✔ Should allow only the campaign owner to refund donors
    ✔ Should revert refunding if no funds are collected
    ✔ Should allow only the campaign owner to reopen a refunded campaign (58ms)
    ✔ Should allow only the campaign owner to withdraw funds (44ms)
    ✔ Should not allow withdrawing funds if the campaign is not open (43ms)
    ✔ Should not allow withdrawing funds if less than 50% of the target is reached
```

## Deploy Smart Contract

Deploy Smart Contract on [thirdweb](https://thirdweb.com/)
Go back to `CrowdFundingProject` folder

```sh
cd ..
```

Using thirdweb create the contract

```sh
npx thirdweb@latest create --contract
```

```sh
√ What is your project named? ... web3
√ What framework do you want to use? » Hardhat
√ What will be the name of your new smart contract? ... Crowdfunding
Empty Contract
```

```sh
cd web3
```

Install dotenv

```sh
npm install dotenv
```

Replace `contract.sol` in contracts by our `Crowdfunding.sol`
Replace `hardhat.config.js` by our `hardhat.config.js`
Create `.env` and place your wallet private key inside.
Example of in `.env`

```sh
PRIVATE_KEY=your_private_key
```

Deploy the contract

```sh
npm run deploy
```

Click the link and follow the thirdweb interface to deploy the contract

```sh
✔ Detected project type: hardhat
✔ Compilation successful
✔ Processing contract: "CrowdFunding"
✔ Upload successful
✔ Open this link to deploy your contracts: {Link}
```

After deploy you will get the contract address
Copy contract address and replace to `CrowdFundingProject\client\src\context\index.js` line 16
where `useContract(your_contract_address)`

Now the web interface is interact with your created contract
You can run `npm run build` in client.
You will get `dict` folder and can deploy on [Netlify](https://www.netlify.com/)

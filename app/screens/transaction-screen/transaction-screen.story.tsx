import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { TransactionScreen } from "./transaction-screen"
import { AccountType, CurrencyType } from "../../utils/enum"

import moment from 'moment'

let transactions = [
  {
      "id": "txishash",
      "amount": 10040,
      "description": "pending",
      "created_at": 1602013466,
      "hash": null,
      "type": "onchain_receipt",
      "usd": 0.95829792,
      "fee": 0,
      "feeUsd": 0,
      "pending": true
  },
  {
      "id": "txishash",
      "amount": -10040,
      "description": "pending",
      "created_at": 1602013466,
      "hash": null,
      "type": "onchain_payment",
      "usd": 0.95829792,
      "fee": 0,
      "feeUsd": 0,
      "pending": true
  },
  {
      "id": "5f7cc9191d5fd1ead51ef856",
      "amount": -17090,
      "description": "this is my onchain memo",
      "created_at": 1602013465,
      "hash": "8c37fb5cc3e4e0869edcfe4106ab9859b3d7ab022f4ef82320a0cf2a3b5f68ab",
      "type": "onchain_payment",
      "usd": 1.63120632,
      "fee": 7050,
      "feeUsd": 0.67810425,
      "pending": false
  },
  {
      "id": "5f7cc9171d5fd1ead51ef852",
      "amount": -10040,
      "description": "onchain_on_us",
      "created_at": 1602013463,
      "hash": null,
      "type": "onchain_on_us",
      "usd": 0.95829792,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  },
  {
      "id": "5f7cc9131d5fd1ead51ef850",
      "amount": -17090,
      "description": "onchain_payment",
      "created_at": 1602013459,
      "hash": "e556b43ec104d275b8a151536e5dfa16be2469a5a4e931ac5000c563f2ffe85a",
      "type": "onchain_payment",
      "usd": 1.63120632,
      "fee": 7050,
      "feeUsd": 0.67810425,
      "pending": false
  },
  {
      "id": "5f7cc846e1cfb6e984751296",
      "amount": -10040,
      "description": "this is my onchain memo",
      "created_at": 1602013254,
      "hash": null,
      "type": "onchain_on_us",
      "usd": 0.95829792,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  },
  {
      "id": "5f7cc844e1cfb6e984751294",
      "amount": -17090,
      "description": "this is my onchain memo",
      "created_at": 1602013252,
      "hash": "6bbb75fc4b622391d1d6cf38ecf68e1fa95edd3a0bb72297ebfe001252f11ab3",
      "type": "onchain_payment",
      "usd": 1.63120632,
      "fee": 7050,
      "feeUsd": 0.67810425,
      "pending": false
  },
  {
      "id": "5f7cc842e1cfb6e984751290",
      "amount": -10040,
      "description": "onchain_on_us",
      "created_at": 1602013250,
      "hash": null,
      "type": "onchain_on_us",
      "usd": 0.95829792,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  },
  {
      "id": "5f7cc83ee1cfb6e98475128e",
      "amount": -17090,
      "description": "onchain_payment",
      "created_at": 1602013246,
      "hash": "0a85a0c5cec0de061326b8c9e1ecde0b8b078967017185c4b1e477a506553c95",
      "type": "onchain_payment",
      "usd": 1.63120632,
      "fee": 7050,
      "feeUsd": 0.67810425,
      "pending": false
  },
  {
      "id": "5f7cc8102f8834e9011e3dae",
      "amount": -10040,
      "description": "this is my onchain memo",
      "created_at": 1602013200,
      "hash": null,
      "type": "onchain_on_us",
      "usd": 0.95829792,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  },
  {
      "id": "5f7cc80e2f8834e9011e3dac",
      "amount": -17090,
      "description": "this is my onchain memo",
      "created_at": 1602013198,
      "hash": "6782071f54bf9198ea2b6f9bd312f2122403b2dc91c47bd5bb6de373c95c965d",
      "type": "onchain_payment",
      "usd": 1.63120632,
      "fee": 7050,
      "feeUsd": 0.67810425,
      "pending": false
  },
  {
      "id": "5f7cc80c2f8834e9011e3da8",
      "amount": -10040,
      "description": "onchain_on_us",
      "created_at": 1602013196,
      "hash": null,
      "type": "onchain_on_us",
      "usd": 0.95829792,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  },
  {
      "id": "5f7cc80a2f8834e9011e3da6",
      "amount": -17090,
      "description": "onchain_payment",
      "created_at": 1602013194,
      "hash": "81632db05cf10e57e6d7a947ffef18d81b91bb31b1a0a357d91938a9f4e8be7b",
      "type": "onchain_payment",
      "usd": 1.63120632,
      "fee": 7050,
      "feeUsd": 0.67810425,
      "pending": false
  },
  {
      "id": "5f7cc7bbb1d052e84f10887e",
      "amount": -10040,
      "description": "this is my onchain memo",
      "created_at": 1602013115,
      "hash": null,
      "type": "onchain_on_us",
      "usd": 0.95829792,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  },
  {
      "id": "5f7cc7bab1d052e84f10887c",
      "amount": -17090,
      "description": "this is my onchain memo",
      "created_at": 1602013114,
      "hash": "6c5b14d03903eda5dd4b6cf913731400e5d88d152e51f4fbe35df706941b0bac",
      "type": "onchain_payment",
      "usd": 1.63120632,
      "fee": 7050,
      "feeUsd": 0.67810425,
      "pending": false
  },
  {
      "id": "5f7cc7b8b1d052e84f108878",
      "amount": -10040,
      "description": "onchain_on_us",
      "created_at": 1602013112,
      "hash": null,
      "type": "onchain_on_us",
      "usd": 0.95829792,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  },
  {
      "id": "5f7cc7b6b1d052e84f108876",
      "amount": -17090,
      "description": "onchain_payment",
      "created_at": 1602013110,
      "hash": "06d797030291920711b2de08162b517f0419653218a78115be4ee46ac10402f7",
      "type": "onchain_payment",
      "usd": 1.63120632,
      "fee": 7050,
      "feeUsd": 0.67810425,
      "pending": false
  },
  {
      "id": "5f7cc5fff4ac7ce5764a200d",
      "amount": 100000000,
      "description": "onchain_receipt",
      "created_at": 1602012671,
      "hash": "04af0fb95b3841d0bb805aeda6508b658f9ae08ef473e3c649f21e7a8080eb0b",
      "type": "onchain_receipt",
      "usd": 9544.8,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  },
  {
      "id": "5f7cc5fff4ac7ce5764a200a",
      "amount": 100000000,
      "description": "onchain_receipt",
      "created_at": 1602012671,
      "hash": "1aa67b9bd340a7491a6acf3db13a7281035c88f83c5caeae8fe2a532f3b87acc",
      "type": "onchain_receipt",
      "usd": 9544.8,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  },
  {
      "id": "5f7cc5f7f4ac7ce5764a2007",
      "amount": 100000000,
      "description": "onchain_receipt",
      "created_at": 1602012663,
      "hash": "bccfece4198f0de0c132081319df3a249ab3f969d9795c08156073b65e747ccb",
      "type": "onchain_receipt",
      "usd": 9544.8,
      "fee": 0,
      "feeUsd": 0,
      "pending": false
  }
]

transactions = transactions.map(tx => ({...tx, text: () => tx.amount, isReceive: tx.amount > 0 }))

storiesOf("Transaction History", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Dollar" usage="The primary.">
        <TransactionScreen 
          transactions={transactions}
          currency={CurrencyType.BTC}
          // refreshing={true}
          
          />
      </UseCase>
    </Story>
  ))

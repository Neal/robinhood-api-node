# Robinhood API

[![Build Status](https://travis-ci.com/Neal/robinhood-api-node.svg?token=zLjxUMzxyqcdWes6aZdW&branch=master)](https://travis-ci.com/Neal/robinhood-api-node)

A Node.js wrapper for the [Robinhood API](https://api.robinhood.com/).

### Constructor

```js
let rh = new Robinhood({
  username: 'myRobinhoodUsername',
  password: 'myRobinhoodPassword'
});

rh.accounts.get()
  .then(data => {
    console.log(data.body);
    console.log(data.headers);
    console.log(data.statusCode);
  });
```

#### Possible Options

- `username`
- `password`
- `authToken`
- `accountNumber`
- `apiRoot`

**Note:** Either `username` and `password` or `authToken` is required.

#### Enviornment Variables

Enviornment varialbes are an alternative to passing them in constructor.

- `ROBINHOOD_USERNAME`
- `ROBINHOOD_PASSWORD`
- `ROBINHOOD_AUTH_TOKEN`
- `ROBINHOOD_ACCOUNT_NUMBER`
- `ROBINHOOD_API_ROOT`


### API Servers

| Enviornment | URL |
| ----------- |:--- |
| Production  | `https://api.robinhood.com` |
| Development | `http://brokeback.dev.robinhood.com` |

## API Overview

**Note:** All API methods return a `Promise` and also have an optional `callback`.

### Accounts

#### Get All Accounts

`GET /accounts/`

```js
rh.accounts.getAll(callback);
```

#### Get Primary Account

`GET /accounts/:accountNumber/`

```js
rh.accounts.get(callback);
```

#### Check Day Trades for Instrument

`GET /accounts/:accountNumber/day_trade_checks/`

```js
rh.accounts.checkDayTrade(instrument, callback);
```

#### Get Recent Day Trades

`GET /accounts/:accountNumber/recent_day_trades/`

```js
rh.accounts.recentDayTrades(callback);
```

#### Get Dividends

`GET /dividends/`

```js
rh.accounts.dividends(callback);
```

#### Get Dividend

`GET /dividends/:id/`

```js
rh.accounts.dividend(id, callback);
```

#### Get Portfolios

`GET /portfolios/:accountNumber/`

```js
rh.accounts.portfolios(callback);
```

#### Get Positions

`GET /positions/`

```js
rh.accounts.positions(callback);
```

#### Get Position

`GET /positions/:accountNumber/:instrumentId`

```js
rh.accounts.position(instrumentId, callback);
```

### Ach

#### Get Relationships

`GET /ach/relationships/`

```js
rh.ach.getRelationships(callback);
```

#### Get Relationship

`GET /ach/relationships/:id/`

```js
rh.ach.getRelationship(id, callback);
```

#### Get Transfers

`GET /ach/transfers/`

```js
rh.ach.getTransfers(callback);
```

#### Get Transfer

`GET /ach/transfers/:id/`

```js
rh.ach.getTransfer(id, callback);
```

#### Get Deposit Schedules

`GET /ach/deposit_schedules/`

```js
rh.ach.getDepositSchedules(callback);
```

#### Get Deposit Schedule

`GET /ach/deposit_schedules/:id/`

```js
rh.ach.getDepositSchedule(id, callback);
```

#### Get Queued Deposit

`GET /ach/iav/queued_deposit/`

```js
rh.ach.getQueuedDeposit(callback);
```

#### Verify Micro Deposits

`POST /ach/relationships/:relationshipId/micro_deposits/veryify/`

```js
rh.ach.verifyMicroDeposits(relationshipId, amountOne, amountTwo, callback);
```

#### Get Bank

`GET /ach/banks/:routingNumber/`

```js
rh.ach.getBank(routingNumber, callback);
```

### Applications

#### Get All Applications

`GET /applications/`

```js
rh.applications.getAll(callback);
```

#### Get Application(s) for Type

`GET /applications/:type/`

```js
rh.applications.get(type, callback);
```

### Auth

#### Login

`POST /api-token-auth/`

```js
rh.auth.login(username, password, callback);
```

#### Logout

`POST /api-token-logout/`

```js
rh.auth.logout(callback);
```

### Documents

#### Request Documents

`GET /upload/document_requests/`

```js
rh.documents.requests(callback);
```

#### Get All

`GET /documents/`

```js
rh.documents.getAll(callback);
```

#### Get Info

`GET /documents/:id/`

```js
rh.documents.getInfo(id, callback);
```

#### Get URL

`GET /documents/:id/download/`

```js
rh.documents.getUrl(id, callback);
```

### Instruments

#### For Symbol

`GET /instruments/`

```js
rh.instruments.forSymbol(symbol, callback);
```

#### For Id

`GET /instruments/:id/`

```js
rh.instruments.forId(id, callback);
```

### Margin

#### Get Upgrades

`GET /margin/upgrades/`

```js
rh.margin.getUpgrades(callback);
```

#### Post Upgrades

`POST /margin/upgrades/`

```js
rh.margin.postUpgrades(callback);
```

#### Get Settings

`GET /settings/margin/:accountNumber/`

```js
rh.margin.getSettings(callback);
```

### Markets

#### Get All Markets

`GET /markets/`

```js
rh.markets.getAll(callback);
```

#### Get Market

`GET /markets/:mic/`

```js
rh.markets.get(mic, callback);
```

#### Get Hours

`GET /markets/:mic/:date/`

```js
rh.markets.getHours(mic, date, callback);
```

### Midlands

#### Get Instant Permissions

`GET /midlands/permissions/instant/`

```js
rh.midlands.getInstantPermissions(callback);
```

#### Top Movers

`GET /midlands/movers/sp500/`

```js
rh.midlands.topMovers(callback);
```

#### News

`GET /midlands/news/:symbol/`

```js
rh.midlands.news(symbol, callback);
```

#### Get Notifications Stack

`GET /midlands/notifications/stack/`

```js
rh.midlands.getNotificationsStack(callback);
```

#### Dismiss Notification

`POST /midlands/notifications/stack/:id/dismiss/`

```js
rh.midlands.dismissNotification(id, callback);
```

#### Get ACH Banks

`GET /midlands/ach/banks/`

```js
rh.midlands.getAchBanks(callback);
```

### Notifications

#### Get Notifications

`GET /notifications/`

```js
rh.notifications.get(callback);
```

#### Get Settings

`GET /settings/notifications/`

```js
rh.notifications.getSettings(callback);
```

#### Get Devices

`GET /notifications/devices/`

```js
rh.notifications.getDevices(callback);
```

### Orders

#### Get All Orders

`GET /orders/`

```js
rh.orders.getAll(callback);
```

#### Get Order

`GET /orders/`

```js
rh.orders.get(id, callback);
```

#### Get Order for Instrument

`GET /orders/`

```js
rh.orders.forInstrument(instrumentId, callback);
```

#### Place Order

`POST /orders/`

```js
rh.orders.place(opts, callback);
```

#### Place Buy Order

`POST /orders/`

```js
rh.orders.buy(opts, callback);
```

#### Place Sell Order

`POST /orders/`

```js
rh.orders.sell(opts, callback);
```

### Password

#### Request Reset

`POST /password_reset/request/`

```js
rh.password.requestReset(email, callback);
```

#### Reset

`POST /password_reset/`

```js
rh.password.reset(token, password, callback);
```

### Quotes

#### `GET /quotes/:symbol/`

```js
rh.quotes.get(symbol, callback);
```

### User

#### Get User

`GET /user/`

```js
rh.user.get(callback);
```

#### Get User Id

`GET /user/id/`

```js
rh.user.getId(callback);
```

#### Get Basic Info

`GET /user/basic_info/`

```js
rh.user.getBasicInfo(callback);
```

#### Get Additional Info

`GET /user/additional_info/`

```js
rh.user.getAdditionalInfo(callback);
```

#### Get Employment

`GET /user/employment/`

```js
rh.user.getEmployment(callback);
```

#### Get Investment Profile

`GET /user/investment_profile/`

```js
rh.user.getInvestmentProfile(callback);
```

#### Get Identity Mismatch

`GET /user/identity_mismatch/`

```js
rh.user.getIdentityMismatch(callback);
```

#### Get CIP Questions

`GET /user/cip_questions/`

```js
rh.user.getCipQuestions(callback);
```

### Watchlists

#### Get Watchlists

`GET /watchlists/`

```js
rh.watchlists.get(callback);
```

### Wire

#### Get Relationships

`GET /wire/relationships/`

```js
rh.wire.getRelationships(callback);
```

#### Get Transfers

`GET /wire/transfers/`

```js
rh.wire.getTransfers(callback);
```

## License

MIT

# HubSpot Cog

[![CircleCI](https://circleci.com/gh/run-crank/cog-hubspot/tree/master.svg?style=svg)](https://circleci.com/gh/run-crank/cog-hubspot/tree/master)

This is a [Crank][what-is-crank] Cog for HubSpot, providing
steps and assertions for you to validate the state and behavior of your
HubSpot instance.

* [Installation](#installation)
* [Usage](#usage)
* [Development and Contributing](#development-and-contributing)

## Installation

Ensure you have the `crank` CLI and `docker` installed and running locally,
then run the following.  You'll be prompted to enter your HubSpot
credentials once the Cog is successfully installed.

```shell-session
$ crank cog:install automatoninc/hubspot
```

Note: You can always re-authenticate later.

## Usage

### Authentication
<!-- run `crank cog:readme automatoninc/hubspot` to update -->
<!-- authenticationDetails -->
You will be asked for the following authentication details on installation.

- **apiKey**: API Key

```shell-session
# Re-authenticate by running this
$ crank cog:auth automatoninc/hubspot
```
<!-- authenticationDetailsEnd -->

### Steps
Once installed, the following steps will be available for use in any of your
Scenario files.

<!-- run `crank cog:readme automatoninc/hubspot` to update -->
<!-- stepDetails -->
<h4 id="CreateOrUpdateContactStep">Create or update a HubSpot contact</h4>

- **Expression**: `create or update a hubspot contact`
- **Expected Data**:
  - `contact`: A map of field names to field values
- **Step ID**: `CreateOrUpdateContactStep`

<h4 id="DeleteContactStep">Delete a HubSpot contact</h4>

- **Expression**: `delete the (?<email>.+) hubspot contact`
- **Expected Data**:
  - `email`: Contact's email address
- **Step ID**: `DeleteContactStep`

<h4 id="ContactFieldEquals">Check a field on a HubSpot Contact</h4>

- **Expression**: `the (?<field>[a-zA-Z0-9_-]+) field on hubspot contact (?<email>.+) should be (?<expectation>.+)`
- **Expected Data**:
  - `email`: Contact's email address
  - `field`: Field name to check
  - `expectation`: Expected field value
- **Step ID**: `ContactFieldEquals`
<!-- stepDetailsEnd -->

## Development and Contributing
Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change. Please make sure to add or update tests
as appropriate.

### Setup

1. Install node.js (v12.x+ recommended)
2. Clone this repository.
3. Install dependencies via `npm install`
4. Run `npm start` to validate the Cog works locally (`ctrl+c` to kill it)
5. Run `crank cog:install --source=local --local-start-command="npm start"` to
   register your local instance of this Cog. You may need to append a `--force`
   flag or run `crank cog:uninstall automatoninc/hubspot` if you've already
   installed the distributed version of this Cog.

### Adding/Modifying Steps
Modify code in `src/steps` and validate your changes by running
`crank cog:step automatoninc/hubspot` and selecting your step.

To add new steps, create new step classes in `src/steps`. Use existing steps as
a starting point for your new step(s). Note that you will need to run
`crank registry:rebuild` in order for your new steps to be recognized.

Always add tests for your steps in the `test/steps` folder. Use existing tests
as a guide.

### Modifying the API Client or Authentication Details
Modify the ClientWrapper class at `src/client/client-wrapper.ts`.

- If you need to add or modify authentication details, see the
  `expectedAuthFields` static property.
- If you need to expose additional logic from the wrapped API client, add a new
  ublic method to the wrapper class, which can then be called in any step.
- It's also possible to swap out the wrapped API client completely. You should
  only have to modify code within this clase to achieve that.

Note that you will need to run `crank registry:rebuild` in order for any
changes to authentication fields to be reflected. Afterward, you can
re-authenticate this Cog by running `crank cog:auth automatoninc/hubspot`

### Tests and Housekeeping
Tests can be found in the `test` directory and run like this: `npm test`.
Ensure your code meets standards by running `npm run lint`.

[what-is-crank]: https://crank.run?utm_medium=readme&utm_source=automatoninc%2Fhubspot

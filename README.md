# React Component Library

React and Redux code to be reused across projects presented in a storybook dev environment.


## Usage
To install:

### `npm i @linn-it/linn-form-components-library`

You can explore components currently in the project by looking at the [storybook](https://linn.github.io/react-components-library)
.

To use components, import them individually like so:

```
import { BackButton } from '@linn-it/linn-form-components-library';
```

## Development

In the project directory, you can run:

### `npm run storybook`

which runs the storybook dev server.

Make a new branch and add your new components, tests and stories in the relevant directories and view them in your local storybook.
When you are ready to share your new component, add it to the index.js following the existing syntax. Up the version number in package.json and then make a pull request for review.

After merging your new component branch you can build the npm package from master and deploy in one command using:

### `npm run deploy`

This command runs the tests, builds the project, deploys to the storybook site and
publishes the new package to npm for use in other projects. (n.b. if this is your first time, you'll need to make an npm account and request contribution permissions for this package.)

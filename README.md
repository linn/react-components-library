# React Component Library

React components to be reused across projects presented in a storybook dev environment.


## Usage
To install:

### `npm i @linn-it/linn-form-components-library`

You can explore components currently in the project by running the storybook dev server (see Development).

To use components, import them individually like so:

```
import { BackButton } from '@linn-it/linn-form-components-library';
```

## Development

In the project directory, you can run:

### `npm run storybook`

which runs the storybook dev server.

Make a new branch and add your new components, tests and stories in the relevant directories and view them in storybook.
When you are ready to share your new component, add it to the index.js following the existing syntax. Up the version number in package.json and then make a pull request for review.

After merging your new component branch into master, build the npm package:

### ` npm run build`

and publish it:

### ` npm publish --access public`

to publish the changes to npm. (n.b. if this is your first time, you'll need to make an npm account and request contribution permissions for this package.)

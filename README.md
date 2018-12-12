# React Component Library

This project consists of react components to be reused across projects.


## Usage
To install: 

### `npm i linn-reusable-react-components-library`

To use components, import them individually like so: 

```
import BackButton from 'linn-reusable-react-components-library';
```

## Development

In the project directory, you can run:

### `npm run storybook`

which runs the storybook dev server.

Make a new branch and add your new components, tests and stories in the relevant directories and view them in storybook.
When you are ready to share your new component, add it to the index.js following the existing syntax, up the version number in package.json and then make a pull request for review.

After merging your new component branch into master, run 

### ` npm publish --access public` 

to publish the changes to npm.



import { fn } from 'storybook/test';
import Grid from '@mui/material/Grid';
import PrevNextButtons from './PrevNextButtons';

export default {
    title: 'Components/PrevNextButtons',
    component: PrevNextButtons,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <Grid container>
                <Story />
            </Grid>
        )
    ],
    args: {
        goPrev: fn(),
        goNext: fn(),
        prevResult: 'Previous',
        nextResult: 'Next',
        disabled: false
    }
};

export const Default = {};

export const PrevOnly = {
    name: 'Prev only',
    args: {
        goNext: null,
        prevResult: 'Item 4'
    }
};

export const NextOnly = {
    name: 'Next only',
    args: {
        goPrev: null,
        nextResult: 'Item 6'
    }
};

export const Disabled = {
    args: {
        disabled: true,
        prevResult: 'Item 4',
        nextResult: 'Item 6'
    }
};

export const NeitherButton = {
    name: 'Neither button (no navigation)',
    args: {
        goPrev: null,
        goNext: null
    }
};

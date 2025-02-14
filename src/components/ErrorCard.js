import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Error from '@mui/icons-material/Error';

function ErrorCard({ errorMessage, detailLines = [] }) {
    return (
        <Card
            sx={{
                width: '50%',
                margin: '0 auto',
                padding: theme => theme.spacing(2),
                backgroundColor: theme => theme.palette.error.light
            }}
        >
            <Error sx={{ color: theme => theme.palette.error.dark, float: 'right' }} />

            <Typography align="center">{errorMessage}</Typography>
            <div>
                {detailLines?.map(d => (
                    <Typography
                        key={d.descriptor}
                        align="center"
                    >{`${d.descriptor} - ${d.message}`}</Typography>
                ))}
            </div>
        </Card>
    );
}

export default ErrorCard;

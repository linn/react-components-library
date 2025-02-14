import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function CreateButton({ createUrl, disabled = false }) {
    return (
        <Link to={createUrl} style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="outlined" sx={{ float: 'right' }} disabled={disabled}>
                Create
            </Button>
        </Link>
    );
}

export default CreateButton;

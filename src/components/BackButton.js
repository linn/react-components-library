import Button from '@mui/material/Button';

function BackButton({ backClick, text = null }) {
    return (
        <div style={{ float: 'left' }}>
            <Button id="back-button" onClick={backClick}>
                {text || 'Back'}
            </Button>
        </div>
    );
}

export default BackButton;

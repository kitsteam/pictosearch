import { styled } from '@mui/material/styles';
import { CirclePicker } from 'react-color';

const ColorSelection = styled(CirclePicker)(({theme}) => ({
    backgroundColor: '#f1f1f1',
    borderRadius: theme.spacing(1),
    paddingLeft: '14px',
    paddingTop: '14px',
    maxWidth: '100%',
    boxSizing: 'border-box',
    float: 'left',
    clear: 'both',
    width: 'auto !important',
    marginBottom: '0px !important',
}));

export default ColorSelection;
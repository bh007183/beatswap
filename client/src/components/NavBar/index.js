import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

export default function NavBar() {
  return (
    <Stack spacing={2} direction="row">
        <Link to="/deezer">
      <Button variant="text">Deezer</Button>
      </Link>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
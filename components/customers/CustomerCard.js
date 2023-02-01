/* eslint-disable react/require-default-props */
/* eslint-disable prefer-template */
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import {
  CardContent, CardHeader, MenuItem, Typography,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { signOut } from '../../utils/auth';
import { deleteCustomer } from '../../utils/data/customerData';

export default function CustomerCard({
  userId, userUid, firstName, lastName, dateRegistered, image, bio,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteTheUser = () => {
    if (window.confirm('Are you sure you want to delete this?')) {
      deleteCustomer(userId).then(() => {
        signOut();
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      {user.uid === userUid ? (
        <CardHeader
          action={(
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 45 * 4.5,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem>
                  <Link className="" href={`/customers/edit/${userId}`} passHref>
                    <IconButton aria-label="edit" className="edit-btn verticalIcon">
                      <EditIcon style={{ color: 'black' }} />
                      Edit
                    </IconButton>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <IconButton aria-label="delete" className="delete-btn verticalIcon" onClick={deleteTheUser}>
                    <DeleteIcon style={{ color: 'black' }} />
                    Delete
                  </IconButton>
                </MenuItem>
              </Menu>
            </>
          )}
          title={firstName + ' ' + lastName}
          subheader={'Created on: ' + dateRegistered}
        />
      ) : (
        <CardHeader
          title={firstName + ' ' + lastName}
          subheader={'Created on: ' + dateRegistered}
        />
      )}
      <CardMedia
        component="img"
        height="200"
        image={image}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {bio}
        </Typography>
      </CardContent>
    </Card>
  );
}

CustomerCard.propTypes = {
  userId: PropTypes.number,
  userUid: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  bio: PropTypes.string,
  image: PropTypes.string,
  dateRegistered: PropTypes.string,
};

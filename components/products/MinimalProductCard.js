/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function MinimalProductCard({
  image, title, cost, productId,
}) {
  return (
    <Link passHref href={`products/${productId}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cost}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

MinimalProductCard.propTypes = {
  productId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
};

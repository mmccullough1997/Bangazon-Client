/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function MinimalProductCard({
  image, title, cost, productId,
}) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/products/${productId}`)}>
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
    </div>
  );
}

MinimalProductCard.propTypes = {
  productId: PropTypes.number,
  image: PropTypes.string,
  title: PropTypes.string,
  cost: PropTypes.string,
};

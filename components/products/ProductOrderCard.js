/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function ProductOrderCard({ productOrders }) {
  return (
    <div>
      {productOrders.map((productOrder) => (
        <Card key={productOrder.id} sx={{ display: 'flex' }} className="productOrderCard">
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={productOrder?.product?.image}
            alt="Live from space album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <div>
                <Typography component="div" variant="h5">
                  {productOrder?.product?.title}
                </Typography>
                <Typography component="div" variant="h5">
                  ${productOrder?.product?.cost}
                </Typography>
              </div>
              <hr />
              <div>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Sold by: {productOrder.product.seller.first_name} {productOrder.product.seller.last_name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Qty: {productOrder.quantity}
                </Typography>
              </div>
              <hr />
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Subtotal: ${productOrder.subtotal}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}

    </div>
  );
}

ProductOrderCard.propTypes = {
  productOrders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    quantity: PropTypes.number,
    customer: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    product: PropTypes.shape({
      id: PropTypes.number,
      cost: PropTypes.string,
      image: PropTypes.string,
      quantity: PropTypes.number,
      seller: PropTypes.shape({
        id: PropTypes.number,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
      }),
    }),
  })).isRequired,
};

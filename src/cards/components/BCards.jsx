import BCard from "./BCard";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Container
} from "@mui/material";
import { BusinessOutlined } from "@mui/icons-material";

function BCards({ cards, toggleLike, onDelete }) {

  // Empty state with better design
  if (cards.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card
          elevation={2}
          sx={{
            textAlign: 'center',
            py: 6,
            backgroundColor: 'grey.50',
            border: '2px dashed',
            borderColor: 'grey.300'
          }}
        >
          <CardContent>
            <BusinessOutlined
              sx={{
                fontSize: 64,
                color: 'grey.400',
                mb: 2
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              color="grey.700"
              fontWeight="medium"
            >
              No Business Cards Available
            </Typography>
            <Typography
              variant="body1"
              color="grey.700"
              sx={{ maxWidth: 400, mx: 'auto' }}
            >
              There are currently no business cards to display.
              Check back later or try adjusting your search criteria.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 }, px: { xs: 1, sm: 2 } }}>
      {/* Cards Grid - Responsive design */}
      <Grid container spacing={{ xs: 3, sm: 2, md: 3 }} sx={{ mb: 4, justifyContent: 'center' }}>
        {cards.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            xl={2.4}
            key={card._id}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <BCard card={card} toggleLike={toggleLike} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BCards;

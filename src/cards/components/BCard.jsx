import { Card, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BCardBody from "./BCardBody";
import BCardFooter from "./BCardFooter";
import CardActionArea from '@mui/material/CardActionArea';

function BCard({ card, toggleLike, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    setTimeout(() => {
      navigate(`/card-details/${card._id}`);
    }, 300); // Delay to allow for hover effect
  }

  return (
    <CardActionArea>
    <Card
      sx={{

        width: { xs: 300, sm: 270 },
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        borderRadius: 2,
        overflow: 'hidden'
      }}
      elevation={2}
      onClick={handleCardClick}
    >
    
        <CardMedia
          sx={{
            height: 200,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          image={card.image.url}
          title={`${card.title} - Business Logo`}
        />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <BCardBody
            title={card.title}
            subtitle={card.subtitle}
            bizNumber={card.bizNumber}
            phone={card.phone}
            city={card.address.city}
          />
          <BCardFooter
            toggleLike={toggleLike}
            cardId={card._id}
            likes={card.likes}
            phone={card.phone}
            onDelete={onDelete}
            ownerId={card.user_id || card.userId || card.owner}
          />
        </Box>
      
    </Card>
    </CardActionArea >
  );
}

export default BCard;

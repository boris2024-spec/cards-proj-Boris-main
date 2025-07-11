import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, CardActions, IconButton, Tooltip, Divider } from "@mui/material";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesDict";

function BCardFooter({ toggleLike, cardId, likes, phone, onDelete }) {
  const { user, token } = useCurrentUser();
  const [isLiked, setIsLiked] = useState(likes.includes(user?._id));
  const navigate = useNavigate();

  const handleLikeToggle = (e) => {
    e.stopPropagation(); // Prevent card click navigation
    setIsLiked((prev) => !prev);
    toggleLike(cardId);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
          },
        }
      );
      if (response.ok) {
        if (onDelete) onDelete(cardId);
      } else {
        alert("Error deleting card. It is not your card.");
      }
    } catch (error) {
      alert("Network error: " + error);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(ROUTES.editCard.replace(":id", cardId));
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent card click navigation
  };

  const handleCallClick = (e) => {
    e.stopPropagation();
    window.open(`tel:${phone}`);
  };

  return (
    <>
      <Divider />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          py: 1
        }}
        disableSpacing
      >
        {/* Management Actions */}
        <Box sx={{ display: 'flex', gap: 0.5, minWidth: 80 }}>
          {user ? (
            <>
              <Tooltip title="Delete Card" arrow>
                <IconButton
                  onClick={handleDelete}
                  size="small"
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      backgroundColor: 'error.light',
                      color: 'white'
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Card" arrow>
                <IconButton
                  onClick={handleEdit}
                  size="small"
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            // Пустой Box-заполнитель, чтобы сохранить ширину
            <Box sx={{ width: 64, height: 32 }} />
          )}
        </Box>

        {/* Interaction Actions */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Call Business" arrow>
            <IconButton
              onClick={handleCallClick}
              size="small"
              sx={{
                color: 'success.main',
                '&:hover': {
                  backgroundColor: 'success.light',
                  color: 'white'
                }
              }}
            >
              <CallIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={isLiked ? "Remove from Favorites" : "Add to Favorites"} arrow>
            <IconButton
              onClick={handleLikeToggle}
              size="small"
              sx={{
                color: isLiked ? 'error.main' : 'grey.500',
                '&:hover': {
                  backgroundColor: isLiked ? 'error.light' : 'grey.100',
                  color: isLiked ? 'white' : 'error.main'
                }
              }}
            >
              {isLiked ?
                <FavoriteIcon fontSize="small" /> :
                <FavoriteBorderIcon fontSize="small" />
              }
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </>
  );
}

export default BCardFooter;

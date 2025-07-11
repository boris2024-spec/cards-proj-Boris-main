import { CardContent, Divider, Typography, Box, Chip } from "@mui/material";
import { LocationOn, Phone, BusinessCenter } from "@mui/icons-material";
import PropTypes from "prop-types";

function BCardBody({ title, subtitle, phone, city, bizNumber }) {
  return (
    <CardContent sx={{ flexGrow: 1, pb: 1, px: { xs: 2, sm: 2 } }}>
      {/* Business Title */}
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          lineHeight: 1.2,
          mb: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          fontSize: { xs: '1rem', sm: '1.25rem' }
          
          
        }}
      >
        {title}
      </Typography>

      {/* Business Subtitle */}
      <Typography
        variant="subtitle1"
        color="text.secondary"
        gutterBottom
        sx={{
          mb: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}
      >
        {subtitle}
      </Typography>

      <Divider sx={{ my: 1.5 }} />

      {/* Contact Information */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone sx={{ fontSize: 16, color: 'primary.main' }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {phone}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOn sx={{ fontSize: 16, color: 'primary.main' }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {city}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <BusinessCenter sx={{ fontSize: 16, color: 'primary.main' }} />
          <Chip
            label={`ID: ${bizNumber}`}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.7rem',
              height: 20
            }}
          />
        </Box>
      </Box>
    </CardContent>
  );
}

BCardBody.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  bizNumber: PropTypes.string.isRequired,
};

export default BCardBody;

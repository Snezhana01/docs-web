import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        О нас
      </Typography>
      <Typography variant="body1" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac ex ac libero elementum volutpat. Nulla facilisi.
        Aenean sit amet purus a arcu tincidunt cursus. Maecenas nec metus id elit fermentum laoreet. Vivamus blandit,
        libero a congue pharetra, libero dolor blandit sapien, et consequat nisi elit eu felis. In hac habitasse platea dictumst.
        Nam feugiat, arcu nec consectetur sollicitudin, metus justo consequat sapien, sit amet finibus justo purus a ipsum.
        Morbi vitae orci sit amet nisl fringilla posuere id ac sapien. Mauris non consectetur nulla, eget ultrices odio.
        Donec fermentum ex libero, in posuere ligula commodo nec.
      </Typography>
      <Typography variant="body1" paragraph>
        Donec eu sem vel tellus iaculis tincidunt. Nulla ullamcorper dapibus leo, in molestie lorem tempus eu. Praesent viverra
        ipsum non ipsum condimentum ultricies. Donec tincidunt consequat magna, nec consequat sem dignissim nec. Proin non
        lobortis lectus. Vestibulum eleifend viverra urna, ut convallis risus vehicula a. Aliquam vel sagittis arcu, at pretium
        justo. Morbi sit amet facilisis lorem. Cras feugiat odio sit amet magna efficitur, at lobortis neque dictum. Nulla
        facilisi. Vivamus elementum felis in justo viverra, a placerat urna vestibulum.
      </Typography>
      <Typography variant="body1" paragraph>
        Proin et ex sed tortor aliquet placerat. Vestibulum a semper odio. Donec sagittis nisl a orci volutpat aliquam. Nunc
        gravida eros id ipsum gravida, id euismod magna pretium. Ut vel nisl neque. Aliquam erat volutpat. Donec condimentum
        orci vitae odio mattis, vel vestibulum justo malesuada. Phasellus id justo sed sapien ultrices finibus. Nullam nec
        ligula ac odio facilisis euismod.
      </Typography>
    </Container>
  );
};

export default AboutUs;

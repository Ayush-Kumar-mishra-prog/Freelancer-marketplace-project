import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Avatar, 
  Box, 
  Button, 
  IconButton, 
  Stack, 
  TextField
} from '@mui/material';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { LiaLinkedin } from 'react-icons/lia';
import { deepPurple } from '@mui/material/colors';


const ProfileCard = () => {
    const dummyClients = [{
        name:"Dummy Clients",
        role:"Senior UI/UX Designer",
        about:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis iste error accusantium laborum quaerat!',
        imgUrl:"/bg.png"
    },
{
        name:"Dummy Clients2",
        role:"Senior UI/UX Designer",
        about:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis iste error accusantium laborum quaerat!',
        imgUrl:"/bg.png"
    },{
        name:"Dummy Clients3",
        role:"Senior UI/UX Designer",
        about:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis iste error accusantium laborum quaerat!',
        imgUrl:"/bg.png"
    },{
        name:"Dummy Clients4",
        role:"Senior UI/UX Designer",
        about:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis iste error accusantium laborum quaerat!',
        imgUrl:"/bg.png"
    },{
        name:"Dummy Clients5",
        role:"Senior UI/UX Designer",
        about:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis iste error accusantium laborum quaerat!',
        imgUrl:"/bg.png"
    }]
  return (
    <>
     <TextField
     fullWidth
     type='search'
              size="small"
              label="Search freelancer"
              sx={{mt:5}}
            />
            
    <div className="grid gap-3 lg:grid-cols-3 sm:grid-cols-1">
     {
        dummyClients.map((data,idx)=>(
            <Card  key={idx}
      sx={{ 
        maxWidth: 360, 
        borderRadius: 4, 
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
        overflow: 'visible', // Allows the avatar to overlap cleanly
        position: 'relative',
        mx: 'auto',
        my: 4
      }}
    >
      {/* Cover Image */}

      <img src={data.imgUrl} alt="" className="w-full h-40 object-cover rounded-md" />
      

      {/* Avatar Container */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: -6 }}>
        
        <Avatar sx={{ bgcolor: deepPurple[500], width: 100, 
            height: 100, 
            border: '4px solid #ffffff',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                                  {data.name.charAt(0).toUpperCase()}
                                  </Avatar>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ textAlign: 'center', pt: 1, pb: 3 }}>
        {/* Name & Title */}
        <Typography sx={{fontWeight:"bold"}} variant="h6" >
         {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {data.role}
        </Typography>

        {/* Social Metrics */}
        <div className='flex justify-center gap-4'>
          <Box>
            <Typography variant="subtitle1" sx={{fontWeight:"bold"}}>12.5k</Typography>
            <Typography variant="caption" color="text.secondary">Followers</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{fontWeight:"bold"}}>842</Typography>
            <Typography variant="caption" color="text.secondary">Following</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{fontWeight:"bold"}}>312</Typography>
            <Typography variant="caption" color="text.secondary">Projects</Typography>
          </Box>
        </div>

        {/* Short Bio */}
        <Typography variant="body2" color="text.secondary" sx={{ px: 2, mb: 3 }}>
          {data.about}
        </Typography>

        {/* Social Icons */}
        <div className='flex mb-2 items-center justify-center'>
          <IconButton aria-label="Twitter" size="small" color="primary">
            <FaTwitter  />
          </IconButton>
          <IconButton aria-label="LinkedIn" size="small" color="primary">
            <LiaLinkedin  />
          </IconButton>
          <IconButton aria-label="GitHub" size="small" color="inherit">
            <FaGithub  />
          </IconButton>
        </div>

        {/* Action Buttons */}
        <Stack sx={{direction:"row",spacing:2, px:1}}>
          <Button variant="contained" fullWidth sx={{ borderRadius: 2, textTransform: 'none' }}>
            View
          </Button>
         
        </Stack>
      </CardContent>
    </Card>
        ))
     }
    </div>
   
    </>
  );
};

export default ProfileCard;

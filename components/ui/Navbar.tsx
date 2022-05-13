import { useContext } from 'react';
import NextLink from 'next/link';

import { UIContext } from '../../context/ui/UIContext';

import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export const Navbar = () => {

  const {openSideMenu} = useContext(UIContext)

  return (
    <AppBar position="sticky">
         <Toolbar>
             <IconButton size="large" edge="start" onClick={openSideMenu}>
                 <MenuOutlinedIcon />
             </IconButton>
             <NextLink href="/" passHref>
               <Link underline='none' color="white">
                <Typography variant="h6">OpenJira</Typography>
               </Link>
             </NextLink>
         </Toolbar>
    </AppBar>
  )
}

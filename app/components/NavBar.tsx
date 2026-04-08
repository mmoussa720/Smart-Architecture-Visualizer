import React, {useEffect} from 'react';
import {Box} from "lucide-react";
import Button from "~/components/ui/Button";
import {Links, Meta, ScrollRestoration, useOutletContext} from "react-router";

const NavBar = () => {
    const {isSignedIn,userName,signIn,signOut}=useOutletContext<AuthContext>();
    const username=userName;
    useEffect(() => {
        console.log(isSignedIn);
        console.log(userName);

    }, []);
    const handleAuthClick=async()=>{
        if(isSignedIn){
            try{
                await signOut();
            }catch(e){
                console.error(`Puter sign out failed: ${e}`);
            }
            return ;
        }
        try {
            await signIn();
        }catch (e){
            console.log(`Puter sign out failed: ${e}`);
        }
    }
  return (
    <div>
      <header className="navbar">
          <nav className="inner">
              <div className="left">
                  <div className="brand">
                      <Box className="logo"/>
                      <span className="name">
                      <span className="name"></span>
                  </span>
                  </div>
                  <ul className="links">
                      <a href="#">Product</a>
                      <a href="#">Pricing</a>
                      <a href="#">Community</a>
                      <a href="#">Enterprise</a>
                  </ul>
              </div>
              <div className="actions">
                  {isSignedIn?(<>
                  <>
                  <span className="greeting">
                      {username? `Hi, ${username}`:'Signed in'}
                  </span>
                      <Button size="sm" onClick={handleAuthClick} className="btn">Log Out</Button>
                  </>
                  </>):(
                      <>
                          <Button size="sm" onClick={handleAuthClick} className="btn">Log In</Button>
                          <a href="#upload" className="cta">Get Started</a>
                      </>
                  )}
              </div>
          </nav>
      </header>
    </div>
  );
};

export default NavBar;
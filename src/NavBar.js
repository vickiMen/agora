import React, { Component } from 'react'
import { Link } from "react-router-dom";

class NavBar extends Component {

    render() {
        return (
            <div className='navBar'>
               <Link exact to='/' className='nav' id='title'>Agora</Link>
               <Link exact to='/browse' className='nav'>Browse</Link>
               <Link exact to='/about' className='nav'>About</Link>
               <Link exact to='/help' className='nav'>Help</Link>   
               <Link exact to='/contact' className='nav'>Contact</Link>              
            </div>
        )
    }
}

export default NavBar

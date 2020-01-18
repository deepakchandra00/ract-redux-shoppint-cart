import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
 const Navbar = (props)=>{
    return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Shopping Cart</Link>
                    
                    <ul className="right">
                        <li><Link to="/cart">Go To Cart</Link> <span className="badge badge-cart">{props.items.length}</span> </li>
                    </ul>
                </div>
            </nav>
   
        
    )
}
const mapStateToProps = (state) => {
    return {
        items: state.addedItems
    }
}

export default connect(mapStateToProps)(Navbar);


import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import { bindActionCreators } from 'redux';
import { fetchPostsWithRedux } from './actions/action-types/cart-actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 class Home extends Component{
    


    handleClick = (id, name)=>{
        this.props.addToCart(id);
        const toasts = name + " added successfully"
        toast(toasts, { autoClose: 3000 })
    }


    componentDidMount(){
        const {fetchProducts} = this.props;
        fetchProducts();
    }
 
    render(){
        //console.log(this.props);
        let itemList = this.props.items.map(item=>{
                let imgSrc;
                try {
                    imgSrc = require(item.img_url);  
                } catch {
                    imgSrc = require('../images/item1.jpg');
                }
            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src={imgSrc} alt={item.name}/>
                            <span className="card-title">{item.name}</span>
                            <span className="new badge">{Math.floor(item.discount*100/item.price)}%</span>
                        </div>

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <b className="cross">${item.price}</b> <b>${item.price-item.discount}</b>
                            <span to="/"  className="waves-effect waves-light btn " onClick={()=>{this.handleClick(item.id, item.name)}}>Add to cart</span>
                            
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                <h3 className="left">All Items </h3>
                <ToastContainer className="right" position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover />
                <hr className="clear" />
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{ 
    return {
      items: state.items
    }
  }

function mapDispatchToProps(dispatch) {
    return {
      addToCart: (id)=>{dispatch(addToCart(id))},
      fetchProducts: bindActionCreators(fetchPostsWithRedux, dispatch)
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Home)
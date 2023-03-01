import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "./styles/Navbar.css"

const Navbar = () => {

  const {products} = useSelector(store => store.cart)
  const {token} = useSelector(store => store.userInfo)

  return (
    <nav className='navbar'>
      <Link className= "navbar__title" to="/"><h2>e-commerce</h2></Link>
      <div>
        <Link to="/login" ><i className='bx bx-user'></i></Link>
        <Link to="/purchases"><i className='bx bx-box'></i></Link>
        <Link to="/cart"><i className='bx bx-cart'></i><span className='product__number'> {token ? products.length : "0"} </span></Link>
      </div>
    </nav>
  )
}

export default Navbar
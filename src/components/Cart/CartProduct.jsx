import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteProductCart, updateProductCart } from '../../store/slices/cart.slice';
import './styles/CartProduct.css'

const CartProduct = ({product}) => {

  const dispatch = useDispatch()

  const handleDeleteCartProduct = () => {
    dispatch(deleteProductCart(product.id))
  }

  const handleClickPlus = () => {
    const newQuantity = product.quantity + 1
    const data = {
      quantity: newQuantity
    }
    dispatch(updateProductCart(product.id, data))
  }

  const handleClickLess = () => {
    const newQuantity = product.quantity - 1
    if(newQuantity <= 0) {
      dispatch(deleteProductCart(product.id))
    }else{
      const data = {
        quantity: newQuantity
      }
      dispatch(updateProductCart(product.id, data))
    }
  }

  return (
    <article className='cart__card'>
      <div className='cart__img'>
        <img src={product.product.images[0].url} alt="" />
      </div>
      <section>
        <h3 className='cart__title'>{product.product.title}</h3>

        <div className='flex__row2'>
          <div className='counter'>
          <button onClick={handleClickPlus}><i class='bx bx-chevron-up plus'></i></button>
          <h3>{product.quantity}</h3>
          <button onClick={handleClickLess}><i class='bx bx-chevron-down less' ></i></button>
          </div>
          <i onClick={handleDeleteCartProduct} className="bx bx-trash delete__icon"></i>
        </div>
        <div>
       
        </div>
      </section>
      <section className='total'>
        
        <h3>Total</h3>
        <h3>$ {product.quantity * product.product.price}</h3>
      </section>
    </article>
  );
}

export default CartProduct
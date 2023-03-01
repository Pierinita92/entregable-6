import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/Cart/CartProduct'
import { getAllCartProducts, purchaseCart } from '../store/slices/cart.slice'
import "./styles/Cart.css"

const Cart = () => {
  const {products} = useSelector(store => store.cart)

  const dispatch = useDispatch()

  const totalPriceCart = products.reduce(
    (total, product) => total + product.quantity * product.product.price,
    0
  );

  const handlePurchaseCart = () => {
    dispatch(purchaseCart())
  }

  useEffect(() => {
    dispatch(getAllCartProducts())
  }, [])

  return (
    <main >
      <section className='cart__main'>
        {products.map((product) => (
          <CartProduct key={product.id} product={product} />
        ))}
        <section>
          <hr />
        </section>
        </section>
        <div className='flex__row'>
          <h3>Total</h3>
          <h3>$ {totalPriceCart}</h3>
        
        <button className='btn__checkout' conClick={handlePurchaseCart}>Checkout</button>
        </div>
     

    </main>
  )
}

export default Cart
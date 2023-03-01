import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/Home/ProductCard'
import { addProductCart } from '../store/slices/cart.slice'
import { axiosEcommerce } from '../utils/configAxios'
import "./styles/Product.css"

const arrayClassesSlider = ['first', 'second', 'thirsd']
const Product = () => {
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const [similarProducts, setsimilarProducts] = useState([])
  const [indexSlider, setIndexSlider] = useState(0)

  const {id} = useParams()

  const dispatch = useDispatch()

  const handleLess = () => {
    const newQuantity = quantity -1
    if(newQuantity >= 1) {
      setQuantity(newQuantity) 
    }
  }

  const handleClickNext = () => {
    const newIndexSlider = indexSlider + 1;
    const lastPosition = arrayClassesSlider.length -1;
    if(newIndexSlider > lastPosition) {
      setIndexSlider(0)
    }else{
      setIndexSlider(newIndexSlider)
    } 

  }

  const handleClickPrevius = () => {
    const newIndexSlider = indexSlider - 1;
    const lastPosition = arrayClassesSlider.length -1;
    if(newIndexSlider < 0) {
      setIndexSlider(lastPosition)
    }else{
      setIndexSlider(newIndexSlider)
    } 
  }

  const handlePlus = () => setQuantity(quantity + 1)

  const handleClickAddProduct = () => {
    const data = {
      quantity,
      productId: product?.id
    }
    dispatch(addProductCart(data))
  }

  useEffect(() => {
    axiosEcommerce
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
  }, [id])

  useEffect(() => {
    if(product){
      axiosEcommerce
        .get(`/products?categoryId=${product?.categoryId}`)
        .then((res) => {
          const newSimilarProducts = res.data.filter(
            (productByCategory) => productByCategory !== product.id
          )
          setsimilarProducts(newSimilarProducts)
        })
        .catch((err) => console.log(err))
    }
  }, [product])

  useEffect(() => {
    setQuantity(1)
  }, [id])

  return (
    <main className='main__container'>
      <section className='product__container'>
        {/* Parte superior */}
        <section className='img'>

          <section className={`img-slider ${arrayClassesSlider[indexSlider]}`}>

            <div className='img-detail'>
              <img src={product?.images[0].url} alt="" />
            </div>
            <div className='img-detail'>
              <img src={product?.images[1].url} alt="" />
            </div>
            <div className='img-detail'>
              <img src={product?.images[2].url} alt="" />
            </div>
          </section>
          <div className='next' onClick={handleClickNext}><i class='bx bx-chevron-right'></i></div>
          <div className='previus' onClick={handleClickPrevius}><i class='bx bx-chevron-left'></i></div>
        </section>

        {/* Parte inferior */}
        <section>
          <h4 className='subtitle__big'>{product?.brand}</h4>
          <h3 className='title'>{product?.title}</h3>

          <div className='between'>
            <div>
              <h4 className='subtitle'>Price</h4>
              <h3 className='price'>$ {product?.price}</h3>
            </div>

            <div>
              <h4 className='subtitle'>Quantity</h4>
              <div className="flex__row">
                <button onClick={handleLess}>-</button>
                <h4 className='quantity'>{quantity}</h4>
                <button onClick={handlePlus}>+</button>
              </div>
            </div>
          </div>

          <button className='button__add' onClick={handleClickAddProduct}>
            Add to cart <i className="bx bx-cart"></i>
          </button>

          <p>{product?.description}</p>
        </section>
      </section>

      <h2 className='discover'>Discover similar items</h2>

      <section className='similarProducts' >
        {similarProducts.map((product) => (
          <ProductCard  key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

export default Product
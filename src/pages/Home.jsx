import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/Home/ProductCard'
import { axiosEcommerce } from '../utils/configAxios'
import "./styles/Home.css"

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [filterProducts, setFilterProducts] = useState([])
  const [categoryFilter, setCategoryFilter] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameProducts = e.target.nameProducts.value
    setNameFilter(nameProducts);
  }

  useEffect(() => {
    axiosEcommerce
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
  }, []);

  useEffect(() => {
    axiosEcommerce
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
  }, []);

  useEffect(() => {
    const newProductsByName = products.filter(product => product.title.toLowerCase().includes(nameFilter.toLowerCase()));
    if(categoryFilter){
      const newProductsByCategory = newProductsByName.filter(product => product.categoryId === categoryFilter);
      setFilterProducts(newProductsByCategory);
    }else {
      setFilterProducts(newProductsByName);
    }
  }, [nameFilter, products, categoryFilter])

  return (
    <main>
      <form className='filter__container' onSubmit={handleSubmit}>
        <div className='filter__search'>
          <input className='filter__input' placeholder='Search your products' id='nameProducts' type="text" />
          <button className='filter__btn'><i className='bx bx-search-alt'></i></button>
        </div>
        <div className='filter__category'>
          <h3 className='filter__title'>Categories</h3>
            <ul className='filter__ul'>
              <li className='filter__li' onClick={() => setCategoryFilter(0)}>All</li>
              {
                categories.map(category => <li className='filter__li' onClick={() => setCategoryFilter(category.id)} key={category.id}>{category.name}</li> )
              }
            </ul>
        </div>
      </form>
      <section className='home__container'>
        {
          filterProducts.map(product => <ProductCard  key={product.id}  product={product}/>)
        }
      </section>
    </main>
  )
}

export default Home
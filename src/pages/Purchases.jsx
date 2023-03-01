import React, { useEffect, useState } from 'react'
import PurchaseCard from '../components/Purchases/PurchaseCard'
import { axiosEcommerce, getConfig } from '../utils/configAxios'
import './styles/Purchases.css'

const Purchases = () => {
  const [purchases, setPurchases] = useState()

  useEffect(() => {
    axiosEcommerce
      .get("/purchases", getConfig())
      .then((res) => setPurchases(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <main>
      <section>
        <section className='purchases'>
          <h3 className='purchases__title'>My purchases</h3>
          <section className='purchases__container'>
            {purchases?.map((purchase) => <PurchaseCard purchase={purchase} key={purchase?.id}/> )}
          </section>
        </section>
      </section>
    </main>
  );
}

export default Purchases
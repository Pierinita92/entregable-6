import React from 'react'
import { formatDateDDMMYY } from '../../utils/date';
import './styles/PurchasesCard.css'

const PurchaseCard = ({purchase}) => {
  return (
    <article className='purchases__card'>
      <div>
        <div className='purchases__img'>
          <img src={purchase?.product.images[0].url} alt="" />
        </div>
        <h4>{purchase?.product.title}</h4>
      </div>
      <div>
        <h4>{formatDateDDMMYY(purchase?.createdAt)}</h4>
        <div>
          <h4>{purchase?.quantity}</h4>
        </div>
        <h4>{purchase?.product.price}</h4>
      </div>
    </article>
  );
}

export default PurchaseCard
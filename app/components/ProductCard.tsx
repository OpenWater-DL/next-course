import React from 'react'
import AddToCart from './AddToCart'
import styles from './ProductCard.module.css';

const ProductCard = () => {
  return (
    <>
    <div>ProductCard</div>
    <p>应当尽量都在Server渲染，对SEO有好处</p>
    <div>
    <AddToCart/>

    </div>
    </>
  )
}

export default ProductCard
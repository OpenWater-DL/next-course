import React from 'react'


interface Props{
    params:{
        slug:string[]
    };
    searchParams:{
      sortOrder: string,
      number: number
      
    }
}

const ProductPage = ( {params: {slug},searchParams:{sortOrder,number}}:Props) => {
  return (
    <>
    <div>Products {slug}</div>
    <div>Search: {sortOrder} </div>
    <div>number: {number} </div>
    </>
  )
}

export default ProductPage
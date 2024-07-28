
import React from 'react'



interface Props {
    params:{ 
        id:number;
      photoId:number;}
}

const PhotoPage = ({params:{id,photoId}}:Props) => {
  return (
    <div>Photopage user{id},photo{2}</div>
  )
}

export default PhotoPage
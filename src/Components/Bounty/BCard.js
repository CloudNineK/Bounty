import React, { useState, useEffect } from 'react';

import Normal from './CardVariants/Normal'
import Featured from './CardVariants/Featured'
import Jumbo from './CardVariants/Jumbo'
import Recommended from './CardVariants/Recommended'

let init = {
  id: '',
  subject: '',
  description: '', 
  user: '',
  created: '',
  bounty: 0,
  category: '',
  image: '',
}

function BCard(props) {

  const [details, useDetails] = useState(init)

  const update = id => {
    fetch(`/bounty?id=${id}`, {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        const out = Object.assign(details, {...data, id:id})
        useDetails(out)
      })
  }

  useEffect(() => {
    update(props.id)
  }, []);


  const variants = {
    'Jumbo': <Jumbo details={details}/>,
    'Recommended': <Recommended details={details}/>,
    'Featured': <Featured details={details}/>,
  }

  let variant = props.variant ? variants[props.variant] : <Normal details={details}/> 

  return (
    <>
      {variant}
    </>
  );
  
}

export default BCard;

import React from 'react'
import PaymentPolicyComponent from '../components/Sections/PaymentPolicy/PaymentPolicyComponent'
import Header from "../components/Header/Header";

const PaymentPolicy = () => {
  return (
    <div className='bg-white'>
        <Header enableHoverEffect={false} />
        <PaymentPolicyComponent/>
    </div>
  )
}

export default PaymentPolicy
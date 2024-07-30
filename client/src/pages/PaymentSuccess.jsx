
import React from 'react'
import { useSearchParams } from "react-router-dom"
const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        <div>
        Order Successfull
        Reference No.{referenceNum}
        </div>   
    )
}

export default PaymentSuccess
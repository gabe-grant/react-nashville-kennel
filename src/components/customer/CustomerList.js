import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { CustomerCard } from "./CustomerCard"
import "./Customer.css"

export const CustomerList = () => {
  const { customers, getCustomers } = useContext(CustomerContext)

  useEffect(() => {
    console.log("CustomerList: useEffect - getCustomers")
    getCustomers()
  }, [])

  return (
    <div className="customers">
      {console.log("CustomerList: Render", customers)}
      {
        customers.map(customer => {
          return <CustomerCard key={customer.id} customer={customer} />
        })
      }
    </div>
  )
}
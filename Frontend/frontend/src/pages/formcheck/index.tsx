import React, { useState } from 'react';

const FilterForm = ({ handleFilter }) => {
  const [customerId, setCustomerId] = useState('');
  const [status, setStatus] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      customerId,
      status,
      orderDate,
      totalAmount,
    };
    handleFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4 p-4 border border-gray-300 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="customerId" className="block text-gray-700 font-bold mb-2">
            Customer ID:
          </label>
          <select
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="block appearance-none w-full border border-gray-300 rounded py-2 px-4 mb-2 leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="">Select customer ID</option>
            <option value="customer1">Customer 1</option>
            <option value="customer2">Customer 2</option>
            <option value="customer3">Customer 3</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block appearance-none w-full border border-gray-300 rounded py-2 px-4 mb-2 leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
          </select>
        </div>

        <div>
          <label htmlFor="orderDate" className="block text-gray-700 font-bold mb-2">
            Order date:
          </label>
          <select
            id="orderDate"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="block appearance-none w-full border border-gray-300 rounded py-2 px-4 mb-2 leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="">Select order date</option>
            <option value="lastWeek">Last week</option>
            <option value="lastMonth">Last month</option>
            <option value="lastYear">Last year</option>
          </select>
        </div>

        <div>
          <label htmlFor="totalAmount" className="block text-gray-700 font-bold mb-2">
            Total amount:
          </label>
          <select
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="block appearance-none w-full border border-gray-300 rounded py-2 px-4 mb-2 leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="">Select total amount</option>
            <option value="lessThan100">Less than $100</option>
            <option value="100To500">$100 to $500</option>
        <option value="moreThan500">More than $500</option>
      </select></div>
      </div>
      </form> 
  );
};
export default FilterForm;

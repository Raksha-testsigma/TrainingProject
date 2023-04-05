
import Router from 'next/router';
import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import {useRouter} from "next/router";

export default function MyForm() {
    useEffect(() => {
        console.log('Component initialized');
        getallItems();
      }, []);
    
const [showForm, setShowForm] = useState(false);
const [showOrders, setShowOrders] = useState(true);
const [customerId, setCustomerId] = useState('');
const [orderDate, setOrderDate] = useState('');
const [status, setStatus] = useState('');
const [totalAmount, setTotalAmount] = useState('');
const [list, setList] = useState([]);
const router = useRouter();

const handleSubmit = (event) => {
event.preventDefault();

// Create a request object with the form data in the body
const request = {
method: 'POST',
headers: { 'Content-Type': 'application/json'},
body: JSON.stringify({
customerId,
orderDate,
status,
totalAmount,
}),

};


// Send the request to the Spring endpoint
fetch('http://localhost:8080/orders/', request)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
router.push("/fetch")
};


const getallItems = (e) => {
fetch('http://localhost:8080/orders/fetch')
  .then(response => response.json())
  .then(data => {
    setList(data);
    console.log(data);  
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
};



return (
<div className="flex items-center justify-center h-screen">
<div className="flex items-center justify-center h-screen">
       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-8">Create Order</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Customer ID:</span>
            <input
              className="mt-1 h-8 w-full pt-2 rounded-md pr-9 border text-sm p-2 focus:outline-none focus:border-purple-400"
              type="text"
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Order Date:</span>
            <input
              className="mt-1 h-8 w-full pt-2 rounded-md pr-9 border text-sm p-2 focus:outline-none focus:border-purple-400"
              type="datetime-local"
              value={orderDate}
              onChange={(event) => setOrderDate(event.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Status:</span>
            <input
              className="mt-1 h-8 w-full pt-2 rounded-md pr-9 border text-sm p-2 focus:outline-none focus:border-purple-400"
              type="text"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 font-bold">Total Amount:</span>
            <input
              className="mt-1 h-8 w-full pt-2 rounded-md pr-9 border text-sm p-2 focus:outline-none focus:border-purple-400"
              type="number"
              value={totalAmount}
              onChange={(event) => setTotalAmount(event.target.value)}
            />
          </label>
          <button
            className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 ts-t-primary-btn text-lg font-bold px-14 mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

</div>


);
}


import { useState, useEffect, ChangeEvent } from 'react';
import Head from "next/head";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import styles from '@/styles/Home.module.css'
import Pagination from '@mui/material/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faClose,
  faFilter,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";





export default function Fetch() {
    const [jsonData, setJsonData] = useState([]);
    const [isopen,setIsOpen]=useState(false)
    const [isdelete,setisDelete]=useState(false)
    const [queryId, setQueryId] = useState("");
    const [queryStatus, setQueryStatus] = useState("");
    const [queryAmount, setQueryAmount] = useState("");
    const [showFiltered, setShowFiltered] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isCustomerId,isSetCustomerId]=useState("")
    const [isorderDate,setOrderDate]=useState("")
    const [isstatus,setIsStatus]=useState("")
    const [istotalAmount,setTotalAmount]=useState("")
    const [page,setPage]=useState(0);


    const searchQuery = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/orders/specification?customerId=${queryId}&status=${queryStatus}&totalAmount=${queryAmount}`)
          .then((response) => response.json())
          .then((data) => setFilteredOrders(data))  
          .catch((error) => {
            console.error(error);
          });
          setShowFiltered(true);
      };

      const handleClearSearch = () => {
        setShowFiltered(false);
        setFilteredOrders([]);
        setQueryId("");
        setQueryStatus("");
        setQueryAmount("")
      };

      const handleInputChange = (event) => {
        setQueryId(event.target.value);
      };
      const handleInputAmount = (event) => {
        setQueryAmount(event.target.value);
      };



    const deleteProduct = (data:any) => {
        fetch("http://localhost:8080/orders/delete/"+data, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3001'
            },
        })
            .then(response => {
                if (response.ok) {
                    console.log('Product delete successfully!');
                    setisDelete(true)
                } else {
                    console.log('Product delete failed!');
                }
            })
            .catch(error => {
                console.error('Product delete failed:', error);
            });

        fetch('http://localhost:8080/orders/fetch')
            .then(response => response.json())
            .then(data => {
                setJsonData(data);
            })
            .catch(error => console.error(error));
    }

    useEffect(()=>{
        fetch('http://localhost:8080/orders/fetch')
            .then(response => response.json())
            .then(data => {
                setJsonData(data);
            })
            .catch(error => console.error(error))

    },[isdelete])

    function setDelete() {
        setisDelete(true);
    }
    function handleSearch() {
        setIsOpen(true);
    }



    function sortByCustomerId() {
        isSetCustomerId("customerId")
        setOrderDate("")
        setIsStatus("")
        setTotalAmount("");


    }

    function sortByOrderDate() {
        isSetCustomerId("")
        setOrderDate("orderDate")
        setIsStatus("")
        setTotalAmount("");

    }

    function sortByStatus() {
        isSetCustomerId("")
        setOrderDate("")
        setIsStatus("status")
        setTotalAmount("");
        
    }

    function sortByPricing() {
        isSetCustomerId("")
        setOrderDate("")
        setIsStatus("")
        setTotalAmount("totalAmount");
    }

    useEffect(()=>{
        let data =isCustomerId || isstatus|| isorderDate || istotalAmount;
        fetch("http://localhost:8080/orders/"+data)
            .then(response => response.json())
            .then(data => {
                setJsonData(data);
            })
            .catch(error => console.error(error));


    },[isCustomerId,isorderDate,isstatus,istotalAmount])

    const handleChange = (event:ChangeEvent<unknown>, value: number) => {
        setPage(value-1);
        fetch("http://localhost:8080/orders/page/"+page)
            .then(response => response.json())
            .then(data => {
                setJsonData(data.content);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetch("http://localhost:8080/orders/page/"+page)
            .then(response => response.json())
            .then(data => {
                setJsonData(data.content);
            })
            .catch(error => console.error(error));
    }, [page]);

    return(
        <>
            <Head>
                <title>Orders Details</title>
            </Head>
            <div className="w-full h-screen">
                <div>
                    <div className="flex flex-col h-screen">
                        <div className="flex flex-row items-center h-20 w-screen bg-green-100">
                            <div className="text-2xl px-10 font-bold  cursor-pointer">E Commerce App</div>
                            <div className="flex flex-row justify-center items-center">
                                <div className="px-5 py-2  text-xl hover:bg-gray-700 transform transition duration-200 ease-in-out hover:scale-105 hover:rounded hover:text-cyan-500 cursor-pointer">Home</div>
                                <div className="border-l border m-4 h-8"></div>
                                <Link href={"/create"}>
                                <div className="px-5 text-xl  hover:bg-gray-700 py-2 transform transition duration-200 ease-in-out hover:scale-105 hover:rounded hover:text-cyan-500 cursor-pointer">Create</div>
                                </Link>
                                <div className="border-l border m-4 h-8"></div>
                                <div className="px-5  text-xl  hover:bg-gray-700 py-2 transform transition duration-2}00 ease-in-out hover:scale-105 hover:rounded hover:text-cyan-50o0 cursor-pointer" onClick={handleSearch}>Filter</div>
                            </div>
                        </div>
                        <div className=" h-screen bg-teal-50  ">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-20">
                            {showFiltered && (
                            <div className='pb-5'><button
                                type="button"
                                onClick={handleClearSearch}
                                className="ml-auto bg-red-500 w-1/2 text-white px-4 py-2 rounded-md ml-2"
                            >
                                Clear Filter
                            </button></div>
                        )}
                              <table className="w-full text-sm text-left text-gray-500 bg-red-100 dark:text-gray-400">
                                    <thead className="text-lg   uppercase bg-gray-50">
                                    <tr className="bg-green-100">
                                        <th scope="col" className="px-6 py-3" onClick={sortByCustomerId} >
                                            Customer ID
                                        </th>
                                        <th scope="col" className="px-6 py-3" onClick={sortByOrderDate } >
                                            OrderDate
                                        </th>
                                        <th scope="col" className="px-6 py-3" onClick={sortByStatus}>
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3" onClick={sortByPricing}>
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    {showFiltered? (<tbody className="text-lg">
                                    {filteredOrders && filteredOrders?.map((item:any)=>(
                                        <tr key = {item.id} className="border-b bg-white border-gray-300 hover:bg-gray-100">
                                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
                                                {item.customerId}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.orderDate}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.status}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.totalAmount}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={{
                                                        pathname: "/create",
                                                        query: { data: JSON.stringify(item.id) },
                                                    }}
                                                >
                                                <button
                                                    className="font-medium text-purple-600 dark:text-blue-500 hover:underline">Edit</button>
                                                </Link>

                                                <button
                                                    className="pl-4 font-medium text-red-600 dark:text-red-700 hover:underline" onClick={()=>{deleteProduct(item.id)}}>Delete</button>
                                            </td>
                                           </tr>
                                    ))
                                    }
                                    </tbody>) : 
                                    (<tbody className="text-lg">
                                    {jsonData && jsonData?.map((item:any)=>(
                                        <tr key = {item.id} className="border-b bg-white border-gray-300 hover:bg-gray-100">
                                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
                                                {item.customerId}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.orderDate}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.status}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.totalAmount}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={{
                                                        pathname: "/create",
                                                        query: { data: JSON.stringify(item.id) },
                                                    }}
                                                >
                                                <button
                                                    className="font-medium text-purple-600 dark:text-blue-500 hover:underline">Edit</button>
                                                </Link>

                                                <button
                                                    className="pl-4 font-medium text-red-600 dark:text-red-700 hover:underline" onClick={()=>{deleteProduct(item.id)}}>Delete</button>
                                            </td>
                                           </tr>
                                    ))
                                    }
                                    </tbody>)}
                                </table>
                                <div className={"flex justify-end p-4 pr-2"}>
                            <Pagination count={4} defaultPage={1} page={page+1} onChange={handleChange} />
                            </div>
                            </div>
                            <Modal
  open={isdelete}
  onClose={() => {
    setIsOpen(!isdelete);
  }}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <div className="absolute inset-0 z-50 flex items-center justify-center h-screen">
    <div className="w-full max-w-md p-4 overflow-y-auto">
      <div className="bg-white shadow-lg rounded-lg px-6 py-4">
        Do you want to delete this Order
        <div
          onClick={() => {
            setisDelete(false);
          }}
          className="pt-3"
        >
          <button
            type={"submit"}
            name={"Confirm"}
            className={"ts-t-primary-btn bg-violet-400 text-lg font-bold px-9"}
            onClick={setDelete}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</Modal>
                           <Modal
                            open={isopen}
                            onClose={() => {
                            setIsOpen(!isopen);
                         }}>
                            <div className="w-1/3">
                            <div className="fixed inset-0 bg-white z-50 w-1/2 h-screen outline-none translate-x-full">
                                <div className="flex text-2xl p-5 font-bold">
                                <FontAwesomeIcon
                                    icon={faClose} 
                                    className="cursor-pointer pr-20"
                                    onClick={() => setIsOpen(false)}
                                />
                                <div className=" pb-1">Filter</div>
                                </div>
                                <div className='pl-20'>
                                <form onSubmit={searchQuery}>
        <label  className="block text-gray-700 font-bold mb-2">
          Search orders by Customer Id:
          <input type="text" className="block w-3/5 p-3 border bg-green-100 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" value={queryId} onChange={handleInputChange} placeholder="Enter Customer Id" />
        </label>
        <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
            Status:
          </label>
          <select
            id="status"
            value={queryStatus}
            onChange={(e) => setQueryStatus(e.target.value)}
            className="block appearance-none w-3/5 bg-green-100 border border-gray-300 rounded py-2 px-4 mb-2 leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="not delivered">Not Delivered</option>
          </select>
          <label  className="block text-gray-700 font-bold mb-2">
          Search orders with bill greater than:
          <input type="text" className="block w-3/5 p-3 border bg-green-100  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" value={queryAmount} onChange={handleInputAmount} placeholder="Enter Bill Value"/>
        </label>
        <button type="submit" className="rounded-md bg-gray-400 p-2 px-5 m-3">Filter</button>
      </form></div>
                                </div></div>
                        </Modal>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}



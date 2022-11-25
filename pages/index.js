import { useFormik } from 'formik'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()

  const [data, setData] = useState(null)
  const [dataProduct, setDataProduct] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isCollapse, setCollapse] = useState(false)

  useEffect(() => {
    // setLoading(true)
    let isCancelled = false;
    const endpoint = 'http://localhost:8080/user/';

    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${document.cookie}`
        'Authorization': `Bearer ${document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1]}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const getUser = async () => {
      try {
        const response = await fetch(endpoint, options)
        const result = await response.json()
        if(result.message === "forbidden"){
          router.push('/signin')
        } else {
          setData(result)
          handleProductFetch()
        }
      } catch (err) {
        console.error(err)
      }
    }


    if (!isCancelled){
      getUser()
      setLoading(false)
    }

    return () => {
      isCancelled = true;
    }

  })

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>Loading...</p>

  function InputCollapse() {
    const formik = useFormik({
      initialValues:{
        name: '',
        quantity: '',
        price: '',
        description: '',
      },
      // validate: register_validate,
      onSubmit
    })

    async function onSubmit(values){
      const endpoint = 'http://localhost:8080/product';
  
      const jData = JSON.stringify(values)
  
      // Form the request for sending data to the server.
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1]}`
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: jData // body data type must match "Content-Type"
      }
  
      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options);
  
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json();
      if(result){
        if(result.message !== 'success'){
          alert('something wrong')
        } else {
          alert(`input product ${result.message}`)
          handleProductFetch()
        }
      }
      // alert(`user with following id: ${result.insertedId} has inserted!`)
    }

    return <>
    {/* Input Product */}

    <button className="btn btn-primary" onClick={() => setCollapse(!isCollapse)} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Input
    </button>
    <br/>
    <div className={isCollapse ? "" : "collapse"} id="collapseExample">
      <div className="card card-body" style={{'marginTop': '20px', 'marginBottom': '30px'}}>
      <form onSubmit={formik.handleSubmit}>
        <div className='row'>
          <div className='col'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
              <input 
              type="text" 
              className="form-control" 
              id="exampleInputEmail1"
              name='name'
              {...formik.getFieldProps('name')}
              />
            </div>
          </div>
          <div className='col'>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Quantity</label>
              <input 
              type="text" 
              className="form-control" 
              id="exampleInputPassword1"
              name='quantity'
              {...formik.getFieldProps('quantity')}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
              <input 
              type="text" 
              className="form-control" 
              id="exampleInputEmail1" 
              name='price'
              {...formik.getFieldProps('price')}
              />
            </div>
          </div>
          <div className='col'>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
              <input 
              type="text" 
              className="form-control" 
              id="exampleInputPassword1"
              name='description'
              {...formik.getFieldProps('description')}
              />
            </div>
          </div>
        </div>
        <div className='text-end' style={{'alignItems': 'end'}}>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      </div>
    </div>
    </>
  }

  function ProductTable() {
    if (!dataProduct) {
      return <p>Loading</p>
    } else {
      return <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>{ dataProduct.map((f) => {
          return<tr key={f._id}>
            <td>{f.name}</td>
            <td>{f.price}</td>
            <td>{f.quantity}</td>
            <td>{f.description}</td>
          </tr>
          })
        }
        </tbody>
      </table>
    }
  } 

  async function handleProductFetch() {
    const endpoint = 'http://localhost:8080/product/';

    // Form the request for sending data to the server.
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1]}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    fetch(endpoint, options)
    .then((response) => response.json())
    .then((result) => {
      setDataProduct(result)
    }).catch(err => {
      return <p>Something wrong {err}</p>
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/undraw_certificate_re_yadi.svg" />
      </Head>

      <div className="row">
        <div className="col-sm-8 text-start">
          <div className='card' style={{'marginTop': '30px', 'paddingTop': '20px'}}>
            <div className='container'>
              <InputCollapse/>
              <hr/>
              <ProductTable/>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className='card' style={{'marginTop': '30px', 'paddingTop': '20px'}}>
            <div className='container'>
              <h3>{data.name}</h3>
            </div>
          </div>
        </div>
      </div>
            
      <footer style={{'marginTop': '30px'}} className={styles.footer}>
        <a>
          Powered by
        </a>
      </footer>
    </div>
  )
}

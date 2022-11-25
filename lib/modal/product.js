import { useFormik } from "formik"
import { useState } from "react"

export default function ProductModal(props) {
    const [isModal, setModal] = useState(false)
    const formik = useFormik({
        initialValues:{
            _id:props.dataProduct._id,
            name: props.dataProduct.name,
            quantity: props.dataProduct.quantity,
            price: props.dataProduct.price,
            description: props.dataProduct.description,
        },
        // validate: register_validate,
        onSubmit
    })

    async function onSubmit(values){
        const endpoint = 'http://localhost:8080/product';
    
        const jData = JSON.stringify(values)
    
        const options = {
          method: 'PATCH', 
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1]}`
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer', 
          body: jData 
        }
    
        const response = await fetch(endpoint, options);
        const result = await response.json();

        if(result){
          if(result.message !== 'success'){
            alert('something wrong')
          } else {
            alert(`edit product ${result.message}`)
            setModal(!isModal)
            props.fetchProduct()
          }
        }
        // console.log(values)
    }

    async function handleDelete(_id){
        const endpoint = 'http://localhost:8080/product';

        const data = {
            _id : _id
        }
    
        const jData = JSON.stringify(data)
    
        const options = {
          method: 'DELETE', 
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1]}`
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer', 
          body: jData 
        }
    
        if(confirm(`are you sure want to delete ${props.dataProduct.name}`)){
            const response = await fetch(endpoint, options);
            const result = await response.json();

            if(result){
                if(result.message !== 'success'){
                    alert('something wrong!')
                } else {
                    alert(`product ${result.message} deleted!`)
                    setModal(!isModal)
                    props.fetchProduct()
                }
            }
        } else {
            alert("delete canceled!")
        }
    }

    return(
        <>
            <button 
            className='btn btn-success' 
            onClick={() => {
                setModal(!isModal)
            }}>
            Edit
            </button>
            <div className={`modal fade ${isModal ? "show" : ""}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{'display': `${isModal ? 'block' : 'none'}`}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit {props.dataProduct.name}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModal(!isModal)}></button>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="modal-body">
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
                            <div className="modal-footer">
                                <button type="button" className='btn btn-secondary' onClick={() => setModal(!isModal)}>Cancel</button>
                                <button type="submit" className="btn btn-success">Edit</button>
                                <button type="button" className='btn btn-danger' onClick={() => handleDelete(props.dataProduct._id)}>Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
import { useFormik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
import { register_validate } from "../../lib/validate"


export default function Register(){

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues:{
            name: '',
            email: '',
            gender: '',
            password: '',
            cpassword: ''
        },
        validate: register_validate,
        onSubmit
    })

    async function onSubmit(values){
        setLoading(true);
        const endpoint = 'http://localhost:8080/user/register';

        const jData = JSON.stringify(values)

        // Form the request for sending data to the server.
        const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: jData // body data type must match "Content-Type"
        }

        // Send the form data to our forms API on Vercel and get a response.
        // const response = await fetch(endpoint, options);

        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        if(result){
            setLoading(false)
            if(result.message !== 'save user success'){
                alert('email has been used!')
            } else {
                router.push('/signin')
            }
        }
        // alert(`user with following id: ${result.insertedId} has inserted!`)
    }
    return(
        <>
            <div className="container text-center">
                <div className="row">
                    <img src="/undraw_graduation_red.svg" style={{'width': '200px'}}/>
                </div>
                <div className="row">
                    <div className="col-sm-7" style={{'backgroundColor': 'white', 'padding': '1rem', 'border': '2px solid #fff'}}>
                        <div className="row">
                            <img className="my-5" src="/undraw_informed_decision.svg" width="90%"/>
                        </div>
                    </div>
                    <div className="col-sm-5 my-5" style={{'backgroundColor': 'white', 'padding': '1rem', 'border': '2px solid #fff'}}>
                        <div className="row">
                            <h4>Sign Up</h4>
                        </div>
                        <hr className="my-4"/>
                        {isLoading ? <div style={{'paddingTop': '40px', 'paddingBottom': '60px'}}>
                        <div class="spinner-grow" style={{'marginRight': '10px'}} role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow" style={{'marginRight': '10px'}} role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow" style={{'marginRight': '10px'}} role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow" style={{'marginRight': '10px'}} role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        </div>
                        :
                        <div className="row text-start">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <input 
                                    placeholder="Full Name"
                                    type="text" 
                                    name="name"
                                    className="form-control" 
                                    id="exampleInputName1"
                                    {...formik.getFieldProps('name')}
                                    />
                                    {formik.errors.name && formik.touched.name ? <span>{formik.errors.name}</span>:<></>}
                                </div>
                                <div className="mb-3">
                                    <input 
                                    placeholder="Email address"
                                    type="email" 
                                    name="email"
                                    className="form-control" 
                                    id="exampleInputEmail1"
                                    {...formik.getFieldProps('email')}
                                    />
                                    {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span>:<></>}
                                    <div id="emailHelp" className="form-text">We&lsquo;ll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <select 
                                    name="gender" 
                                    className="form-select"
                                    aria-label="Default select example"
                                    {...formik.getFieldProps('gender')}
                                    >
                                        <option value="" disabled selected>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {formik.errors.gender && formik.touched.gender ? <span>{formik.errors.gender}</span>:<></>}
                                </div>
                                <div className="mb-3">
                                    <input 
                                    placeholder="Password"
                                    type="password" 
                                    name="password"
                                    className="form-control" 
                                    id="exampleInputPassword1"
                                    {...formik.getFieldProps('password')}
                                    />
                                    {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span>:<></>}
                                    <div id="emailHelp" className="form-text">Password Must be grater than 8 and doesn't contain empty space</div>
                                </div>
                                <div className="mb-3">
                                    <input 
                                    placeholder="Confirm Password"
                                    type="password" 
                                    name="cpassword"
                                    className="form-control" 
                                    id="exampleInputCPassword1"
                                    {...formik.getFieldProps('cpassword')}
                                    />
                                    {formik.errors.cpassword && formik.touched.cpassword ? <span>{formik.errors.cpassword}</span>:<></>}
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                        }
                        <div className="row mb-4 my-3 text-start">
                            <small className="font-weight-bold">Already have an account? <Link href={'/signin'} className="text-danger ">SignIn</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
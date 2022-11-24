import { useFormik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import login_validate from "../../lib/validate"


export default function SignIn(){
    const router = useRouter()
    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validate: login_validate,
        onSubmit
    })

    async function onSubmit(values){

        const endpoint = 'http://localhost:8080/user/signin';

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
            if(result.message !== 'success'){
                alert('something wrong!')
            } else {
                document.cookie = `token=${result.accessToken}; expires=10m`;
                router.push('/')
            }
        }
        
        // console.log(document.cookie)
        // console.log(result);
        // alert(`Is this your email: ${result.data}`)
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
                            <h4>Sign In</h4>
                        </div>
                        <hr className="my-4"/>
                        <div className="row text-start">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input 
                                    type="email" 
                                    name="email"
                                    className="form-control" 
                                    id="exampleInputEmail1"
                                    {...formik.getFieldProps('email')}
                                    />
                                    {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span>:<></>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input 
                                    type="password" 
                                    name="password"
                                    className="form-control" 
                                    id="exampleInputPassword1"
                                    {...formik.getFieldProps('password')}
                                    />
                                    {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span>:<></>}
                                </div>
                                <button type="submit" className="btn btn-primary">LogIn</button>
                            </form>
                        </div>
                        <div className="row mb-4 my-3 text-start">
                            <small className="font-weight-bold">Don&lsquo;t have an account? <Link href={'/register'} className="text-danger ">Register</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import React, {useState, useEffect} from "react";
import right_panel_image from "../../assets/images/userpanel.png";
import "./LoginPage.scss";

export default function LoginPage(){
    const document_title = "Log In";
    const [formData, setFormData] = useState({email:"", password:""});
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const user = {
        email:"testemail@gmail.com",
        password:"password"
    }
    const isErrorInput={
        email: errors.email ? "error_input" : "",
        password: errors.password ? "error_input" : ""
    }
    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        setFormData((formData)=>({
            ...formData,
            [name]:value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!formData.email){
            newErrors.email = "Email is required.";
        }
        else if(!isEmailValid.test(formData.email)){
            newErrors.email = "Please enter a valid Email.";
        }
        else if (formData.email !==user.email){
            newErrors.email = "The email you entered isn't connected to an account.";
        }

        if(!formData.password){
            newErrors.password = "Password is required.";
        }
        else if(formData.password !== user.password){
            newErrors.password = "Incorrect Password.";
        }
        setErrors(newErrors);
        return newErrors;
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        setIsSubmit(true);
        validateForm();
    }

    useEffect(()=>{
        if(Object.keys(errors).length === 0 && isSubmit){
            window.location.href = "/dashboard";
        }
    });
    useEffect(()=>{document.title = document_title},[]);
    return(
        <main>
            <div className="container">
                <div className="login">
                    <form action="POST" onSubmit={handleSubmit}>
                        <h1>The Wall</h1>
                        <h2>Log In</h2>
                        <label>Email</label>
                        <input tabIndex="1" type="text" name="email" className={isErrorInput.email} value={formData.email} onChange={handleInputChange}/>
                        <p className="error_text">{errors.email}</p>
                        <label>Password
                            <a href="/">Forgot Password ?</a>
                        </label>
                        <input tabIndex="2" type="password" name="password" className={isErrorInput.password} value={formData.password} onChange={handleInputChange}/>
                        <p className="error_text">{errors.password}</p>
                        <button tabIndex="3" type="submit">SIGN IN</button>
                        <p className="is_registered">I don't have an account ? <a tabIndex="4" href="/sign-up">Sign Up</a></p>
                    </form>
                </div>
            </div>
            <div id="design-panel">
                <img src={right_panel_image} alt="A guy holding a paper" />
            </div>
        </main>
    );
}
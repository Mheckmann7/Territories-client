import { useState } from 'react';
import { login } from '../../services/userService';

function Login(props) {
    const [formState, setFormState] = useState(getInitialFormState());
        
        
        
    function getInitialFormState() {
        return {
            email: "",
            password: "",
        }
    }

    function handleChange(event) {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        })); 
    }
    async function handleSubmit(event) {
        try {
            event.preventDefault(); 
            await login(formState) 
            setFormState(getInitialFormState());
            props.handleSignupOrLogin(); 
            props.history.push('/dashboard');

        } catch(error) {
            alert(error.message);
        }
        
    }

    return (
        <div className="Page">
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    value={formState.email}
                    onChange={handleChange}
                    name="email"
                    type="email" />
                <label>Password</label>
                <input
                    value={formState.password}
                    onChange={handleChange}
                    name="password"
                    type="password" />
                <button>Login</button>
            </form> 
        </div>
    );
}

export default Login; 
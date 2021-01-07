import { useState } from 'react';

function Signup(props) {
    const [formState, setFormState] = useState(getInitialFormState());
        
        
        
    function getInitialFormState() {
        return {
            firstName: "",
            lastName: "",
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
    function handleSubmit(event) {
        event.preventDefault(); 
        console.log('submitted form data', formState)
        setFormState(getInitialFormState());
        
        props.history.push('/dashboard');
    }

    return (
        <div className="Page">
            <form onSubmit={handleSubmit}>
                <input
                    value={formState.firstName}
                    onChange={handleChange}
                    name="firstName"
                    type="text" /> 
                <input
                    value={formState.lastName}
                    onChange={handleChange}
                    name="lastName"
                    type="text" />
                <input
                    value={formState.email}
                    onChange={handleChange}
                    name="email"
                    type="email" />
                <input
                    value={formState.password}
                    onChange={handleChange}
                    name="password"
                    type="password" />
                <button>Signup</button>
            </form> 
        </div>
    );
}

export default Signup; 
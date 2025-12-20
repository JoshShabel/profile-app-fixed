import {useState} from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useForm from "./useForm.jsx";

function ProfileForm({handleFormState}) {
    const [state, setState] = useState({
        name: "",
        title: "",
        email: "",
        bio: "",
        image: null
    })
    const [errors, setErrors] = useState(
        {
            image: "",
            general: ""
        }
    )
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = useForm(state).then(formData => {
            handleFormState();
            fetch('https://web.ics.purdue.edu/~jshabel/create-table.php', {
                    method: 'POST',
                    redirect: 'follow',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: new URLSearchParams(formData)
                }
            )
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log('Error:', error));
            //setSubmitted(true);})
        })
    }
    function handleChange(e) {
        if (e.target.name === "image") {
            setErrors({...errors, image: ""});
            const file = e.target.files[0];
            if (file.size > 2000000){ // Validate image size
                setErrors({...errors, image: "Image must be less than 2MB."});
            }
            if (!file.name.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) { // Validate image type
                setErrors({...errors, image: "Image needs to be png, jpg/jpeg, gif, webp, or avif"});
            }
            setState({...state, image: e.target.files[0]});
        }
        else {
            setState({...state, [e.target.name]: e.target.value});
        }
    }
    if (submitted) {
        return (
            <Navigate to="/profile-app-fixed/Home">
            </Navigate>
            )
    }
    else {
        return (

            <div>
                <form onSubmit={handleSubmit} encType="multipart/form-data" >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={state.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={state.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="bio"
                        placeholder="Enter description"
                        maxLength={200}
                        value={state.bio}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <label htmlFor="image">Choose a profile picture:</label>
                        <input type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/avif" onChange={handleChange} required/>
                    {errors.image && <p>{errors.image}</p>}
                    <button type="submit">Send</button>
                </form>
            </div>

        )
    }
}

ProfileForm.propTypes = {
    handleFormState: PropTypes.func
}

export default ProfileForm;
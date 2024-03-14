import React, { useState } from 'react';

const RequestForm: React.FC = () => {

    const [formData, setFormData] = useState({
        publicKey: '', 
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate form data, prevent empty submission
        if (formData.publicKey.trim() === '' || formData.message.trim() === '') {
            window.alert('Please fill in all the fields');
            return; // Prevent form submission
        }
        // Handle form submission here using the formData state
        console.log(formData);
        // Show a success message to the user
        window.alert('Form submitted successfully!');
        // Reset the form data state to empty values
        setFormData({
            publicKey: '',
            message: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Public Key:
                <input type="text" name="publicKey" value={formData.publicKey} onChange={handleChange} />
            </label>
            <br />
            <label>
                Message:
                <textarea name="message" value={formData.message} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default RequestForm;
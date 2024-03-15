import React, { useState } from 'react';
import "../styles/RequestForm.css";

const RequestForm: React.FC = () => {

    const [formData, setFormData] = useState({
        publicKey: '',
        amount: '',
        highestRate: '',
        duration: '',
        additionalInfo: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.publicKey.trim() === '' || formData.amount.trim() === '' || formData.highestRate.trim() === '' || formData.duration.trim() === '' || formData.additionalInfo.trim() === '') {
            window.alert('Please fill in all the fields');
            return;
        }
        console.log(formData);
        window.alert('Form submitted successfully!');
        setFormData({
            publicKey: '',
            amount: '',
            highestRate: '',
            duration: '',
            additionalInfo: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="formContainer">
            <div className="formContainer">
                <label className="formLabel">
                    <span>Public Key:</span>
                    <input type="text" name="publicKey" value={formData.publicKey} onChange={handleChange} className="formInput" />
                </label>
                <label className="formLabel">
                    <span>Amount:</span>
                    <input type="text" name="amount" value={formData.amount} onChange={handleChange} className="formInput" />
                </label>
                <label className="formLabel">
                    <span>Highest Rate:</span>
                    <input type="text" name="highestRate" value={formData.highestRate} onChange={handleChange} className="formInput" />
                </label>
                <label className="formLabel">
                    <span>Duration:</span>
                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="formInput" />
                </label>
                <label className="formLabel">
                    <span>Additional Info:</span>
                    <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default RequestForm;
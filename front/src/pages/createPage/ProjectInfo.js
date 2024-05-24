import React, { useState } from 'react';
import postApi from '../../apis/post';
import Input from '../../components/input/Input';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const ProjectInfoModal = ({ onClose }) => {
    const navigate = useNavigate();
    const userToken = localStorage.getItem('userToken');
    const [formData, setFormData] = useState({
        websiteName: '',
        about: '',
        url: '',
        imageURL: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data = JSON.stringify(formData);
            const response = await postApi('/website', data, userToken);
            console.log(response);
            if (response.success) {
                message.success("Website Created Successfully!");
                navigate(`/createpage/${response.website._id}`);
                onClose();
            } else {
                alert("Some Error Occurred!");
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Start Creating Website</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <label>Website Name*</label>
                                <Input value={formData.websiteName} onChange={handleChange} name="websiteName" type='text' placeholder='Eg: YelloMonkey' />

                                <label>Website Description* <span id="smalltext">(Explain about your project)</span>:</label><br />
                                <textarea rows={6} value={formData.about} onChange={handleChange} name="about" type='text' placeholder='Enter About the Website' />
                                <br />
                                <label>Website URL <span id="smalltext">(Where you want to host web?)</span>:</label>
                                <Input value={formData.url} onChange={handleChange} name="url" type='text' placeholder='Enter Website URL' />

                                <label>Website Logo <span id="smalltext">(If there is no logo leave blank)</span>:</label>
                                <Input value={formData.imageURL} onChange={handleChange} name="imageURL" type='text' placeholder='Enter Image URL' />
                                <br/>
                                <Button type='submit' text={'Save & Continue'} />
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>

    );
};

export default ProjectInfoModal;

import React, { useState } from 'react';
import postApi from '../../apis/post';
import Input from '../../components/input/Input';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom'
import patchApi from '../../apis/update';



const Onboard = () => {

    const navigate = useNavigate();
    const userToken=localStorage.getItem('userToken');
    const [formData, setFormData] = useState({
        clientName: '',
        businessName: '',
        website: '',
        businessEmail: '',
        businessNo: '',
        businessAddress: '',
        businessLogo: '',
        brandColors: '',
        competitorSites: '',
        inspirationSites: '',
        firstLogin:'false'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let data = JSON.stringify(formData);
            const response = await patchApi("/user", data,userToken);
            console.log(response);
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }
    return (
        <div className='onb-wrapper'>
            <h1>Onboarding</h1>
            <form onSubmit={handleSubmit} >
                <div className=''>
                    <div>
                        <label>Client Name:</label>
                        <Input value={formData.clientName} onChange={handleChange} name="clientName" type='clientName' placeholder='Enter Client Name' />

                        <label>Business Name:</label>
                        <Input value={formData.businessName} onChange={handleChange} name="businessName" type='text' placeholder='Enter Business Name' />

                        <label>Website:</label>
                        <Input value={formData.website} onChange={handleChange} name="website" type='text' placeholder='Enter Website URL' />

                        <label>Business Email:</label>
                        <Input value={formData.businessEmail} onChange={handleChange} name="businessEmail" type='email' placeholder='Enter Business Email' />

                        <label>Business Phone:</label>
                        <Input value={formData.businessNo} onChange={handleChange} name="businessNo" type='tel' placeholder='Enter Business Phone Number' />
                    </div>
                    <div>
                        <label>Business Address:</label>
                        <Input value={formData.businessAddress} onChange={handleChange} name="businessAddress" type='text' placeholder='Enter Business Address' />
                        
                        <label>Business Logo:</label>
                        <Input value={formData.businessLogo} onChange={handleChange} name="businessLogo" type='url' placeholder='Enter Business Logo URL' />
                        
                        <label>Brand Colors:</label>
                        <Input value={formData.brandColors} onChange={handleChange} name="brandColors" type='text' placeholder='Enter Brand Colors' />
                        
                        <label>Competitor Sites:</label>
                        <Input value={formData.competitorSites} onChange={handleChange} name="competitorSites" type='text' placeholder='Enter Competitor Sites' />
                        
                        <label>Inspiration Sites:</label>
                        <Input value={formData.inspirationSites} onChange={handleChange} name="inspirationSites" type='text' placeholder='Enter Inspiration Sites' />
                    </div>
                </div>
                <Button type='submit' text={'Start Developing'} />

            </form>
        </div>
    )
}

export default Onboard

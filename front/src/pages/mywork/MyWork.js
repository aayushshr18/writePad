import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import getApi from '../../apis/read';
import ProjectInfoModal from '../createPage/ProjectInfo';

const MyWork = () => {
    const navigate = useNavigate();
    const userToken = localStorage.getItem('userToken');
    const [webs, setWebs] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const getProjects = async () => {
        try {
            const response = await getApi('/website', userToken);
            setWebs(response);
            console.log(response)
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className='container dashboard'>
            <h1 className='m-3'>My Dashboard</h1>
            <div className='work-wrapper dash'>
                {webs.length === 0 ? (
                    <p>No websites found. Start creating your website!</p>
                ) : (
                    webs.map((w) => (
                        <Card
                            key={w._id} // Added key prop for each card
                            id={`/viewpage/${w._id}`}
                            title={w.websiteName}
                            url={w.url}
                            about={w.about}
                            imageURL={w.imageURL}
                            userName={w.userName}
                        />
                    ))
                )}
            </div>
            <span className='add-icon'>
                <IoMdAddCircle onClick={handleModalToggle} color='black' size={50} />
                {showModal && <ProjectInfoModal onClose={handleModalToggle} />}
            </span>
        </div>
    );
};

export default MyWork;

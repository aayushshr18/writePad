import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import getApi from '../../apis/read';
import ProjectInfoModal from '../createPage/ProjectInfo';
import { useParams } from 'react-router-dom';
const MyWork = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const userToken = localStorage.getItem('userToken');
    const [webs, setWebs] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        navigate(`/createpage/${id}`)
    };

    const getProjects = async () => {

        try {

            const response = await getApi(`/website/page/${id}`, userToken);
            setWebs(response.pages)

        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    useEffect(() => {
        getProjects();
    }, [])



    return (
        <div className='container dashboard'>
            <h1 className='m-3'>My Pages</h1>
            <div className='work-wrapper'>
                {
                    webs.map((w) => (
                        <Card id={`/website/page/${w._id}`} title={w.pageName} url={w.url}  about={w.about} imageURL={w.imageURL} />
                    ))
                }
            </div>
            <span className='add-icon'>
                <IoMdAddCircle onClick={handleModalToggle} color='black' size={50} />
                {showModal && <ProjectInfoModal onClose={handleModalToggle} />}
            </span>
           
        </div>
    )
}

export default MyWork

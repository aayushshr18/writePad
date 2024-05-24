import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import getApi from '../../apis/read';
import ProjectInfoModal from '../createPage/ProjectInfo';
import { useParams } from 'react-router-dom';

const WebsiteDesign = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const userToken = localStorage.getItem('userToken');
    const [page, setPage] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const getProjects = async () => {
        try {
            const response = await getApi(`/website/singlepage/${id}`, userToken);
            setPage(response.pages); 
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    const renderComponents = (components) => {
        return components.map((component, idx) => {
            if (component.type === 'image') {
                return <img key={idx} src={component.content} />;
            } else if (component.type === 'video') {
                return <video key={idx} src={component.content} controls />;
            }
            else if(component.type === 'h1'){
                return <h1 key={idx}>{component.content}</h1>;
            }
            else if(component.type === 'h2'){
                return <h2 key={idx}>{component.content}</h2>;
            }
            else if(component.type === 'h3'){
                return <h3 key={idx}>{component.content}</h3>;
            }
            else if(component.type === 'h4'){
                return <h4 key={idx}>{component.content}</h4>;
            }
            else if(component.type === 'h5'){
                return <h5 key={idx}>{component.content}</h5>;
            }
            else if(component.type === 'h6'){
                return <h6 key={idx}>{component.content}</h6>;
            }
            else if(component.type === 'paragraph'){
                return <p key={idx}>{component.content}</p>;
            }
            return null;
        });
    };

    return (
        <div className='container dashboard'>
            <h1 className='m-3'></h1>
            <div>
                {page && (
                    <div>
                        <h1>{page.pageName}</h1>
                        <div className="webpage">
                            {page.groups.map((group, groupIdx) => (
                                <div key={groupIdx} className="web-layout">
                                    {group.map((component, idx) => (
                                        <div key={idx} style={{ width: `${component.width}%` }} className='render'>
                                            {renderComponents([component])}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WebsiteDesign;

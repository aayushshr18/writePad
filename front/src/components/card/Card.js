import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { useNavigate } from "react-router-dom";
import deleteApi from '../../apis/delete';
import { MdDelete } from "react-icons/md";
import { MdOutlineOpenInNew } from "react-icons/md";
import { message } from 'antd';
const Cardbox = ({ title, about, url, imgURL, id, userName }) => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');

  const handleDel = async () => {
    const actualId = id.substring(id.lastIndexOf('/') + 1); // Extracting the actual id
    console.log(actualId);
    try {
      const response = await deleteApi(`/website/${actualId}`, userToken);

      message.success("Website Deleted Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error('Error occurred while deleting website:', error);
      message.error("Something Went Wrong!");
    }
  }


  const handleTab = () => {
    window.open(url, '_blank');
  }



  return (
    <Card className='m-3' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Card.Text>
          {about && { about }} <br />
          {userName && `Created By- ${userName}`}</Card.Text>
        <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button variant="dark" onClick={() => navigate(`${id}`)}>View Pages</Button>
          {url &&
            <MdOutlineOpenInNew size={30} onClick={handleTab} style={{ cursor: 'pointer' }} />
          }
          <MdDelete size={30} onClick={handleDel} id='delete' />
        </div>
      </Card.Body>
    </Card>
  );
}

export default Cardbox

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import postApi from '../../apis/post';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import ComponentSelectionModal from './ComponentSelectionModal';
function PageForm({ onSubmit }) {
  const { websiteId } = useParams();
  const navigate = useNavigate();
  const [userToken] = useState(localStorage.getItem('userToken'));
  const [formData, setFormData] = useState({
    websiteId: websiteId,
    pageName: "",
    pageLayout: "100",
    pageLayoutNumber: 1,
    components: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleComponentChange = (index, e) => {
    const { name, value } = e.target;
    const components = [...formData.components];
    components[index][name] = value;
    setFormData(prevState => ({
      ...prevState,
      components
    }));
  };

  const addComponent = () => {
    const layout = formData.pageLayout.split('/');
    const [firstLayout, secondLayout] = layout.map(Number);

    let newComponents = [];

    if (firstLayout === 100) {
      newComponents = [{ type: "", content: "", width: 100 }];
    } else {
      newComponents = [
        { type: "", content: "", width: firstLayout },
        { type: "", content: "", width: secondLayout }
      ];
    }

    setFormData(prevState => ({
      ...prevState,
      components: [...prevState.components, ...newComponents]
    }));
  };

  const removeComponent = (index) => {
    const components = [...formData.components];
    components.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      components
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postApi("/website/page", formData, userToken);
     
        message.success("Page Added Successfully!");
        onSubmit(); 
    
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="pageName" id="pageName" placeholder='Untitled' value={formData.pageName} onChange={handleChange} />
        </label>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '0px' }}>
        {formData.components.map((component, index) => (
  <div key={index} style={{ display: 'flex', flexDirection: 'column-reverse', marginBottom: '10px', width: `${component.width}%` }}>
    {component.width === 30 && <div style={{ width: '100%' }}></div>}
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <select name="type" id="componentBor" value={component.type} onChange={(e) => handleComponentChange(index, e)} style={{ width: `10%` }}>

        <option value="h2">Heading</option>
        <option value="paragraph">Paragraph</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      {component.type !== "image" && component.type !== "video" &&
        <textarea id="writeCom" placeholder='Start writing..' className={component.type} style={{ width: '90%', maxWidth: 'none' }} type="text" name="content" value={component.content} onChange={(e) => handleComponentChange(index, e)} />
      }
      {(component.type === "image" || component.type === "video") &&
        <input type={component.type === "image" ? 'file' : 'text'} accept={component.type === "image" ? 'image/*' : 'video/*'} />
      }
    </div>
  </div>
))}

        </div>

        <label>
          <select id="pageLayout" name="pageLayout" value={formData.pageLayout} onChange={handleChange} hidden>
            <option value="100">100</option>
          </select>
        </label>
        <button type="button" style={{ width: `20%` }} onClick={addComponent} id='ltbtn'>Add Component</button>
        <button type="submit" style={{ width: `20%` }}>Publish Page</button>
      </form>
    </div>
  );
}

function MultiplePageForm() {
  const [pages, setPages] = useState([]);

  const handleAddPage = () => {
    setPages([...pages, <PageForm onSubmit={fetchPages} />]);
  };

  const fetchPages = () => {
   
  };

  return (
    <div>
      {pages.map((page, index) => (
        <div key={index}>
          {page}
        </div>
      ))}
      <button onClick={handleAddPage} style={{ width: `20%` }}>+ Add New Page</button>
    </div>
  );
}

export default MultiplePageForm;

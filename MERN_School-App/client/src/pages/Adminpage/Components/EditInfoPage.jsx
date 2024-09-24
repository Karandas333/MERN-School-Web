import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Form } from "react-router-dom";
import { apiClient } from "../../../lib/api-client";
import { CREATE_INFO } from "../../../utiles/contants";
import { FcAddImage } from "react-icons/fc";

const EditInfoPage = () => {
  const [image, setImage] = useState('');
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setImage(file); // Set the image in state

    // Generate a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Set the preview URL in state
    };
    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handlePostingInfoData = async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
      // Create a FormData object for file and text data
      const formData = new FormData();
      formData.append("uploadImage", event.target.uploadImage.files[0]); // Add the file
      formData.append("heading", heading); // Add heading
      formData.append("content", content); // Add content

      // Post the form data
      let response = await apiClient.post(CREATE_INFO, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.status = 200) {
        setContent('')
        setHeading('')
        setImage('')
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[80%] h-[20%] md:h-[80%] md:p-4 flex items-center content-center">
        <Form onSubmit={handlePostingInfoData} className="w-full h-full md:h-[350px] gap-8 p-3 flex" encType="multipart/form-data">
          <label htmlFor="uploadImage" className={`md:w-[120px] w-20 h-20 md:h-[120px] bg-[url(${image && image})] bg-center bg-cover`}>
            <FcAddImage className={`w-full h-full ${image && 'hidden'}`} />
            <input onChange={handleImageChange} type="file" id="uploadImage" name="uploadImage" className="hidden" />
          </label>
          <div className="flex w-full md:w-2/3 h-full content-start gap-2 p-3 flex-col flex-wrap">
            <label htmlFor="heading" className='w-[70%]'>
              <h3 className="text-2xl">Heading</h3>
              <Input value={heading} onChange={(e) => setHeading(e.target.value)} id='heading' placeholder='Write heading name' name="heading" />
            </label>
            <label htmlFor="content" className='w-[70%]'>
              <h3 className="text-2xl">Content</h3>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} className='w-full h-[100px] p-3 resize-none border-2 rounded-md' placeholder='Write Information' />
            </label>
            <button type="submit" className="max-w-20 py-2 px-4 rounded-md h-12 text-white bg-blue-500">Add</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditInfoPage;

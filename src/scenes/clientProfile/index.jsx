import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import data from '../../data/userdata.json';
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { tokens } from "../../theme";


const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setFormData(data);
    setSelectedImage(data.profileImage || '');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setShowDialog(!isEditing);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setShowDialog(false);
    console.log('Updated Form Data: ', formData);
  };

  // Function to add a new user
  const addNewUser = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      address: '',
      contact: '',
      dob: '',
      profileImage: '',
    });
    setSelectedImage('');
    setShowDialog(true);
  };

  // Function to delete the current user
  const deleteUser = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      address: '',
      contact: '',
      dob: '',
      profileImage: '',
    });
    setSelectedImage('');
    alert('Do you want to remove this user? Are you sure!');
  };

  // Function to suspend the current user
  const suspendUser = () => {
    setIsSuspended(!isSuspended);
  };

  // Function to close the dialog box
  const closeDialog = () => {
    setShowDialog(false);
    setIsEditing(false);
  };

  // Close dialog if clicking outside of it
  const handleOutsideClick = (e) => {
    if (e.target.className === 'dialog-overlay') {
      closeDialog();
    }
  };

  // Drag functions
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - dialogPosition.x, y: e.clientY - dialogPosition.y });
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setDialogPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);  return (
    <Box m="20px">
      
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap="10px"  alignItems="center">
        <Header title="CLIENT PROFILE" subtitle="List of clients" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={addNewUser}
          >
            <PersonAddIcon sx={{ mr: "10px" }} />
            Add New Client
          </Button>
        </Box>
          
      </Box>
    <Box>
    <div className='profile' style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5em',
    }}>
      <div className='profile-card' style={{
        border: '1px solid rgb(125, 125, 125, 0.15)',
        boxShadow: '2px 2px 50px 5px rgb(125, 125, 125, 0.25)',
        paddingBottom: '1em',
        borderRadius: '.5em',
      }}>
        <div
          className='profile-header'
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            id='file-upload'
            onChange={handleImageUpload}
          />
          <img
            src={selectedImage || 'https://via.placeholder.com/100'}
            alt='Profile'
            className='profile-image'
            onClick={() => document.getElementById('file-upload').click()}
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              margin: '1em 2em',
              borderRadius: '50%',
              opacity: isSuspended ? '.6' : '1',
              cursor: 'pointer',
              border: '1px solid rgb(125, 125, 125, .3)'
            }}
          />
          <div className='profile-info-header' style={{ width: '400px', padding: '1em' }}>
            <h2
              style={{
                fontSize: '1.75em',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: '600',
                textTransform: 'capitalize',
                margin: '0',
                color: 'inherit',
                opacity: isSuspended ? '.6' : '1',
              }}
            >
              {formData.name || 'No Full Name'}
            </h2>
            <p
              style={{
                fontSize: '1.12em',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: '400',
                margin: '0 0 0 .5em',
                opacity: isSuspended ? '.6' : '1',
              }}
            >
              @ {formData.username || 'No username'}
            </p>
          </div>

          <div
            className='profile-info'
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              flexGrow: '1',
              marginRight: '5em',
              padding: '1em 1.5em',
              width: '400px',
              lineHeight: '2',
            }}
          >
            <div className='profile-row'>
              <span className='label' style={{ opacity: isSuspended ? '.6' : '1', fontWeight: '800' }}>
                Email:{' '}
              </span>
              <span className='value' style={{ opacity: isSuspended ? '.6' : '1' }}>
                {formData.email || 'No Email'}
              </span>
            </div>
            <div className='profile-row'>
              <span className='label' style={{ opacity: isSuspended ? '.6' : '1', fontWeight: '800' }}>
                Address:{' '}
              </span>
              <span className='value' style={{ opacity: isSuspended ? '.6' : '1' }}>
                {formData.address || 'No Address'}
              </span>
            </div>
            <div className='profile-row'>
              <span className='label' style={{ opacity: isSuspended ? '.6' : '1', fontWeight: '800' }}>
                Contact No:{' '}
              </span>
              <span className='value' style={{ opacity: isSuspended ? '.6' : '1' }}>
                {formData.contact || 'No Contact number'}
              </span>
            </div>
            <div className='profile-row'>
              <span className='label' style={{ opacity: isSuspended ? '.6' : '1', fontWeight: '800' }}>
                DOB:{' '}
              </span>
              <span className='value' style={{ opacity: isSuspended ? '.6' : '1' }}>
                {formData.dob || 'No DOB'}
              </span>
            </div>
          </div>
        </div>

        <div className='action-buttons' style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1em',
          marginLeft: '1em'
        }}>
          <button className='edit-button' onClick={toggleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className='delete-button' onClick={deleteUser}>
            Delete
          </button>
          <button className='suspend-button' onClick={suspendUser}>
            {isSuspended ? 'Unsuspend' : 'Suspend'}
          </button>
        </div>
      </div>
      <div className='profile-card' style={{
        border: '1px solid rgb(125, 125, 125, 0.15)',
        boxShadow: '2px 2px 50px 5px rgb(125, 125, 125, 0.25)',
        paddingBottom: '1em',
        borderRadius: '.5em',
      }}>
        <div
          className='profile-header'
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            id='file-upload'
            onChange={handleImageUpload}
          />
          <img
            src={selectedImage || 'https://via.placeholder.com/100'}
            alt='Profile'
            className='profile-image'
            onClick={() => document.getElementById('file-upload').click()}
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              margin: '1em 2em',
              borderRadius: '50%',
              opacity: isSuspended ? '.6' : '1',
              cursor: 'pointer',
              border: '1px solid rgb(125, 125, 125, .3)'
            }}
          />
          <div className='profile-info-header' style={{ width: '400px', padding: '1em' }}>
            <h2
              style={{
                fontSize: '1.75em',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: '600',
                textTransform: 'capitalize',
                margin: '0',
                color: 'inherit',
                opacity: isSuspended ? '.6' : '1',
              }}
            >
              {formData.name || 'No Full Name'}
            </h2>
            <p
              style={{
                fontSize: '1.12em',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: '400',
                margin: '0 0 0 .5em',
                opacity: isSuspended ? '.6' : '1',
              }}
            >
              @ {formData.username || 'No username'}
            </p>
          </div>

          <div
            className='profile-info'
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              flexGrow: '1',
              marginRight: '5em',
              padding: '1em 1.5em',
              width: '400px',
              lineHeight: '2',
            }}
          >
            <div className='profile-row'>
              <span className='label' style={{ opacity: isSuspended ? '.6' : '1', fontWeight: '800' }}>
                Email:{' '}
              </span>
              <span className='value' style={{ opacity: isSuspended ? '.6' : '1' }}>
                {formData.email || 'No Email'}
              </span>
            </div>
            <div className='profile-row'>
              <span className='label' style={{ opacity: isSuspended ? '.6' : '1', fontWeight: '800' }}>
                Address:{' '}
              </span>
              <span className='value' style={{ opacity: isSuspended ? '.6' : '1' }}>
                {formData.address || 'No Address'}
              </span>
            </div>
            <div className='profile-row'>
              <span className='label' style={{ opacity: isSuspended ? '.6' : '1', fontWeight: '800' }}>
                Contact No:{' '}
              </span>
              <span className='value' style={{ opacity: isSuspended ? '.6' : '1' }}>
                {formData.contact || 'No Contact number'}
              </span>
            </div>
            <div className='profile-row'>
              <span className='label' style={{ opacity: isSuspended ? '.6' : '1', fontWeight: '800' }}>
                DOB:{' '}
              </span>
              <span className='value' style={{ opacity: isSuspended ? '.6' : '1' }}>
                {formData.dob || 'No DOB'}
              </span>
            </div>
          </div>
        </div>

        <div className='action-buttons' style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1em',
          marginLeft: '1em'
        }}>
          <button className='edit-button' onClick={toggleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className='delete-button' onClick={deleteUser}>
            Delete
          </button>
          <button className='suspend-button' onClick={suspendUser}>
            {isSuspended ? 'Unsuspend' : 'Suspend'}
          </button>
        </div>
      </div>

      {showDialog && (
        <div className='dialog-overlay' onClick={handleOutsideClick}>
          <div
            className='dialog-box'
            style={{
              position: 'absolute',
              top: dialogPosition.y,
              left: dialogPosition.x,
              cursor: isDragging ? 'grabbing' : 'grab',
              // transform: 'translate(135%, 25%)',
              margin: 'auto 0',
              borderRadius: '1.5em'
            }}
            onMouseDown={handleMouseDown}
          >
            <span className='close-icon' onClick={closeDialog}>
              &times;
            </span>
            <form onSubmit={handleSubmit} className='dialog-form'>
              <div className='profile-row'>
                <label className='label'>Full name: </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='input'
                />
              </div>
              <div className='profile-row'>
                <label className='label'>Username: </label>
                <input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  className='input'
                  required
                />
              </div>
              <div className='profile-row'>
                <label className='label'>Email: </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='input'
                  required
                />
              </div>
              <div className='profile-row'>
                <label className='label'>Address: </label>
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  className='input'
                  required
                />
              </div>
              <div className='profile-row'>
                <label className='label'>Contact number: </label>
                <input
                  type='text'
                  name='contact'
                  value={formData.contact}
                  onChange={handleChange}
                  className='input'
                  required
                />
              </div>
              <div className='profile-row'>
                <label className='label'>DOB: </label>
                <input
                  type='date'
                  name='dob'
                  value={formData.dob}
                  onChange={handleChange}
                  className='input'
                  required
                />
              </div>
              <button type='submit' className='submit-button'>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>

      </Box>
    </Box>
  );
};

export default ClientProfile;








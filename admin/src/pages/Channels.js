import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Divider, IconButton, InputBase, Typography, Modal, TextField, Switch } from '@mui/material';
import { Search, GetApp, FilterList, ArrowDropUp, ArrowDropDown, Visibility, Edit, Delete } from '@mui/icons-material';

const Channels = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(3);
  const [channelStatus, setChannelStatus] = useState('active');

  const handleStatusChange = () => {
    setChannelStatus((prevStatus) => prevStatus === 'active' ? 'inactive' : 'active');
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenView = (channel) => {
    setSelectedChannel(channel);
    setOpenView(true);
  };
  const handleCloseView = () => setOpenView(false);

  const handleOpenEdit = (channel) => {
    setSelectedChannel(channel);
    setChannelName(channel.name);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (channel) => {
    setSelectedChannel(channel);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const fetchChannels = async () => {
    try {
      const response = await axios.get('https://television-networks-app-mf94.onrender.com/channels/getChannel', {
        params: {
          search: searchTerm,
          sort: sortOrder ? `${sortOrder === 'asc' ? '' : '-'}name` : '',
          page: currentPage,
          limit: pageSize,
        }
      });

      if (response.data.channels && Array.isArray(response.data.channels)) {
        setChannels(response.data.channels);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } else {
        setChannels([]);
        setTotalPages(1);
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching channels", error);
      setChannels([]);
    }
  };

  const handleAddChannel = async () => {
    if (channelName.trim() === '') return;
    try {
      await axios.post('https://television-networks-app-mf94.onrender.com/channels/add', { name: channelName,status: channelStatus === 'active' });
      fetchChannels();
      setChannelName('');
      handleCloseAdd();
    } catch (error) {
      console.error("Error adding channel", error);
    }
  };

  const handleUpdateChannel = async () => {
    if (channelName.trim() === '') return;
    try {
      await axios.put(`https://television-networks-app-mf94.onrender.com/channels/update/${selectedChannel.id}`, { name: channelName });
      fetchChannels();
      setChannelName('');
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating channel", error);
    }
  };

  const handleDeleteChannel = async () => {
    try {
      await axios.delete(`https://television-networks-app-mf94.onrender.com/channels/delete/${selectedChannel.id}`);
      fetchChannels();
      handleCloseDelete();
    } catch (error) {
      console.error("Error deleting channel", error);
    }
  };

  const handleInputChange = (event) => {
    setChannelName(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);  
  };

  useEffect(() => {
    fetchChannels();
  }, [searchTerm, sortOrder, currentPage]);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: "space-between" }}>
        <Box sx={{ background: "whitesmoke", width: "60%", display: 'flex', alignItems: 'center', p: 1 }}>
          <IconButton>
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "40%", ml: 3 }}>
          <IconButton>
            <GetApp />
          </IconButton>
          <Typography>Export</Typography>
          <IconButton>
            <FilterList />
          </IconButton>
          <Typography>Add filter</Typography>
          <Button
            variant='contained'
            sx={{ background: "#09143C", p: 1, ml: 3, color: "white", textTransform: "capitalize" }}
            onClick={handleOpenAdd}
          >
            Add channel
          </Button>
        </Box>
      </Box>
      <Divider sx={{ my: 3, background: "gray", height: "1px" }} />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: "space-between" }}>
        <Typography sx={{ width: '15%' }}>Name</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <IconButton size="small" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              {sortOrder === 'asc' ? <ArrowDropUp fontSize="small" /> : <ArrowDropDown fontSize="small" />}
            </IconButton>
          </Box>
          <Typography>Status</Typography>
        </Box>
        <Typography sx={{ width: '20%' }}>Action</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />

      {Array.isArray(channels) && channels.map((channel) => (
       <Box key={channel.id} sx={{ display: 'flex', alignItems: 'center', p: 1, mb: 2, justifyContent: "space-between" }}>
       <Typography sx={{ width: '20%' }}>{channel.name}</Typography>
       <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
         <Box sx={{ marginRight: 1 }}> {/* Adjust marginRight as needed */}
           <Switch defaultChecked={channel.status === 'active'} />
         </Box>
       </Box>
       <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
         <IconButton onClick={() => handleOpenView(channel)}><Visibility /></IconButton>
         <IconButton onClick={() => handleOpenEdit(channel)}><Edit /></IconButton>
         <IconButton onClick={() => handleOpenDelete(channel)}><Delete /></IconButton>
       </Box>
     </Box>
     
     
      ))}
      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography sx={{ mx: 2 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>

      {/* Add Channel Modal */}
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Add Channel
          </Typography>
       
          <TextField
            label="Channel Name"
            variant="outlined"
            fullWidth
            value={channelName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
             <Switch defaultChecked={channelStatus === 'active'} onChange={handleStatusChange} /> 
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddChannel}
          >
            Add
          </Button>
        </Box>
      </Modal>

      {/* View Channel Modal */}
      <Modal
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            View Channel
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Name: {selectedChannel && selectedChannel.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Status: {selectedChannel && (selectedChannel.status === 'active' ? 'Active' : 'Inactive')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseView}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Edit Channel Modal */}
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Edit Channel
          </Typography>
          <TextField
            label="Channel Name"
            variant="outlined"
            fullWidth
            value={channelName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Switch defaultChecked={selectedChannel && selectedChannel.status === 'active'} onChange={handleStatusChange} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateChannel}
          >
            Update
          </Button>
        </Box>
      </Modal>

      {/* Delete Channel Modal */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Delete Channel
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this channel?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteChannel}
            sx={{ mb: 2 }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Channels;

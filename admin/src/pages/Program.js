import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, Divider, IconButton, InputBase, Typography, Modal, TextField, MenuItem, Select, FormControl, InputLabel, Switch,FormControlLabel
} from '@mui/material';
import {
  Search, GetApp, FilterList, ArrowDropUp, ArrowDropDown, Visibility, Edit, Delete
} from '@mui/icons-material';

const Program = () => {

  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [programs, setPrograms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [channels, setChannels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [formState, setFormState] = useState({
    id: '',
    title: '',
    videoUrl: '',
    duration: '',
    channelId: '',
    categoryId: '',
    typeId: '',
    description: '',
    status: false
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPrograms();
    fetchChannels();
    fetchCategories();
    fetchTypes();
  }, [page, sortBy, sortOrder]);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/movies/getMovies', {
        params: {
          sortBy,
          sortOrder,
          page,
        },
      });
      setPrograms(response.data);
      // Assuming the server sends total pages information in the response
      setTotalPages(response.headers['x-total-pages']);
    } catch (error) {
      console.error("Error fetching programs", error);
    }
  };

  const handleSortChange = (field) => {
    // If the field is already sorted, toggle the order; otherwise, set to default ascending order
    setSortOrder(sortBy === field ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc');
    setSortBy(field);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const fetchChannels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/channels');
      console.log('Response from API:', response);
      if (Array.isArray(response.data)) {
        setChannels(response.data);
      } else {
        console.error('Expected an array but got', response.data);
        setChannels([]);
      }
    } catch (error) {
      console.error("Error fetching channels", error);
      setChannels([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/types');
      setTypes(response.data);
    } catch (error) {
      console.error("Error fetching types", error);
    }
  };

  const handleOpenAdd = () => {
    setFormState({
      id: '',
      title: '',
      videoUrl: '',
      duration: '',
      channelId: '',
      categoryId: '',
      typeId: '',
      description: '',
      status: false
    });
    setOpenAdd(true);
  };

  const handleOpenEdit = (program) => {
    setFormState(program);
    setOpenEdit(true);
  };

  const handleOpenView = (program) => {
    setFormState(program);
    setOpenView(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseView = () => setOpenView(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    setFormState(prevState => ({ ...prevState, status: e.target.checked }));
  };

  const handleAddProgram = async () => {
    try {
      await axios.post('http://localhost:5000/movies/add', formState);
      fetchPrograms();
      handleCloseAdd();
    } catch (error) {
      console.error("Error adding program", error);
    }
  };

  const handleUpdateProgram = async () => {
    try {
      await axios.put(`http://localhost:5000/movies/update/${formState.id}`, formState);
      fetchPrograms();
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating program", error);
    }
  };

  const handleDeleteProgram = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/movies/delete/${id}`);
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program", error);
    }
  };

  // Function to filter programs based on search query
  const filteredPrograms = programs.filter(program =>
    program.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, mb: 2, justifyContent: "space-between" }}>
        <Box sx={{ background: "whitesmoke", width: "60%", display: 'flex', alignItems: 'center', p: 1 }}>
          <IconButton>
            <Search />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "40%", ml: 3 }}>
          <IconButton>
            <GetApp />
          </IconButton>
          <Typography>
            Export
          </Typography>
          <IconButton>
            <FilterList />
          </IconButton>
          <Typography>
            Add filter
          </Typography>
          <Button
            variant='contained'
            sx={{ background: "#09143C", p: 1, ml: 3, color: "white", textTransform: "capitalize" }}
            onClick={handleOpenAdd}
          >
            Add program
          </Button>
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', p: 0, mb: 2 }}>
        <Typography sx={{ width: '10%' }}>Id</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '10%', gap: 0, flexDirection: "column" }}>
          <IconButton size="small"><ArrowDropUp fontSize="small" /></IconButton>
          <IconButton size="small"><ArrowDropDown fontSize="small" /></IconButton>
        </Box>
        <Typography sx={{ width: '10%' }}>Title</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '10%', gap: 0, flexDirection: "column" }}>
          <IconButton size="small"><ArrowDropUp fontSize="small" /></IconButton>
          <IconButton size="small"><ArrowDropDown fontSize="small" /></IconButton>
        </Box>
        <Typography sx={{ width: '15%' }}>Duration</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
          <IconButton size="small"><ArrowDropUp fontSize="small" /></IconButton>
          <IconButton size="small"><ArrowDropDown fontSize="small" /></IconButton>
        </Box>
        <Typography sx={{ width: '25%' }}>Description</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '10%', gap: 0, flexDirection: "column" }}>
          <IconButton size="small"><ArrowDropUp fontSize="small" /></IconButton>
          <IconButton size="small"><ArrowDropDown fontSize="small" /></IconButton>
        </Box>
        <Typography sx={{ width: '15%' }}>Status</Typography>
        <Typography sx={{ width: '10%' }}>Action</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />

      {filteredPrograms.map((program) => (
        <Box key={program.id} sx={{ display: 'flex', alignItems: 'center', p: 1, mb: 2, justifyContent: "space-between" }}>
          <Typography sx={{ width: '10%' }}>{program.id}</Typography>
          <Typography sx={{ width: '10%' }}>{program.title}</Typography>
          <Typography sx={{ width: '10%' }}>{program.duration}</Typography>
          <Typography sx={{ width: '25%' }}>{program.description}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '10%' }}>
            <Switch checked={program.status} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => handleOpenView(program)}><Visibility /></IconButton>
            <IconButton onClick={() => handleOpenEdit(program)}><Edit /></IconButton>
            <IconButton onClick={() => handleDeleteProgram(program.id)}><Delete /></IconButton>
          </Box>
        </Box>
      ))}

      <Modal open={openAdd} onClose={handleCloseAdd}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', maxWidth: '500px', display: 'flex', flexDirection: 'column', maxHeight: '500px', overflowY: 'auto' }}>
  <Typography variant="h6" gutterBottom>Add Program</Typography>
  <TextField
    fullWidth
    margin="normal"
    label="Title"
    name="title"
    value={formState.title}
    onChange={handleInputChange}
  />
  <TextField
    fullWidth
    margin="normal"
    label="Video URL"
    name="videoUrl"
    value={formState.videoUrl}
    onChange={handleInputChange}
  />
  <TextField
    fullWidth
    margin="normal"
    label="Duration"
    name="duration"
    value={formState.duration}
    onChange={handleInputChange}
  />
  <FormControl fullWidth margin="normal">
    <InputLabel id="channel-label">Channel</InputLabel>
    <Select
      labelId="channel-label"
      name="channelId"
      value={formState.channelId}
      onChange={handleInputChange}
    >
      {Array.isArray(channels) ? channels.map((channel) => (
        <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
      )) : null}
    </Select>
  </FormControl>
  <FormControl fullWidth margin="normal">
    <InputLabel id="category-label">Category</InputLabel>
    <Select
      labelId="category-label"
      name="categoryId"
      value={formState.categoryId}
      onChange={handleInputChange}
    >
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
      ))}
    </Select>
  </FormControl>
  <FormControl fullWidth margin="normal">
    <InputLabel id="type-label">Type</InputLabel>
    <Select
      labelId="type-label"
      name="typeId"
      value={formState.typeId}
      onChange={handleInputChange}
    >
      {types.map((type) => (
        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
      ))}
    </Select>
  </FormControl>
  <TextField
    fullWidth
    margin="normal"
    label="Description"
    name="description"
    value={formState.description}
    onChange={handleInputChange}
    multiline
  />
  <FormControlLabel
    control={<Switch checked={formState.status} onChange={handleSwitchChange} />}
    label="Status"
  />
  <Button variant="contained" onClick={handleAddProgram}>Add</Button>
</Box>

      </Modal>

      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', maxWidth: '500px',maxHeight: '500px', overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>Edit Program</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Video URL"
            name="videoUrl"
            value={formState.videoUrl}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Duration"
            name="duration"
            value={formState.duration}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="channel-label">Channel</InputLabel>
            <Select
              labelId="channel-label"
              name="channelId"
              value={formState.channelId}
              onChange={handleInputChange}
            >
              {Array.isArray(channels) ? channels.map((channel) => (
                <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
              )) : null}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="categoryId"
              value={formState.categoryId}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              name="typeId"
              value={formState.typeId}
              onChange={handleInputChange}
            >
              {types.map((type) => (
                <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            multiline
          />
          <FormControlLabel
            control={<Switch checked={formState.status} onChange={handleSwitchChange} />}
            label="Status"
          />
          <Button variant="contained" onClick={handleUpdateProgram}>Update</Button>
        </Box>
      </Modal>

      <Modal open={openView} onClose={handleCloseView}>
        <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', maxWidth: '500px' }}>
          <Typography variant="h6" gutterBottom>View Program</Typography>
          <Typography variant="body1">Title: {formState.title}</Typography>
          <Typography variant="body1">Video URL: {formState.videoUrl}</Typography>
          <Typography variant="body1">Duration: {formState.duration}</Typography>
          <Typography variant="body1">Channel: {channels.find(channel => channel.id === formState.channelId)?.name || 'Unknown Channel'}</Typography>
          <Typography variant="body1">Category: {categories.find(category => category.id === formState.categoryId)?.name || 'Unknown Category'}</Typography>
          <Typography variant="body1">Type: {types.find(type => type.id === formState.typeId)?.name || 'Unknown Type'}</Typography>
          <Typography variant="body1">Description: {formState.description}</Typography>
          <Typography variant="body1">Status: {formState.status ? 'Active' : 'Inactive'}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Program;

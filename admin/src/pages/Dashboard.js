import React,{useState,useEffect} from 'react';
import { Box, Button, Divider, Grid, IconButton, InputBase, Paper, Typography, Card, CardContent } from '@mui/material';
import { Search, GetApp, FilterList, Add, TrendingUp, Assessment, BarChart } from '@mui/icons-material';
import { PieChart, Pie, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart } from '@mui/x-charts';
import axios from 'axios'

const colors = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#AF19FF',
  '#FF3E96'
];


  const seriesData = [
    { curve: 'linear', data: [0, 5, 2, 6, 3, 9.3] },
    { curve: 'linear', data: [6, 3, 7, 9.5, 4, 2] },
    { curve: 'linear', data: [1, 2, 3, 4, 5, 6] },
    { curve: 'linear', data: [2, 3, 5, 7, 11, 13] },
    
  ];

  
  const renderCustomizedLabel = ({ name, value }) => {
    return `${name}: ${value}`;
  }

const Dashboard = () => {   

  const[count,setCounts]=useState({}) 
  const [categoryStats, setCategoryStats] = useState([]);
  const [typeStats, setTypeStats] = useState([]);


  useEffect(() => {
    fetch('https://television-networks-app-mf94.onrender.com/movies/category-stats')
      .then(response => response.json())
      .then(data => {
        // Merge colors into the data
        const dataWithColors = data.map((item, index) => ({
          ...item,
          color: colors[index % colors.length]
        }));
        setCategoryStats(dataWithColors);
      })
      .catch(error => console.error('Error fetching category stats:', error));
  }, []);
  useEffect(() => {
    fetch('https://television-networks-app-mf94.onrender.com/movies/types-stats')
      .then(response => response.json())
      .then(data => {
        setTypeStats(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching types stats:', error));
  }, []);
  

  useEffect(()=>{
    fetchData()

  },[])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://television-networks-app-mf94.onrender.com/count/counts'); // Assuming your backend API is served at /api/counts
      setCounts(response.data);
      console.log(count);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, mb: 2,justifyContent:"space-between" }}>
        <Box sx={{background:"whitesmoke",width:"60%"}}>
        <IconButton>
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          />
          </Box>
          <Box sx={{display:"flex",alignItems:"center",width:"40%",ml:3}}>
        <IconButton>
          <GetApp />
        </IconButton>
        <Typography sx={{ }}>
          Export
        </Typography>
        <IconButton sx={{  }}>
          <FilterList />
        </IconButton>
        <Typography sx={{  }}>
          Add filter
        </Typography>
        <Button
        variant='contained'
          sx={{ background:"#09143C",p:1,ml:3,color:"white" ,textTransform:"capitalize"}}
          >
          Add Filter
        </Button>
            </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{boxShadow:4}}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{fontWeight:"bold"}}>System User</Typography>
                <TrendingUp />
              </Box>
              <Typography variant="h6" sx={{ my: 2 }}>{count.userCount}</Typography>
              <Typography color="textSecondary">+12% this month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{boxShadow:4}}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{fontWeight:"bold"}}>Program</Typography>
                <Assessment />
              </Box>
              <Typography variant="h6" sx={{ my: 2 }}>{count.programCount}</Typography>
              <Typography color="textSecondary">+12% this month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{boxShadow:4}}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{fontWeight:"bold"}}>Channel</Typography>
                <BarChart />
              </Box>
              <Typography variant="h6" sx={{ my: 2 }}>{count.channelCount}</Typography>
              <Typography color="textSecondary">+12% this month</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, bgcolor: '#000', color: '#fff', p: 1,width:250 ,textAlign:"center",borderRadius:"5px",position:"absolute",zIndex:3}}>
        <Typography variant="p">Program on Category</Typography>
      </Box>
          <Card sx={{ mt: 5, p: 2, maxWidth: 400, boxShadow: 4, position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PieChart width={200} height={200} sx={{ position: 'relative' }}>
            <Pie
              data={categoryStats}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="_count.movies"
              label={renderCustomizedLabel}
            >
              {categoryStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <Box sx={{ ml: 2 }}>
            {categoryStats.map((category, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ width: 16, height: 16, bgcolor: category.color, mr: 1 }} />
                <Typography variant="body1" sx={{ flex: 1, mr: 6 }}>{category.name}</Typography>
                <Typography variant="body1">{category._count.movies}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>

      <Box sx={{ mt: 4, bgcolor: '#000', color: '#fff', p: 1,width:250 ,textAlign:"center",borderRadius:"5px",position:"absolute",zIndex:3}}>
        <Typography variant="p">Program on Types</Typography>
      </Box>
      <Card  sx={{ mt: 5, p: 2, boxShadow:4,display:"flex",justifyContent:"space-around"}}>
      <CardContent>
        
        <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LineChart
            series={seriesData}
            width={500}
            height={300}
          />
        </Box>
      </CardContent>

      <CardContent>
      <Box sx={{ mt: 4, bgcolor: '#000', color: '#fff', p: 1,width:250 ,textAlign:"center",borderRadius:"5px"}}>
        <Typography variant="p">201 Over all Program</Typography>
      </Box>
      <Box sx={{ ml: 2 }}>
      {typeStats?.map((type, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ width: 16, height: 16, bgcolor: type.color, mr: 1 }} />
                <Typography variant="body1" sx={{ flex: 1, mr: 6 }}>{type.name}</Typography>
                <Typography variant="body1">{type._count.movies}</Typography>
              </Box>
            ))}
            </Box>
      </CardContent>
    </Card>
        
    </Box>
  );
};

export default Dashboard;

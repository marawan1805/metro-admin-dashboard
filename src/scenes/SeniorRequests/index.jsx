import React from 'react'
import Header from '../../components/Header'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'

function SeniorRequests() {

  const [seniorRequest, setSeniorRequest] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    fetch('https://cairo-metro-senior-refund.vercel.app/api/senior-request/') 
      .then(res => res.json())
      .then(async seniorData => {
        const temp = [];
        for(let element of seniorData){
          const userData = await fetch(`https://metro-user.vercel.app/api/user/${element.userId}`).then(res => res.json());
          temp.push(
            {'idImage':element.idImage,
            'nationalId':userData.nationalId, 
            'userId':element.id,
            "status":element.status 
          });
        }
        setSeniorRequest(temp);
      });
  }, [reload]);

  const onClickApprove =  async (id) => {
    await fetch('https://cairo-metro-senior-refund.vercel.app/api/senior-request/approve', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"id":id})
    });

    setReload(!reload)
    alert('Approved Request')
 
  }

  const onClickReject =  async (id) => {
    await fetch('https://cairo-metro-senior-refund.vercel.app/api/senior-request/reject', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"id":id})
    });

    setReload(!reload)
    alert('Rejected Request')
 
  }
  
  const Table = () => {
    console.log(seniorRequest);
    
    return (<>
      { seniorRequest && seniorRequest.length > 0 ? 

        seniorRequest.map((element) => 
        <div style={{padding:'10px',display:'flex', flexDirection:'row', textAlign:'center',justifyContent:'space-evenly', height:'35vh', width:'60vw', borderBottom:'solid white 1.5px',borderTop:'solid white 1.5px'}}>

          <img key={element.idImage} src={element.idImage} alt='"picture not available"' />

          <div>
            <p>National ID: {element.nationalId}</p>
            <p>Status: {element.status}</p>
          </div>
          

          <Button style={{height:'50%', alignSelf:'center'}} variant="contained" onClick={() => onClickApprove(element.nationalId)}>Approve</Button>

          <Button style={{height:'50%', alignSelf:'center'}} variant="contained" onClick={() => onClickReject(element.nationalId)}>Reject</Button>

        </div>
        )
        : <p>Loading...</p> 
      }
   </> )
    
  }
  
  return (
    <Box m="20px">
      <Header
        title="Senior Requests"
        subtitle="List of Senior Requests"
      />
      <Table />
    </Box>
  )
}

export default SeniorRequests
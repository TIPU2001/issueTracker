//import { Card, CardContent } from "@mui/material"
import { Button } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
//import Swal from "sweetalert2"
import { UserContext } from "../useContext"

const Track = () => {
  const url = "http://localhost:5000"

  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(false)

  // const [userToAdd, setUserToAdd] = useState("");

  const {currentUser} = useContext(UserContext);

  const getDataFromBackend = async () => {
    setLoading(true)
    const res = await fetch(url + "/issue/getall")
    const data = await res.json()
    setIssues(data)
    setLoading(false)
    console.log(data)
  }

  useEffect(() => {
    getDataFromBackend()
  }, [])

  // const updateUser = (teamid, userid) => {
  //   fetch(url+'/user/update/'+userid, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       team: teamid,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(res => res.json())
  //   .then(data => {
  //     console.log(data)

  //     fetch(url+'/team/pushupdate/'+currentUser.team._id, {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         members: data._id,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }).then(res => {
  //       console.log(res.status);
  //       Swal.fire({
  //         title: "Success",
  //         text: "Member Added Successfully",
  //         icon: "success",
  //       })
  //     })
      
  //   })
  // }

  // const addMember = () => {
  //   fetch(url+'/user/getbyemail/'+userToAdd)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     if(data){

  //       if(!data.team){
  //         updateUser(currentUser.team._id, data._id)
  //       }else{
  //         Swal.fire({
  //           icon: "error",
  //           title: "User Already in a Team",
  //           text: "User Already in a Team",
  //         });
  //       }

  //     }else{
  //       console.log('user not found');
  //     }
  //   })
  // }


  const updateStatus = async (issueid) => {
    const res = await fetch(url + "/issue/update/" + issueid, {
      method: "PUT",
      body: JSON.stringify({ status: "solved" }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(res.status);
    if (res.status === 200) {
      console.log("updated")
      getDataFromBackend()
    }
  }

  const updateStatusOpen = async (issueid) => {
    const res = await fetch(url + "/issue/update/" + issueid, {
      method: "PUT",
      body: JSON.stringify({ status: "new" }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.status === 200) {
      console.log("updated")
      getDataFromBackend()
    }
  }

  const statusFun = (status) => {
    if (status === "solved") {
      return <button className="btn btn-warning btn-rounded">closed
     <i class="fas fa-check   "></i>
      </button>
    } else if (status === "new") {
      return <button className="btn btn-info btn-rounded">Open
       <i class="fas fa-plus "></i>
      </button>
    }
  }

//   const teamTitle =(team) => {
// if(team !== "")
// return team
// else return 'None'
//   }

  const displayIssues = () => {
    if (!loading) {
      return issues.map(({ _id, title, type, assignedBy, createdAt, org, status, team }) => (
        <div className="card mt-5 ms-5" >
          <div className="card-body" >
            <div class="accordion">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target={"#" + _id}
                    aria-expanded="true"
                    aria-controls={_id}>
                    {title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {new Date(createdAt).toLocaleDateString()}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="float-start " >{statusFun(status)}</span>
                  </button>
                </h2>
                <div id={_id} class="accordion-collapse collapse show" aria-labelledby="headingOne" data-mdb-parent="#accordionExample">
                  <div class="accordion-body">
                    <h4>Type : {type}</h4>
                    <h4>Team :  {currentUser.team ? currentUser.team.title :"No Team Created"}</h4>
                   
                    <h4>Assigned By : {assignedBy.name}</h4>
                    <h4>Date & Time : {new Date(createdAt).toLocaleDateString()} {new Date(createdAt).toLocaleTimeString()}</h4>
                    <h4>Organisation : {org}</h4>
                    <h4>Status : {statusFun(status)} </h4>
                    <Button color="error" variant="contained" onClick={(e) => updateStatus(_id)}>
                      Close issue
                    </Button>
                    <Button color="error" variant="contained" className="ms-3" onClick={(e) => updateStatusOpen(_id)}>
                      Open issue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    }
  }

  return (
    <div  style={{backgroundColor:"rgb(245 245 255)",height:"100vh"}}>
      {/* <header>
        <div className="container">

          <input className="form-control" onChange={e => setUserToAdd(e.target.value) } />
          <button onClick={addMember}>Add New Member</button>
        </div>
        </header> */}
      <div className="container">
        <h2 className="mt-5 ">All issues</h2>
       
        {displayIssues()}
      </div>
    </div>
  )
}

export default Track

 import React, { Component } from 'react'
import { Button, Checkbox, Form,Container,Card,Grid,Icon } from 'semantic-ui-react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default class MyCourses extends Component {

state= {
    userData:'',
    myuserCourses:[]
}

componentDidMount() {
    this.getUserData()
}

// jono@mail.com

getUserCourses = () => {
  axios.get('/api/user/mycourses',{
    headers: { authorization: localStorage.getItem('token') },
  })
  .then((res)=>{
    this.setState({myuserCourses:res.data})

  })
}

findCourseIdAndDelete = async (id) => {

  axios.delete(`api/user/course/${id}`,{
      headers: { authorization: localStorage.getItem('token') },
    })
  .then((response)=>{
   this.getUserCourses()
   })
} 


getUserData = () => {
  axios.get('/api/user/profile', {
    headers: { authorization: localStorage.getItem('token') },
  }).then((response)=>{
console.log(response.data.myCourses.filter(function (a) {
  return !this[a.subject] && (this[a.subject] = true);
}, Object.create(null)),'respnse data infor')

let a = response.data.myCourses.filter(function (a) {
  return !this[a.subject] && (this[a.subject] = true);
}, Object.create(null))




     this.setState({userData:response.data,myuserCourses:a}
   
      ,()=>{
      console.log(response.data.myCourses,
      
      'my courses profile')
    })

  })

 }

    render() {

 
     

        return (
            <Container>

             <div style={{margin:'50px 40px 0 0'}}>
 <div style={{textAlign:"center"}}>
<h1>
  Courses
     </h1>
    </div>



 

   


    {this.state.myuserCourses? this.state.myuserCourses.map((item)=>(
        <div >

           <Card style={{width:"345px",height:"250px",float:'left',margin:'10px 15px 0 0'}}>
<div style={{textAlign:"center",margin:'15px 0 0 0'}}>

<Button style={{margin:"20px 0 0 0"}}color='red' onClick={()=>{
   this.findCourseIdAndDelete(item._id)
}}>
  <span>
  delete 
   <Icon name='x'></Icon>
  </span>
   
</Button>

<h2 style={{margin:'40px 0 0 0'}}> <h2> {item.subject}</h2></h2> 
{/* <h2 style={{margin:'40px 0 0 0'}}> <h2> {item.subject}</h2></h2>  */}

{/* <Link
as={Link}
to={item.route}
>
  take test
</Link> */}
 <div style={{margin:'20px 0 0 0'}}>
   
 {console.log(item.route,'item route?')}

 {this.state.userData.isStudent?
 <Link
 as={Link}
 to={item.route}
 >
   <Button color='linkedin'> take Exam</Button>
 </Link>:null
}
     
</div>

</div> 
  </Card>  

        </div>
      )):'You Do Not Have Any Classes Yet'}

            </div>
            </Container>
        )
    }
}
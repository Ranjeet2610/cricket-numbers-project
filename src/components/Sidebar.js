import React, { Component } from 'react'
import { Link,Redirect,useHistory } from 'react-router-dom';
import Service from '../Services/Service';
 export default class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cricketData: '',
        tenisData: '',
        soccerData: '',
        liveEvents:''
    };
   
}

componentDidMount(){

  var service = new Service();
  service.getdashboardData("4",data=>{
    this.setState({
      cricketData: data
    })
  });
  service.getdashboardData("2",data=>{
    this.setState({
      tenisData: data
    })
  });
  service.getdashboardData("1",data=>{
    this.setState({
      soccerData: data
    })
  });
  // service.getLiveEvents(data=>{
   
  //   this.setState({
  //     liveEvents: data.data.Data
  //   })
  // });
  let eveodds = [];
  service.getLiveEvents((data) => {
    data.data.Data.map((item) => {
      service.getEventInitialOdds(item.eventId, (data) => {
        eveodds.push({
          events: item,
          odds: data.data,
        });

        this.setState({
          liveEvents: eveodds,
        });
      });
    });
  });
 
}
openCricket(eid,name,date){
window.location.href = window.location.protocol+"//"+window.location.host+'/matchodds/'+eid;
localStorage.setItem("matchname", JSON.stringify({name:name,date:date}));
}
openTenis(eid){
  //window.location.href ='matchodds/'+eid
  }
  openSoccer(eid){
    //window.location.href ='matchodds/'+eid
  }
  render() {
    if (window.location.pathname === '/') return null;
   let tendata;let socdata; let eventdata;
   // for cricket menu
//Live Events
if(this.state.liveEvents.length>0){
  eventdata = this.state.liveEvents.map((item)=>{
 if(item.odds){
return ( <li>
<a title="Events" onClick={() =>
                  this.openCricket(item.events.eventId, item.events.eventName,item.events.OpenDate)
                }>
<i className="fa fa-angle-double-right" />  {item.events.eventName}
</a>
<ul id="list_of29894585" />
</li>);
 }
})  
}
// for tenis menu

// if(this.state.tenisData.length>0){
//   tendata = this.state.tenisData.map((item)=>{
// return ( <li>
// <a title="Match OODS" onClick={()=>this.openTenis(item.event.id)}>
// <i className="fa fa-angle-double-right" />  {item.event.name}
// </a>
// <ul id="list_of29894585" />
// </li>);
// })  
// }


// for Soccer menu

// if(this.state.soccerData.length>0){
//   socdata = this.state.soccerData.map((item)=>{
// return ( <li>
// <a title="Match OODS" onClick={()=>this.openSoccer(item.event.id)}>
// <i className="fa fa-angle-double-right" />  {item.event.name}
// </a>
// <ul id="list_of29894585" />
// </li>);
// })  
// }
    return (
        <div className="left-side-menu">
            <div className="panel-group" id="accordion">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <Link to="/dashboard?inplay">In-Play</Link>
                  </h4>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="javascript:void(0) #collapseOne">Cricket <span className="extender" /></a>
                  </h4>
                </div>
                <div id="collapseOne" className="panel-collapse collapse">
                  <div className="panel-body">
                    <ul id="cricket_child_menu">
                      {/* {crickdata} */}
                      {eventdata}
                    </ul>
                  </div>
                </div>
              </div>
              {/*- Tennis */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="javascript:void(0) #collapseTwo">Tennis <span className="extender" /></a>
                  </h4>
                </div>
                <div id="collapseTwo" className="panel-collapse collapse">
                  <div className="panel-body">
                    <ul id="tennis_child_menu">
                      {tendata}
                    </ul>
                  </div>
                </div>
              </div>
              {/*- Soccer */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="javascript:void(0) #collapsethree">Soccer <span className="extender" /></a>
                  </h4>
                </div>
                <div id="collapsethree" className="panel-collapse collapse">
                  <div className="panel-body">
                    <ul id="soccer_child_menu">
                      {socdata}
                     
                    </ul>
                  </div>
                </div>
              </div>
            </div>		
          </div>
    )
}
}
  
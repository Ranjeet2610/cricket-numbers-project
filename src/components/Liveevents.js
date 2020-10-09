import React, { Component } from 'react'
import Navbar from './Navbar';
import Livevents from '../Services/livevents';
import Footer from './footer'
import Service from "../Services/Service";


export default class Liveevents extends Component {

  constructor(props){
    super(props);
    this.state = {
      resdata:'',
      eventName:'',
      eventID:'',
      odds1:'',
      odds2:'',
      odds3:'',
      odds4:'',
      odds4:'',
      odds5:'',
      showModal: false,
      oddsValue:'',
      disable:true,
      checkedItems: new Map()
    };
    this.events = new Livevents();
    this.service = new Service();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleEnable = () => {
  this.setState({
    disable:false
  })
}

reloadData(){
  // debugger
  this.events.getLiveEvents('',data=>{
    let allEvents = data.data;
   
    let isEventlive = allEvents.map(item => {

    

      this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item.eventId, item.active) }));
     });
      this.setState({
        resdata:allEvents
      })
     
    });
}

componentDidMount() {
  // debugger
  this.events.getLiveEvents('',data=>{
  let allEvents = data.data;

  let isEventlive = allEvents.map(item => {
    // if(item.active){
    // 
    // }
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item.eventId, item.active) }));
  });
 
    this.setState({
      resdata:allEvents
    })
  });
}

handleChange(e) {
  // debugger
  const item = e.target.value;
  const isChecked = e.target.checked;
  this.events.UpdateEventFlag(item,(data)=>{
   
    this.reloadData();
  })

  
  this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  
}

addInitialOdds(e){
  const itemName = e.target.name;
  const itemId = e.target.id;
  this.setState({
    eventName:itemName,
    eventID:itemId
  })
  this.service.getEventInitialOdds(itemId, (data) => {
    this.setState({
      oddsValue:data.data
    })
    console.log(this.state.oddsValue)
    });
}

addmarketevents() {
 
  this.events.storeLiveEvents({},
    data=>{
      alert("market events Added successfully.");
      window.location.reload();
  });
}

handleSubmit(event) {
  event.preventDefault();
  const odds = new FormData(event.target);
  this.events.updateInitialOdds({
    eventID:Number(odds.get('eventID')),
    odds1:Number(odds.get('odds1')),
    odds2:Number(odds.get('odds2')),
    odds3:Number(odds.get('odds3')),
    odds4:Number(odds.get('odds4')),
    odds5:Number(odds.get('odds5')),
    odds6:Number(odds.get('odds6'))
  },
    data=>{
      alert("Odds Added successfully.");
  });
}

render(){
 
  var i = 0;
  let livevents;

  if(this.state.resdata.length>0){
    livevents = this.state.resdata.map(item => {
    
      i = i + 1;
        return (
        <tr>
          <td>{i}</td>
          <td className=" ">{item.eventId}</td>
          <td className="green text-left">{item.eventName}</td>
          <td className="red text-left">{item.OpenDate}</td>
          <td className="green text-left">
            <input type="checkbox" name={item.eventId} checked={this.state.checkedItems.get(item.eventId)} onChange={this.handleChange} value={item.eventId} style={{height: '20px',width: '20px'}} />
            {/* <input type="checkbox" name='Eventstatus' onChange={this.handleChange} value={item.eventId} checked={item.active === true ? 'checked' : ''} style={{height: '20px',width: '20px'}}></input> */}          
          </td>
          <td className="red text-center"><a href="javascript:;" name={item.eventName} id={item.eventId} onClick={(e) => this.addInitialOdds(e)} data-toggle="modal" data-target="#exampleModal" data-backdrop="static" data-keyboard="false">Add Initial Odds</a> | <a href={'/eventmatchodds/' + item.eventId}>Match Odds</a> | <a href={'/eventfancyodds/' + item.eventId}>Fancy Odds</a></td>
        </tr>
        )
    })
  }
    return (
        <div>
          <Navbar />
          <div className="forModal" />  

          <div className="container body">
            <div className="main_container" id="sticky" style={{width:'100%'}}>
              <div className="right_col" role="main">
                <div className="row">
                  <div className="col-md-12">
                    <div className="title_new_at">Live Events  
                      <div className="pull-right">
                        <button className="btn_common" onClick={() => {this.props.history.goBack()}}>Back</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                  <button className="btn_common"style={{margin:25}} onClick={() => {this.addmarketevents()}}>import Market</button>  
                    <br></br>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div id="divLoading"> 
                    </div>{/*Loading class */}
                    <div className="custom-scroll appendAjaxTbl" id="filterdata">
                      <table className="table table-bordered table-dark table_new_design" id="datatablesss">
                        <thead>
                          <tr className="headings">
                            <th className>S.No. </th>
                            <th className>Event Id </th>
                            <th className>Event Name </th>
                            <th className="rrig text-left">Event Date </th>
                            <th className="rrig text-left">Status </th>
                            <th className="rrig text-center">Action </th>
                          </tr>
                        </thead>
                        <tbody>
                          {livevents} 
                        </tbody>
                      </table>
                      <p>Showing 1 to 5 of 5 entries </p>  <p id="paginateClick" className="pagination-row dataTables_paginate paging_simple_numbers"> </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <div style={{float:'left'}}>
                  <h5 className="modal-title" id="exampleModalLabel">Add Initial Odds for {this.state.eventName}</h5>
                  </div>
                  <div style={{float:'right'}}>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                  </div>
                </div>

                <form onSubmit={this.handleSubmit}>
                  <div className="modal-body">
                    <div class="modal-body row">
                      <div class="col-md-6">
                        <label>Back Odds:</label>
                        <input type="text" id="odds1" name="odds1" className="form-control" placeholder="Odds 1" defaultValue={this.state.oddsValue.odds1} disabled={this.state.disable}/>
                        <br/>
                        <input type="text" id="odds2" name="odds2" className="form-control" placeholder="Odds 2" defaultValue={this.state.oddsValue.odds2} disabled={this.state.disable}/>
                        <br/>
                        <input type="text" id="odds3" name="odds3" className="form-control" placeholder="Odds 3" defaultValue={this.state.oddsValue.odds3} disabled={this.state.disable}/>
                      </div>
                      
                      <div class="col-md-6">
                        <label>Lay Odds:</label>
                        <input type="text" id="odds4" name="odds4" className="form-control" placeholder="Odds 4" defaultValue={this.state.oddsValue.odds4} disabled={this.state.disable}/>
                        <br/>
                        <input type="text" id="odds5" name="odds5" className="form-control" placeholder="Odds 5" defaultValue={this.state.oddsValue.odds5} disabled={this.state.disable}/>
                        <br/>
                        <input type="text" id="odds6" name="odds6" className="form-control" placeholder="Odds 6" defaultValue={this.state.oddsValue.odds6} disabled={this.state.disable}/>
                      </div>
                    </div>
                  </div>

                  <input type="hidden" name="eventID" id="eventID" className="form-control" value={this.state.eventID} />
                
                  <div className="modal-footer">

                    <button type="submit"  className="btn btn-primary text-center">Update</button>
                    <button type="button" onClick={this.handleEnable} className="btn btn-primary text-center">Add Odds</button>
                  </div>
                </form>
              </div>
            </div>
          </div>  
          <Footer/>     
        </div>
    )
}
}
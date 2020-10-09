import React, { Component } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Service from '../Services/Service';
import Utilities from './utilities'
import Footer from './footer'


export default class Bethistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      betHistory:[],
      from_date:'',
      to_date:'',
      currentDate:'',
      searchTearm:'',
      color:'lightblue',
      hover:false,
      newResData:[],
      historyType:'open'
     }
    this.service = new Service();
    this.userDetails = JSON.parse(localStorage.getItem('data'))!=undefined?JSON.parse(localStorage.getItem('data')):'';

  }

  handleFilter = async () => {
        let fD = await new Date(this.state.from_date).getTime()
        let tD = await new Date(this.state.to_date).getTime();
        if(fD <= tD){
          let dateFilter = this.state.newResData.map(ele => {
              return ele
          })
          let betHistoryFilter =dateFilter.filter(e => {
            let dataDate = new Date(e.createdAt).getTime()
              return dataDate>=fD && dataDate<=tD
            })
            await this.setState({
              betHistory:betHistoryFilter
            })
          }
          // this.getBetData();
        }

  changeBackground = (e,type) =>{
    if(type==='Back'){
      e.target.parentElement.classList.add('blue')
    }
    else{
      e.target.parentElement.classList.add('lightred')
    }
  }


  changeBackColor = (e,type) => {
    if(type==='Back'){
      e.target.parentElement.classList.remove('blue')
    }
    else{
      e.target.parentElement.classList.remove('lightred')
    }
  }

  handleChange = (event,type) => {
    this.setState({
      [event.target.name]:[event.target.value],
      historyType:event.target.value
    })   
    
  }

  handleClear = () =>{
    this.setState({
      from_date:this.state.currentDate,
      to_date:this.state.currentDate,
      searchTearm:""
    })
  }
getBetData(){
  if(this.userDetails.superAdmin){
    this.service.betHistoryAsPerUser({Betstatus:this.state.historyType,superAdmin:this.userDetails.userName},'getSuperAdminSectionOpenBetHistory',(data)=>{
      var i = 0;
      this.setState({
        betHistory:data,
        newResData:data
      });             
    });
   }
   else if(this.userDetails.Admin){
    this.service.betHistoryAsPerUser({Betstatus:this.state.historyType,adminName:this.userDetails.userName},'getAdminSectionOpenBetHistory',(data)=>{
      var i = 0;
      this.setState({
        betHistory:data,
        newResData:data
      });             
    }); 
   }
   else if(this.userDetails.Master){
    this.service.betHistoryAsPerUser({Betstatus:this.state.historyType,masterName:this.userDetails.userName},'getMasterSectionOpenBetHistory',(data)=>{
      var i = 0;
      this.setState({
        betHistory:data,
        newResData:data
      });             
    });
   }
   else{
    this.service.betHistoryAsPerUser({Betstatus:this.state.historyType,userName:this.userDetails.userName},'getUserOpenBetHistory',(data)=>{
      var i = 0;
      this.setState({
        betHistory:data,
        newResData:data
      });             
    });
   }
}
  componentDidMount() {   
    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substr(0,10);
   this.setState({
      currentDate:date
     }) 
    

     this.getBetData();
  }
  render(){
    let color= this.state.color;let device;
    var linkStyle;
   if (this.state.hover) {
     linkStyle = {color: 'green',cursor: 'pointer'}
   } else {
     linkStyle = {color: 'yellow'}
   }
 
   console.log(this.state.betHistory)

    return (
        <div>
          <Navbar />
    <Sidebar />
        <div className="forModal" />      <div className="container body">
          <div className="main_container" id="sticky">
            <style dangerouslySetInnerHTML={{__html: "\n    .mark-back:hover{background: #4cebdc !important;}\n    .mark-lay:hover{background: #c6f6f2 !important;}\n    .mark-back{background: #7CC4F7 !important;}\n    .mark-lay{background: #FCA4B7 !important;}\n" }} />
            <div className="right_col" role="main">
              <div className="col-md-12">
                <div className="title_new_at">
                <span>Bet History</span>
                <button style={{float:'right',paddingLeft:'5px',paddingRight:'5px', backgroundColor:'#6c1945', border:'none', borderRadius:'3px'}}
                  onClick={()=>{this.props.history.goBack()}}>Back</button>
                  {/* <select style={{color: 'black'}} onchange="perPage(this.value)">
                    <option value={10} selected>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select> */}
                </div>
              </div>
              <div className="col-md-12 ">
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="clearfix data-background">
                  <input type="hidden" name="ajaxUrl" id="ajaxUrl" defaultValue="betHistory" />
                  <form method="post" id="formSubmit" className="form-horizontal form-label-left input_mask"><input type="hidden" name="compute" defaultValue="fe6602731bf3d65605f0d8f6552a1c9f" /> 
                    <input type="hidden" name="sportId" id="sportId" defaultValue={5} />
                    <input type="hidden" name="perpage" id="perpage" defaultValue={10} />
                    <div className="popup_col_2">
                      <input type="date" onChange={(e)=>this.handleChange(e,'')} name="from_date" defaultValue={this.state.currentDate} id="from-date" className="form-control col-md-7 col-xs-12 has-feedback-left" placeholder="From date" autoComplete="off" />
                    </div>
                    <div className="popup_col_2">
                      <input type="date" onChange={(e)=>this.handleChange(e,'')} name="to_date" defaultValue={this.state.currentDate} id="to-date" className="form-control col-md-7 col-xs-12 has-feedback-left" placeholder="To date" autoComplete="off" />
                    </div>
{                    //<div className="popup_col_1">
                    //   <input type="text" onChange={this.handleChange} value={this.state.searchTearm} name="searchTearm" id="mstruserid" maxLength={100} size={50} className="form-control" placeholder="Search" />
                    // </div>
                  }
                    <div className="popup_col_2">
                      <select className="form-control" name="betStatus">
                        <option value={-1}>Match/Unmatch</option>
                        <option value={1}>Match</option>
                        <option value={0}>Unmatch</option>
                      </select>
                    </div>
                    <div className="popup_col_2">
                      <select className="form-control" onChange={(e)=>this.handleChange(e,'Type')}  name="historyType">
                        <option value="open">Open</option>
                        <option value="settled">Settled</option>
                      </select>
                    </div>
                    <div className="popup_col_3">
                      <button type="button" style={{marginRight:'5px'}} className="blue_button" onClick={this.handleFilter} id="submit_form_button"><i className="fa fa-filter" /> Filter</button>
                      <button type="button" className="red_button" onClick={this.handleClear}><i className="fa fa-eraser" /> Clear</button>
                    </div>
                  </form>	  </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="tab_bets get-mchlist">
                 {/* <ul id="betsalltab" className="nav nav-pills match-lists">
                     <li className="active">
                      <a href="#" dat-attr={5}>All</a>
                    </li> */}
                    {/* <li className>
                      <a href="#" dat-attr={4}>Cricket</a>
                    </li>
                    <li className>
                      <a href="#" dat-attr={2}>Tennis</a>
                    </li>
                    <li className>
                      <a href="#" dat-attr={1}>Soccer</a>
                    </li>                         */}
                    {/* <li className>
                      <a href="#" dat-attr={9}>Teenpatti</a>
                    </li>
                    <li className>
                      <a href="#" dat-attr={0}>Fancy</a>
                    </li> 
                  </ul>*/}
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div id="divLoading"> </div>{/*Loading class */}
                <div className="custom-scroll appendAjaxTbl">
                   <table className="table table-striped jambo_table bulk_action" id="datatables">
                    <thead>
                      <tr className="headings">
                        <th className="text-center">S.No. </th>
                        <th className="text-center">Client</th>
                        <th className="text-center">Description </th>
                        <th className="text-center">Selection </th>
                        <th className="text-center">Type </th>
                        <th className="text-center">Odds </th>
                        <th className="text-center">Stack </th>
                        <th className="text-center">Date </th>
                        <th className="text-center">P_L </th>
                        <th className="text-center">Profit </th>
                        <th className="text-center">Liability </th>
                        <th className="text-center">Bet&nbsp;type</th>
                        <th className="text-center">Status </th>
                        <th className="text-center">IP </th>
                        <th className="text-center">Device</th>
                        <th className="text-center">ID </th>
                      </tr>
                    </thead>  
                    <tbody>
                      {
                        this.state.betHistory.map((item,index) => {  
                          (item.bettype=='Lay') ? (color='#eb8295') : (color='#6ad0f1')
                          if(item.device ==2){
                            device = (<i class="fa fa-mobile" aria-hidden="true"></i>); 
                           }
                           else if(item.device ==3){
                            device = (<i class="fa fa-tablet" aria-hidden="true"></i>); 
                           }
                           else{
                            device = (<i class="fa fa-desktop" aria-hidden="true"></i>); 
                           }
                          return(
                          <tr style={{backgroundColor:color}}  onMouseOver={(e)=>this.changeBackground(e,item.bettype)} onMouseOut={(e)=>this.changeBackColor(e,item.bettype)}>
                            <td className="text-center">{index+1}</td>
                            <td className="text-center">{item.clientName}</td>
                            <td className="text-center">{JSON.parse(item.description).name}</td>
                            <td className="text-center">{item.selection}</td>
                            <td className="text-center">{item.bettype}</td>
                            <td className="text-center">{item.odds}</td>
                            <td className="text-center">{item.stack}</td>
                            <td className="text-center">{Utilities.datetime(item.createdDate)}</td>
                            <td className="text-center">{item.P_L.toFixed(2)}</td>
                            <td className="text-center">{item.profit?item.profit:0.0}</td>
                            <td className="text-center">{item.liability}</td>
                            <td className="text-center">Match</td>
                            <td className="text-center">{item.status}</td>
                            <td className="text-center">{item.IP}</td>
                            <td className="text-center">{device}</td>
                            <td className="text-center">{item.eventID}</td>
                          </tr>)
                          })
                      }
                    </tbody>                              
                  </table>
                  {/* <p>Showing 1 to 0 of 0 entries</p><p id="paginateClick" className="pagination-row dataTables_paginate paging_simple_numbers" /> */}
                  </div>
              </div>
            </div>
          </div></div>
          <Footer /></div>
    )
}
}

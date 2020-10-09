import React, { Component } from 'react'
import Navbar from './Navbar';
import Livevents from '../Services/livevents';
export default class EventMatchOdds extends Component {

  constructor(props){
    super(props);
    this.state = {
      marketata:'',
      runnersdata:''
    };
    this.events = new Livevents();
}

componentDidMount() {
  this.events.getMatchOdds(this.props.match.params.id,data=>{
  let allMdata = data.data.data.marketData;
  let allrunners = data.data.data.runners[0];
    this.setState({
        marketata:allMdata,
        runnersdata:allrunners
    })
  });
}
handleChange(event){
  this.events.lockMatchOdds({marketId:this.state.marketata.marketId},data=>{
  this.setState({
    marketata:data.data.Data,

  })
  })
 
}

render(){
  var i = 0;let livevents;
  if(this.state.runnersdata.length>0){
    livevents = this.state.runnersdata.map(item => {
      i = i + 1;
        return (
        <div>
          <p>Runner Name : {item.runnerName} </p>,
          <p>Selection Id : {item.selectionId}</p><br/>
          </div>
        )
    })
  }
    return (
        <div>
          <Navbar />
        <div className="forModal" />      <div className="container body">
          <div className="main_container" id="sticky" style={{width:'100%'}}>
            <div className="right_col" role="main">
              <div className="row">
                <div className="col-md-12">
                  <div className="title_new_at">Match Odds    
                    <div className="pull-right"><button className="btn_common" onClick={() => this.props.history.goBack()}>Back</button> </div>
                  </div>
                </div>
                <div className="col-md-12"><br></br>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div id="divLoading"> </div>{/*Loading class */}
                  <div className="custom-scroll appendAjaxTbl" id="filterdata">
                    <table className="table table-bordered table-dark table_new_design" id="datatablesss">
                      <thead>
                        <tr className="headings">
                          <th className>S.No. </th>
                          <th className>Market Id </th>
                          <th className>Market Name </th>
                          <th className>Runner Name </th>
                          <th className="rrig text-left">isEnable </th>
                          <th className="rrig text-center">Action </th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                      <td>1</td>
                      <td className="">{this.state.marketata.marketId}</td>
                      <td className="">{this.state.marketata.marketName}</td>
                      <td className="green text-left">{livevents}</td>
                      <td className="red text-left"><input type="checkbox"  checked={this.state.marketata.isEnabled} name ="isEnable" onChange={(e)=>this.handleChange(e)}  style={{height: '20px',width: '20px'}}></input></td> 					   
                      <td className="red text-center"><a href='#'>Action 1</a> | <a href="#">Action 2</a></td>
                    </tr>
                     
                      </tbody>
                    </table>
                    <p>Showing 1 to 5 of 5 entries </p>  <p id="paginateClick" className="pagination-row dataTables_paginate paging_simple_numbers"> </p>
                  </div>
                </div>
              </div>
            </div>
          </div></div></div>
    )
}
}
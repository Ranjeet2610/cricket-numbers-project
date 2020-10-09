import React, { Component } from 'react'
import Navbar from './Navbar';
import Livevents from '../Services/livevents';

export default class ManageFancyOdds extends Component {

  constructor(props){
    super(props);
    this.state = {
      marketata:[],
      runnersdata:''
    };
    this.events = new Livevents();
}

componentDidMount() {

  this.events.getFancyMarketType(this.props.match.params.id,data=>{ 
    this.setState({
        marketata:data.fancymarket
    });
  });
}
handleChange(event,marketId,type){
  if(type==1){
  this.events.enableFancyOdds({marketId:marketId},data=>{
    this.events.getFancyMarketType(this.props.match.params.id,data=>{      
        this.setState({
            marketata:data.fancymarket
        })
      }); 
  })
}
else{
  this.events.visiableFancyOdds({marketId:marketId},data=>{
    this.events.getFancyMarketType(this.props.match.params.id,data=>{      
        this.setState({
            marketata:data.fancymarket
        })
      }); 
  })  
}
}

render(){
//  console.log("vfoooooooooooooooooooooooooooo",this.state.marketata)
// this.state.marketata.sort((a, b) => a.marketData.marketName.localeCompare(b.marketData.marketName));
//  console.log("vfoooooooooooooooooooooooooooo",this.state.marketata)

  var i = 0;let livevents;

  if(this.state.marketata.length>0){
    livevents = this.state.marketata.map(item => {
        // let runners = item.runners.map((chilItem=>{
        // return (<div><p>Runner Name:{chilItem.runnerName}</p> ,
        // <p>Selcetion Id:{chilItem.selectionId}</p><br/>
        // </div>);
        // }))
      i = i + 1;
        return (
            <tr>
            <td>{i}</td>
            <td className="">{item.marketData.marketId}</td>
            <td className="">{item.marketData.marketName}</td>
            {/* <td className="green text-left">{runners}</td> */}
            <td className="red text-left"><input type="checkbox"  checked={item.marketData.isEnabled} name ="isEnable" onChange={(e)=>this.handleChange(e,item.marketData.marketId,1)}  style={{height: '20px',width: '20px'}}></input></td> 					   
            <td className="red text-left"><input type="checkbox"  checked={item.marketData.isVisible} name ="isVisible" onChange={(e)=>this.handleChange(e,item.marketData.marketId,2)}  style={{height: '20px',width: '20px'}}></input></td> 					   
            <td className="red text-center"><a href={window.location.protocol+"//"+window.location.hostname+":"+window.location.port+'/managefrunners/'+this.props.match.params.id+'?marketid='+item.marketData.marketId} >Manage Runners</a> | <a href="#">Action 2</a></td>
          </tr>
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
                  <div className="title_new_at">Fancy Odds    
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
                          {/* <th className>Runner Name </th> */}
                          <th className="rrig text-left">isEnable </th>
                          <th className="rrig text-left">isVisiable </th>
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
          </div></div></div>
    )
}
}
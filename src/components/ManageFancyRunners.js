import React, { Component } from 'react'
import Navbar from './Navbar';
import Livevents from '../Services/livevents';

export default class ManageFancyRunners extends Component {

  constructor(props){
    super(props);
    this.state = {
      marketata:'',
      runnersdata:''
    };
    this.events = new Livevents();
    this.query = new URLSearchParams(this.props.location.search);
}

componentDidMount() {   
    let marketId = this.query.get('marketid');
  this.events.getFancyMarketType(this.props.match.params.id,data=>{ 
      let filterData = data.fancymarket.filter((item)=>item.marketData.marketId == marketId);
    this.setState({
        marketata:filterData[0].runners
    });
  });
}
handleChange(event,selectionId){
  let mId = this.query.get('marketid');
  this.events.visiableFancyRunners({marketId:mId,selectionId:selectionId},data=>{
    
    this.events.getFancyMarketType(this.props.match.params.id,data=>{ 
        let filterData = data.fancymarket.filter((item)=>item.marketData.marketId == mId);
       // console.log(filterData);
      this.setState({
          marketata:filterData[0].runners
      });
    });
  })  

}

render(){ 
  var i = 0;let livevents;
  if(this.state.marketata.length>0){
    livevents = this.state.marketata.map(item => {
      i = i + 1;
        return (
            <tr>
            <td>{i}</td>
            <td className="">{item.selectionId}</td>
            <td className="">{item.runnerName!=undefined?item.runnerName:''}</td>
            <td className="red text-left"><input type="checkbox" checked={item.isRunnersVisible} name ="isVisible" onChange={(e)=>this.handleChange(e,item.selectionId)}   style={{height: '20px',width: '20px'}}></input></td> 					   
           <td className="red text-center"><a href='#'>Action</a> </td>
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
                          <th className>Selection Id </th>
                          <th className>Runner Name </th>
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
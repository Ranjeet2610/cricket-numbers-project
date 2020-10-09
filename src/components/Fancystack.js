import React, { Component } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './footer'


class FancyStack extends Component{
  constructor(props){
    super(props);
    this.state = {
      from_date:'',
      to_date:'',
      currentDate:''
    }
  }

  handleClear = () =>{
    this.setState({
      from_date:this.state.currentDate,
      to_date:this.state.currentDate,
    })
  }

  async componentDidMount(){
    let d= new Date();
    let m=d.getMonth()+1;
    let cDate = ""
    if(m<10){
      cDate = `${d.getFullYear()}-0${m}-${d.getDate()}`
    }else{
      cDate = `${d.getFullYear()}-${m}-${d.getDate()}`
    }
    await this.setState({
      currentDate:cDate
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:[event.target.value]
    })
  }

  render(){
    return (
        <div>
          <Navbar />
          <Sidebar />
        <div className="forModal" />      <div className="container body">
          <div className="main_container" id="sticky">
            <style dangerouslySetInnerHTML={{__html: "\n    .mark-back:hover{background: #4cebdc !important;}\n    .mark-lay:hover{background: #c6f6f2 !important;}\n    .mark-back{background: #7CC4F7 !important;}\n    .mark-lay{background: #FCA4B7 !important;}\n" }} />
            <div className="right_col" role="main">
              <div className="col-md-12">
                <div className="title_new_at">Fancy Stack   
                  <div className="pull-right">
                    <button type="button" className="btn_common" id="backbutton" onClick={() => {this.props.history.goBack()}}>Back</button>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="clearfix data-background">
                  <input type="hidden" name="ajaxUrl" id="ajaxUrl" defaultValue="report/fancystack" />
                  
                  <form method="get" className="form-horizontal form-label-left input_mask" id="formSubmit">
                    <input type="hidden" name="typeRE" id="typeRE" defaultValue />
                    <input type="hidden" name="parentId" id="parentId" defaultValue={145315} /> 		  
                    <div className="popup_col_2">
                      <input type="date" onChange={this.handleChange} name="from_date" defaultValue={this.state.currentDate} id="from-date" className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker" placeholder="From date" autoComplete="off" />
                    </div>
                    <div className="popup_col_2">
                      <input type="date" onChange={this.handleChange} name="to_date" defaultValue={this.state.currentDate} id="to-date" className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker" placeholder="To date" autoComplete="off" />
                    </div>
                    <div className="block_4 buttonacount">
                      <button type="button" className="blue_button" style={{marginRight:'5px'}} id="submit_form_button"><i className="fa fa-filter" /> Filter</button>
                      <button type="button" onClick={this.handleClear} className="red_button" style={{marginRight:'5px'}}><i className="fa fa-eraser" /> Clear</button>
                      <a className="blue_button" href="#">View Match Bets</a>
                    </div>
                  </form>	

                  </div>
              </div>
              <div className="col-md-12 ">
              </div>	
              <div id="divLoading"> </div>{/*Loading class */}
              <div className="col-md-12">
                <div className="custom-scroll appendAjaxTbl">
                  <table className="table table-striped jambo_table bulk_action" id="datatables">
                    <thead>
                      <tr className="headings">
                        <th className width="5%">S.No. </th>
                        <th width="70%">
                          Master						</th>
                        <th className>Total Bet</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><th colSpan={3}>No record found</th></tr>	
                    </tbody>
                  </table>
                  {
                    // <p>Showing 1 to 0 of 0 entries </p><p id="paginateClick" className="pagination-row dataTables_paginate paging_simple_numbers" />
                  }
                  </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/></div>
    )
}
}

export default FancyStack;
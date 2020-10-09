import React, { Component } from 'react'
import Navbar from './Navbar';
import Account from '../Services/account';
import Footer from './footer';

export default class Userpl extends Component {

  constructor(props){
    super(props);
    this.state = {
      data:'',
      masterData:'',
      adminData:'',
      ispl:false,
      showbetData:'',
      from_date:'',
      to_date:'',
      currentDate:''
    }
    this.account = new Account();
    this.userDetails = '';
  }

  componentDidMount(){
    this.userDetails = JSON.parse(localStorage.getItem('data'));
    if(this.userDetails.superAdmin){
      this.account.superAdminUserPL({userName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
        this.setState({
          adminData: data.data.userPL
          });
      });
    }
    else if(this.userDetails.Admin){
      this.account.adminUserPL({adminName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
        this.setState({
          masterData: data.data.userPL
          });

      }); 
    }
    else if(this.userDetails.Master){
      this.account.userPL({masterName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
        this.setState({
            data: data.data
          });
      }); 
    }
    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substr(0,10);
   this.setState({
      currentDate:date
     })   
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:[event.target.value]
    })
  }

  handleClear = () => {
    window.location.reload();
  }

render() {
     let displaydata;let i =0;
     if(this.state.data.length>0){
      displaydata = this.state.data.map((item)=>{
i++;
return (  <tr>
<td className>{i}</td>
<td className>{item.userName}</td>
<td className>{item.ProfitLoss}</td>
<td className>0.00</td>
<td className>0.00</td>
<td className>0.00</td>
<td className>{item.fancyProfitLoss}</td>
</tr>);
      });
    }
    else if(this.state.masterData.length>0){
      displaydata = this.state.masterData.map((item)=>{
i++;
return (  <tr>
<td className>{i}</td>
<td className>{item.userName} ( <b>M:</b>{item.master} )</td>
<td className>{item.ProfitLoss}</td>
<td className>0.00</td>
<td className>0.00</td>
<td className>0.00</td>
<td className>{item.fancyProfitLoss}</td>
</tr>);
      });
    }
    else if(this.state.adminData.length>0){
      displaydata = this.state.adminData.map((item)=>{
i++;
return (  <tr>
<td className>{i}</td>
<td className>{item.userName} ( <b>M:</b>{item.master} ) ( <b>A:</b>{item.admin} )</td>
<td className>{item.ProfitLoss}</td>
<td className>0.00</td>
<td className>0.00</td>
<td className>0.00</td>
<td className>{item.fancyProfitLoss}</td>
</tr>);
      });
    }
    else{
      displaydata = (<tr><th colspan="8">No record found</th></tr>);
    }
  

    return (
        <div>
          <Navbar />
        <div className="forModal" />      <div className="container body">
          <div className="main_container" id="sticky" style={{width:'100%'}}>
            <style dangerouslySetInnerHTML={{__html: "\n    .mark-back:hover{background: #4cebdc !important;}\n    .mark-lay:hover{background: #c6f6f2 !important;}\n    .mark-back{background: #7CC4F7 !important;}\n    .mark-lay{background: #FCA4B7 !important;}\n" }} />
            <div className="right_col" role="main">
              <div className="col-md-12">
                <div className="title_new_at"> User's PL 
                  <div className="pull-right">
                    <button className="btn btn-xs btn-primary" style={{paddingRight:'5px',paddingLeft:'5px', backgroundColor:'#6c1945',marginRight: '2px'}} id="backbutton" onClick={() => {this.props.history.goBack()}}>Back</button>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <input type="hidden" name="ajaxUrl" id="ajaxUrl" defaultValue="report/userpl" />
                
                <form className="form-horizontal form-label-left input_mask userpl" id="formSubmit">
                  <div className="clearfix data-background">	
                    <div className="popup_col_2">
                      <input type="date" onChange={this.handleChange} name="from_date" defaultValue={this.state.currentDate} id="from-date" className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker" placeholder="From date" autoComplete="off" />
                    </div>
                    <div className="popup_col_2">
                      <input type="date" onChange={this.handleChange} name="to_date" defaultValue={this.state.currentDate} id="to-date" className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker" placeholder="To date" autoComplete="off" />
                    </div>
                    <div className="popup_col_1">
                      <select name="filter_sport" className="form-control">
                        <option value="cricket" cricket>Cricket</option>
                        <option value="tennis">Tennis</option>
                        <option value="soccer">Soccer</option>
                        <option value="teenpatti">Teenpatti</option>
                        <option value="fancy">Fancy</option>
                      </select>
                    </div>
                    <div className="popup_col_1">
                      <select name="filter_order" className="form-control">
                        <option value="desc">Top</option>
                        <option value="asc">Bottom</option>
                      </select>
                    </div>
                    <div className="popup_col_1">
                      <select name="filter_value" className="form-control">
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                    <div className="block_2 buttonacount">
                      <button type="button" className="red_button" style={{marginRight:'5px'}} id="submit_form_button" value="filter" data-attr="submit"><i className="fa fa-filter" /> Filter</button>
                      <button type="button" className="red_button" onClick={this.handleClear}><i className="fa fa-eraser"  /> Clear</button>
                    </div>
                  </div> 
                  <div className="popup_col_12">
                    <div id="betsalltab" className="tab_bets">
                      <div className="nav nav-pills match-lists">	
                        <li><a href="javascript:void(0);" dat-attr="m">Last Month</a></li>
                        <li><a href="javascript:void(0);" dat-attr="w">Last Week</a></li>
                        <li><a href="javascript:void(0);" dat-attr="y">Yesterday</a></li>
                        <li><a href="javascript:void(0);" dat-attr="t">Today</a></li>
                        <input type="hidden" id="inputFilterDate" name="Filterdate" defaultValue="t" />
                      </div>
                    </div>		 
                  </div>	
                </form>

                <div id="divLoading"> </div>{/*Loading class */}
                <div className="custom-scroll data-background appendAjaxTbl">
                  <h5>Filter criteria : From <span className="span-from">2020-06-30 00:00:00</span> To <span className="span-to">2020-06-30 23:59:59</span>, 10 records in order of  cricket desc</h5>
                  <table className="table table-striped jambo_table bulk_action full-table-clint">
                    <thead>	
                      <tr className="headings">
                        <th width="5%">S.No.</th>				
                        <th>Username</th>
                        <th>Cricket</th>
                        <th>Tennis</th>
                        <th>Soccer</th>
                        <th>Teenpatti</th>
                        <th>Fancy</th>
                      </tr>				
                    </thead>
                    <tbody>
                    {displaydata}  
                    </tbody>
                  </table>
                  <p className="pull-left">
                  </p>
                </div>
              </div>
            </div></div></div><Footer/></div>
    )
}

}
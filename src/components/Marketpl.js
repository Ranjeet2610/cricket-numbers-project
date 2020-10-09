import React, { Component } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Account from '../Services/account';
import Footer from './footer'


export default class Marketpl extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      data:'',
      masterData:'',
      adminData:'',
      ispl:true,
      showbetData:'',
      from_date:'',
      to_date:'',
      currentDate:''
    }
    this.account = new Account();
    this.userDetails = JSON.parse(localStorage.getItem('data')) != undefined?JSON.parse(localStorage.getItem('data')):'';

  }

  componentDidMount(){
    if(this.userDetails.superAdmin){
      this.account.superAdminProfitAndLoss({userName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
        this.setState({
          adminData: data.data
          });
      });
    }
    else if(this.userDetails.Admin){
      this.account.adminProfitAndLoss({adminName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
        this.setState({
          masterData: data.data
          });
      }); 
    }
    else if(this.userDetails.Master){
      this.account.masterProfitAndLoss({masterName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
        this.setState({
            data: data.data
          });
          this.setState({
            ispl: false
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

  handleChange = (event) =>{
    this.setState({
      [event.target.name]:[event.target.value]
    })
  }

  handleClear = () =>{
    this.setState({
      from_date:this.state.currentDate,
      to_date:this.state.currentDate,
    })
  }
       
  render() {
    let displaydata; 
    if(this.state.data.length>0){
     
     displaydata = this.state.data.map((item)=>{
  return (  <tr>
  <td className>{item.data[0].createdAt}</td>
  <td className>Cricket/{item.data[0].description}/{item.data[0].marketType}/Winner:{item.data[0].selection}</td>
  <td className>{-item.ProfitLoss}</td>
  <td className>0.00</td>
  <td className>{item.ProfitLoss}</td>
  <td className>0.00</td>
  <td className>0.00</td>
  <td className>0.00</td>
  <td className>0.00</td>
  </tr>);
     });
   }
   else if(this.state.masterData.length>0){
     displaydata = this.state.masterData.map((item)=>{
  return (  <tr>
    <td className>{item.data[0].createdAt}</td>
    <td className>Cricket/{item.data[0].description}/{item.data[0].marketType}/Winner:{item.data[0].selection}</td>
    <td className>{-item.ProfitLoss}</td>
    <td className>0.00</td>
    <td className>{item.ProfitLoss}</td>
    <td className>0.00</td>
    <td className>0.00</td>
    <td className>0.00</td>
    <td className>0.00</td>
    <td className>0.00</td>
    </tr>);
     });
   }
   else if(this.state.adminData.length>0){
     displaydata = this.state.adminData.map((item)=>{
  return (  <tr>
    <td className>{item.data[0].createdAt}</td>
    <td className>Cricket/{item.data[0].description}/{item.data[0].marketType}/Winner:{item.data[0].selection}</td>
    <td className>{-item.ProfitLoss}</td>
    <td className>0.00</td>
    <td className>{item.ProfitLoss}</td>
    <td className>0.00</td>
    <td className>0.00</td>
    <td className>0.00</td>
    <td className>0.00</td>
    <td className>0.00</td>
    </tr>);
     });
   }
   else{
     displaydata = (<tr><th colspan="8">No record found</th></tr>);
   }
  

return (
        <div>
          <Navbar />
          <Sidebar />
          <div className="forModal" />      
          <div className="container body">
            <div className="main_container" id="sticky">
              <style dangerouslySetInnerHTML={{__html: "\n    .mark-back:hover{background: #4cebdc !important;}\n    .mark-lay:hover{background: #c6f6f2 !important;}\n    .mark-back{background: #7CC4F7 !important;}\n    .mark-lay{background: #FCA4B7 !important;}\n" }} />
              <div className="right_col" role="main">
              
                <div className="col-md-12">
                  <div className="title_new_at">
                    <span>Market PL</span>
                    <button style={{float:'right',paddingRight:'5px',paddingLeft:'5px', backgroundColor:'#6c1945', border:'none', borderRadius:'3px'}}
                      onClick={()=>{this.props.history.goBack()}}>Back</button>
                  </div>
                </div>
              
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="clearfix data-background">
                    <input type="hidden" name="ajaxUrl" id="ajaxUrl" defaultValue="marketpl" />
                    
                    <form className="form-horizontal form-label-left input_mask" id="formSubmit"><input type="hidden" name="compute" defaultValue="fe6602731bf3d65605f0d8f6552a1c9f" /> 		  
                      <div className="popup_col_2">
                        <input type="date" onChange={this.handleChange} name="from_date" defaultValue={this.state.currentDate} id="from-date" className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker" placeholder="From date" autoComplete="off" />
                      </div>

                      <div className="popup_col_2">
                        <input type="date" onChange={this.handleChange} name="to_date" defaultValue={this.state.currentDate}
                        id="to-date" className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker" placeholder="To date" autoComplete="off" />
                      </div>

                      <div className="block_2 buttonacount">
                        <button type="button" id="submit_form_button" className="blue_button" style={{marginRight:'5px'}} data-attr="submit"><i className="fa fa-filter" /> Filter</button>
                        <button type="button" onClick={this.handleClear} className="red_button"><i className="fa fa-eraser" /> Clear</button>
                      </div>
                    </form>	
                  </div>   
                
                  <div className>
                    <div id="divLoading"> </div>{/*Loading class */}
                    
                    <div className="custom-scroll data-background appendAjaxTbl">
                      <table className="table table-striped jambo_table bulk_action" id="Marketdatatable">
                        <thead>				
                          <tr><th className>Date </th>
                            <th className>Market </th>
                            <th className>Hyper </th>				<th className>Hyper </th>
                            <th className>Super Master </th>
                            <th className>Total </th>
                            <th className>Amount </th>
                            <th className>M-comm </th>
                            <th className>S-comm </th>
                            <th className>Net-Amount </th>			
                          </tr>
                        </thead>

                        <tbody>
                         {displaydata}	
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
    )
}
}


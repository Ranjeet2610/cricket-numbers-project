import React, { Component } from 'react'
import Navbar from './Navbar';
import Account from '../Services/account';
import Footer from './footer'


export default class Clientpl extends Component {
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
      this.account.superAdminUserPL({userName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
        this.setState({
          adminData: data.data.adminPL
          });
          this.setState({
            ispl: false
          });

      });
    }
    else if(this.userDetails.Admin){
      this.account.adminUserPL({adminName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
        this.setState({
          masterData: data.data.masterPL
          });
          this.setState({
            ispl: false
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
masterData(data){
 
  this.account.userPL({masterName:data},data=>{
    this.setState({
        data: data.data
      });
      this.setState({
        ispl: true
      });

  }); 
    }

 adminData(data){
      
      this.account.adminUserPL({adminName:data},data=>{
        this.setState({
          masterData: data.data.masterPL
          });
    
      }); 
        }

  handleChange = (event) => {
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
    let displaydata;let i =0;
    if(this.state.data.length>0){
      displaydata = this.state.data.map((item)=>{
        i++;
        return ( <tr>
        <td className>{i}</td>
        <td className>{item.userName}</td>
        <td className style={{cursor:'pointer'},{color:'green'}}  >{item.ProfitLoss}({item.ProfitLoss})</td>
        <td className>0.00(0)</td>
        <td className>0.00(0)</td>
        <td className>0.00(0)</td>
        <td className>{item.ProfitLoss}({item.ProfitLoss})</td>
        <td className>0.00(0)</td>
        <td className>0.00(0)</td>
        <td className>0.00(0)</td>
        </tr>);
           });
         }
         else if(this.state.masterData.length>0){
           displaydata = this.state.masterData.map((item)=>{
        i++;
        return (  <tr>
         <td className>{i}</td>
        <td className><a style={{cursor:'pointer'}}  onClick={()=>this.masterData(item.master)}>{item.master}</a></td>
        <td className>0.00({item.profitLoss})</td>
        <td className>0.00</td>
        <td className>0.00</td>
        <td className>0.00</td>
        <td className>{item.profitLoss}</td>
        <td className>0.00</td>
        <td className>0.00</td>
        <td className>0.00</td>
        
        </tr>);
           });
         }
         else if(this.state.adminData.length>0){
           displaydata = this.state.adminData.map((item)=>{
        i++;
        return (  <tr>
        <td className><a style={{cursor:'pointer'}} onClick={()=>this.adminData(item.admin)}>{item.admin}</a></td>
        <td className>{-item.profitLoss}</td>
        <td className>0.00</td>
        <td className>0.00</td>
        <td className>0.00</td>
        <td className>0.00</td>
        <td className>0.00</td>
        <td className>0.00</td>
        <td className>0.00</td>
        <td className>{item.profitLoss}</td>
        
        </tr>);
           });
         }
         else{
           displaydata = (<tr><th colspan="8">No record found</th></tr>);
         }
        

  return (
        <div>
          <Navbar />
        <div className="forModal" />      
        <div className="container body">
          <div className="main_container" id="sticky" style={{width:'100%'}}>
            <style dangerouslySetInnerHTML={{__html: "\n    .mark-back:hover{background: #4cebdc !important;}\n    .mark-lay:hover{background: #c6f6f2 !important;}\n    .mark-back{background: #7CC4F7 !important;}\n    .mark-lay{background: #FCA4B7 !important;}\n" }} />
            <div className="right_col" role="main">
              <div className="col-md-12">
                <div className="title_new_at">  	
                  <span>Sports PL</span>
                  <button style={{float:'right',paddingRight:'5px',paddingLeft:'5px', backgroundColor:'#6c1945', border:'none', borderRadius:'3px'}}
                  onClick={()=>{this.props.history.goBack()}}>Back</button>			
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="clearfix data-background">
                  <input type="hidden" name="ajaxUrl" id="ajaxUrl" defaultValue="sportpl" />
                  
                  <form className="form-horizontal form-label-left input_mask" id="formSubmit">
                    <input type="hidden" name="user_id" id="user_id" defaultValue />
                    
                    <div className="popup_col_2">
                      <input type="date" onChange={this.handleChange} name="from_date" defaultValue={this.state.currentDate} id="from-date" className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker" placeholder="From date" autoComplete="off" />
                    </div>
                    
                    <div className="popup_col_2">
                      <input type="date" onChange={this.handleChange} name="to_date" defaultValue={this.state.currentDate} id="to-date" className="form-control col-md-7 col-xs-12 has-feedback-left datetimepicker" placeholder="To date" autoComplete="off" />
                    </div>
                    
                    <div className="block_2 buttonacount">
                      <button type="button" id="submit_form_button" style={{marginRight:'5px'}} className="blue_button"><i className="fa fa-filter" /> Filter</button>
                      <button type="button" className="red_button" onChange={this.handleClear}><i className="fa fa-eraser"/>Clear</button>
{                      //<a href="javascript:void(0);" id="backbutton" className="red_button pull-right"><i className="fa fa-eraser" /> Back</a>
}                    </div>
                  </form>

                </div>  
                <div className>
                  <div id="divLoading"> </div>{/*Loading class */}
                  <div className="custom-scroll data-background appendAjaxTbl">
                   {
                      // <h5>Filter criteria : From 2020-06-30 00:00:00 To 2020-06-30 23:59:59</h5>
                    }
                    <table className="table table-striped jambo_table bulk_action full-table-clint" id="datatable">
                      <thead>	
                        <tr className="headings">	
                          <th width="2%">S.No.</th>		
                          {this.state.ispl?(<th className>Dealer</th>): <th>Master</th>}	
                          <th>Cricket</th>
                          <th>Tennis</th>
                          <th>Soccer</th>
                          <th>Fancy</th>
                          <th>Total Userpl</th>
                          <th>Live Teenpatti</th>
                          <th>Casino</th>
                          <th>Live Game</th>
                        </tr>				
                      </thead>
                      <tbody>
                      {displaydata}
                      </tbody>
                    </table>
                    <div className="col-md-12" id="data-pagination" />
                  </div>
                </div>
              </div>
            </div></div></div>
            <Footer/></div>
    )
}
}

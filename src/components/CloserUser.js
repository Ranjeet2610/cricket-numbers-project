import React, { Component } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Users from '../Services/users';
import Footer from './footer'

export default class CloseUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',

    };
    this.users =new Users();
    this.userDetails = JSON.parse(localStorage.getItem('data'))!=undefined?JSON.parse(localStorage.getItem('data')):'';
  }
  componentDidMount() {
    if(this.userDetails.superAdmin){
    this.users.getCloseUser('getBlockAdmins',data=>{    
      this.setState({
          data: data.data
        })
    })
  }
  else if(this.userDetails.Admin){
    this.users.getclosemasterforAdmin({adminName:this.userDetails.userName},data=>{
      this.setState({
        data: data.data
      }) 
    })
  }
  else{
   this.getclosusersforMaster(this.userDetails.userName)
  }
  }
  getclosusersforMaster(mName){
    this.users.getclosusersforMaster({masterName:mName},data=>{
      this.setState({
        data: data.data
      }) 
    })
  }
  closeAdminuser(e){
    this.removeActiveClass();
    e.target.parentElement.classList.add('active')
    this.users.getCloseUser('getBlockAdmins',data=>{    
      this.setState({
          data: data.data
        })
    }) 
  }
  closemaster(e){
    this.removeActiveClass();
    e.target.parentElement.classList.add('active')
    this.users.getCloseUser('getBlockMasters',data=>{    
      this.setState({
          data: data.data
        })
    }) 
  }
  closeuser(e){
    this.removeActiveClass();
    e.target.parentElement.classList.add('active')
    this.users.getCloseUser('getBlockUsers',data=>{    
      this.setState({
          data: data.data
        })
    }) 
  }

removeActiveClass(){
  var activeclass = document.querySelectorAll('#betsalltab li');
    for (var i = 0; i < activeclass.length; i++) {
     activeclass[i].classList.remove('active');
    }
}
lock_unlock_user(username){
  if (window.confirm("Would you like to open user account?")) {
    this.users.openUser({userName:username},data=>{    
     window.location.reload();
    })
  } else {
    //txt = "You pressed Cancel!";
  }
}
  render(){ 
    let userData;let usercheck;
    if(this.userDetails.superAdmin){
      usercheck = (<ul id="betsalltab" className="nav nav-pills"><li className="active">
      <a onClick={(e)=>this.closeAdminuser(e)}>Super Master</a>
    </li>
      <li>
      <a onClick={(e)=>this.closemaster(e)}>Master</a>
    </li>
    <li className>
      <a onClick={(e)=>this.closeuser(e)}>Users</a>
    </li></ul>);
    }
    else if(this.userDetails.Admin){
      usercheck = (<ul id="betsalltab" className="nav nav-pills">  <li className="active">
      <a>Master</a>
    </li>
    </ul>);
    }
    else if(this.userDetails.Master){
      usercheck = (<ul id="betsalltab" className="nav nav-pills">
    <li className="active">
      <a>Users</a>
    </li></ul>);
    }
    if(this.state.data.length>0){
      userData = this.state.data.map((item)=>{
        let checkuser ;
         if(item.Master){
          checkuser  = (<a style ={{cursor:'pointer'}} onClick ={()=>this.getclosusersforMaster(item.userName)}>  {item.userName}</a>);
        }
        else{
          checkuser = (item.userName);
        }
        return (   <tr id="user_row_155245">
        <td>1                              <input type="checkbox" value="155245" class="select-users"/>
        </td>
        <td class=" " >
           <span class="m-bg">
       {checkuser}                          </span>
        </td>
        <td>Betfun360</td>
      <td>aarav</td><td>Bablu</td><td>{item.master}</td>                           <td class=" ">0 </td>
        <td class=" ">0 </td>
        <td class=" "><a class="btn btn-success btn-xs" href=" http://park9.bet/report/openbethistory?user_id=155245&amp;Usertype=4"> 0.00</a>
        </td>
        <td class=" ">0 </td>
        <td class=" ">0.00</td>                     <td>
     <a href="javascript:;" title="Open user Account" onClick={()=>this.lock_unlock_user(item.userName)}>Open </a>
  </td>
        <td class="last">
           <div class="deskaction">
                                               <a class="btn btn-success btn-xs" href=" http://park9.bet/CacStatement/155245">
              <span>S</span> </a>
              <a class="btn btn-primary btn-xs" href=" http://park9.bet/report/profitloss?user_id=155245">
              <span> PL </span> </a>
                
              <a class="btn btn-warning btn-xs" href="javascript:;" title="View Account Info" onclick="view_account('155245');"><span>I</span></a>
                 
                                               <a class="btn btn-danger btn-xs" href="javascript:;" title="Change Password" onclick="view_change_passs('155245');"><span>P</span></a>
              <a class="btn btn-warning btn-xs" href="javascript:;" title="Free Chip In Out" onclick="free_chips_in_out('155245','D');"><span>D</span></a>
              <a class="btn btn-warning btn-xs" href="javascript:;" title="Free Chip In Out" onclick="free_chips_in_out('155245','W');"><span>W</span></a>
           </div>
           <div class="topnav" id="myTopnav" style={{display:'none'}}>
                                               <a href=" http://park9.bet/CacStatement/155245">
              <span>Statement</span> </a>
              <a href=" http://park9.bet/report/profitloss?user_id=155245">
              <span> Profit Loss</span> </a>
              <a href="javascript:;" title="View Account Info" onclick="view_account('155245');"><span class="">View Info</span></a>
               
              <a href="javascript:;" title="Change Password" onclick="view_change_passs('155245');"><span class="">Change Password</span></a>
              <a href="javascript:;" title="Free Chip In" onclick="free_chips_in_out('155245','D');"><span class="">Free Chips in </span></a>
              <a href="javascript:;" title="Free Chip Out" onclick="free_chips_in_out('155245','W');"><span class="">Free Chips Out </span></a>
           </div>
           <span class="icon-mobile">☰</span>
        </td>
                                </tr>)
      })
    }
    return (
        <div>
          <Navbar />
   
        <div className="forModal" />      <div className="container body">
          <div className="main_container" id="sticky" style={{width:'100%'}}>
            <div className="ajax-call-hide">
              <style dangerouslySetInnerHTML={{__html: "\n      .mod-header {background: #2a3f54;color: white;}\n      .close_new {color: #fff;}\n      #addUserMsg {text-align: center;}\n      .modal-content {background: #fff;}\n      .errmsg {text-align: center;color: red;}\n      .succmsg {text-align: center;color: green;}\n      .btn_new {padding: 0;display: inline-block;min-width: 40px;text-align: center;color: #000000;font-weight: bold;}\n      .green {background: #629632;color: #ffffff;padding: 0 3% !important;}\n      .red {background: #F08080;color: #ffffff;padding: 0 3% !important;}\n      .blue {background: #0198E1;}\n      .orange {background: red;}\n      .black {background: #323232;}\n      .last a:last-child span.btn_new {border-right: 1px solid #ddd;}\n      tr.red {background: #F08080 !important;color: #000000 !important;}\n      tr.redother {background: #e74c3c !important;}\n      .table-striped > tbody > tr > td {border-left: 1px solid #ddd;}\n      .lastdetail span.btn_new {padding: 5px 5px;margin: 1% 0;width: auto !important;}\n      .deskaction a span {display: inline-block;text-align: center;padding: 0;border-right: 1px solid #dddddd;width: 25px;}\n      .headings th.deskaction {padding-left: 0px;}\n      .headings th span {text-align: center;padding: 0;width: 26px;display: inline-block;}\n      .mobaction {display: none;}\n      .lastdetail {background: #ffffff;float: left;width: 100%;}\n      .table > thead > tr > th {vertical-align: bottom;border-bottom: 0px solid #ddd;}\n      span.width1 {width: 70px !important;display: inline-block !important;padding: 0px !important;}\n      span.detailinfo {padding: 10px;display: inline-block;}\n   " }} />
            </div>
            <div id="userModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                </div>
              </div>
            </div>
            <div className="right_col" role="main">
              <div className="col-md-12">
                <div className="title_new_at">
                  Closed Users
                  <form className="usersech user-mobile" id="userListForm">
                    <input type="hidden" name="formSubmit" defaultValue={1} />
                    <input type="hidden" name="perpage" id="perpage" defaultValue />
                    <input type="text" name="mstruserid" id="mstruserid" placeholder="Search here" defaultValue />
                    <button className="fa fa-search" />
                  </form>
                </div>
              </div>
              <div className="clearfix" />
              <div className="row">
                <div className="popup_col_6">
                  <div className="tab_bets get-mchlist">
                    {usercheck}
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="x_panel userwidth1">
                    <div className="row detailtop deskaction" style={{margin: '0px'}}>
                      <div className="lastdetail">
                        <span className="detailinfo"><b>Se</b> : Close settlement</span>
                        <span className="detailinfo"><b>S</b> : Statement</span>
                        <span className="detailinfo"><b>PL</b> : Profit Loss</span>
                        <span className="detailinfo"><b>I</b> : View Info</span>
                        <span className="detailinfo"><b>P-R</b> : Partnerhsip</span>
                        <span className="detailinfo"><b>P</b> : Change Password</span>
                        <span className="detailinfo"><b>D-W</b> : Free Chip In Out</span>
                        <span className="detailinfo"><b>C</b> : Close Account</span>
                      </div>
                    </div>
                    <div id="divLoading" />
                    {/*Loading class */}
                    <div className="x_content">
                      <div className id="contentreplace">
                        <table className="table table-striped jambo_table bulk_action" id="datatabless">
                          <thead>
                            <tr className="headings">
                              <th>S.No.</th>
                              <th>User ID</th>
                              <th>Website</th>
                              <th>Credit Limit</th><th>Credit given</th><th> Hyper</th><th>Super Master</th>                           <th>Balance <a href="#" className="glyphicon glyphicon-arrow-up"> </a>
                                <a href="#" className="glyphicon glyphicon-arrow-down" />
                              </th>
                              <th>Partnership <a href="#" className="glyphicon glyphicon-arrow-up"> </a>
                                <a href="#" className="glyphicon glyphicon-arrow-down" />
                              </th>
                              <th>M.comm</th> <th>S.comm</th>                          <td />
                             
                              <th className="deskaction">
                                <span>A</span>                              <span>S</span>
                                <span>PL</span>
                                <span>I</span>
                                <span>P-R</span>
                                <span>P</span>
                                <span>D-W</span>
                              </th>
                            
                              <th className="mobaction">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {userData}
                                             </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="lockunlockModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="popup_form">
                    <div className="title_popup">
                      <span> User Setting</span> 
                      <button type="button" className="close" data-dismiss="modal">
                        <div className="close_new"><i className="fa fa-times-circle" /> </div>
                      </button>
                    </div>
                    <div className="content_popup">
                      <div className="popup_form_row">
                        <div className="popup_col_12">
                          <label className="col-sm-12 control-label m-t-xs">
                            <p />
                          </label>
                          <input type="hidden" id="updUserSerial" />
                          <input type="hidden" id="updUserVal" />
                          <input type="hidden" id="updUserType" />
                        </div>
                        <div className="popup_col_12">
                          <button type="button" className="blue_button" onclick="updateUserSett()">Yes</button>
                          <button type="button" className="red_button" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></div><Footer/></div>
    )
}
  }

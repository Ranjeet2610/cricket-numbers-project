import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import  mainLogo from '../betfun-logo.png';
import Users from '../Services/users';
import Modal from 'react-bootstrap/Modal'


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password:'',
      newpassword :'',
      Renewpassword:'',
      addFunds:0,
      show:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.savePass = this.savePass.bind(this);
    this.addFundsToSuperMaster = this.addFundsToSuperMaster.bind(this);
    this.users =new Users();
    this.userDetails = JSON.parse(localStorage.getItem('data')) != undefined ? JSON.parse(localStorage.getItem('data')) : "";  
   if(window.screen.width > 768){    
      this.menduDisplay = 'block';  
   }
   else{
    this.menduDisplay = 'none'
   }
}

handleShow = () => {
  this.setState({
    show:true
  })
  console.log("show",this.state.show)
}

handleClose = () => {
  this.setState({
    show:false
  })
  console.log(this.state.show)
}

handleChange(event){
  this.setState({
      [event.target.name] : event.target.value
  });

}


resetForm(){
  this.setState({
    old_password:'',
    newpassword :'',
    Renewpassword:''
});
}

savePass(){
  if(this.state.old_password &&  this.state.newpassword && this.state.Renewpassword){
  this.users.updatePassword({userName:JSON.parse(localStorage.getItem('data')).userName,oldPassword:this.state.old_password,newPassword:this.state.Renewpassword},data=>{ 
    this.setState({
      old_password:'',
      newpassword :'',
      Renewpassword:''
  });
  alert(data.data.message);
});
  }
}

addFundsToSuperMaster(){
  console.log(this.state.addFunds);
}

  openNav(){
      document.getElementById("lefttSidenav").style.width = "250px";
  }

  closeNav() {
      document.getElementById("lefttSidenav").style.width = "0";
    }

	logout(){
		localStorage.clear();
		window.location.href ='/';
  }

  closePasswordpopup(){
    document.getElementById('passwordpopup').style.display = 'none';
    document.getElementById('passwordpopup').classList.remove("in");
  }

  closeAddFunds(){
    document.getElementById('addFundsModal').style.display = 'none';
    document.getElementById('addFundsModal').classList.remove("in");
  }
  closeAddNews(){
    document.getElementById('addNewsModal').style.display = 'none';
    document.getElementById('addNewsModal').classList.remove("in");
  }

view_change_passs(){
  document.getElementById('passwordpopup').classList.add("in");
  document.getElementById('passwordpopup').style.display = 'block';
}

view_add_funds(){
  document.getElementById('addFundsModal').classList.add("in");
  document.getElementById('addFundsModal').style.display = 'block';
}
view_add_news(){
  document.getElementById('addNewsModal').classList.add("in");
  document.getElementById('addNewsModal').style.display = 'block';
}

componentDidMount(){
  if(localStorage.getItem('data') !=undefined){
    this.userDetails = JSON.parse(localStorage.getItem('data'));    
  }
  else{
    localStorage.clear();
		window.location.href ='/'; 
  }
}
showchildMenu(e){
  if ( e.target.nextElementSibling.style.display == "none") {
      e.target.nextElementSibling.style.display = 'block';
      e.target.classList.add('submenu-opened');
  } else {
    e.target.nextElementSibling.style.display = 'none';
    e.target.classList.remove('submenu-opened');
  }
}
  render() {
   
    let cond =''; 
    let report ='';
    let blockmarket ='';
    let userName = this.userDetails.userName;
    let balance = this.userDetails.walletBalance;
    // = parseInt(this.userDetails.exposure!=null?this.userDetails.exposure:"0".match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    let exposure = JSON.parse(localStorage.getItem('expo'));
   // console.log(JSON.parse(localStorage.getItem('expo')));
    if(this.userDetails.superAdmin){
      cond = (
        <li className="has-sub">
          <Link to="#"><i className="fa fa-users" /> User </Link>
          <span class="submenu-button" onClick={(e)=>this.showchildMenu(e)}></span>
          <ul style={{display: this.menduDisplay}}>
            <li>
              <Link to="/supermaster">Super Master</Link>
            </li> 
            <li>
              <Link to="/master"> Master</Link> 
            </li>
            <li>
              <Link to="/user"> Users</Link>
            </li>
            <li>
              <Link to="/closeuser"> Close Users</Link>
            </li>
          </ul>
        </li>
      );

  report = ( 
    <li>
      <Link to="#">Report</Link>
      <span class="submenu-button" onClick={(e)=>this.showchildMenu(e)}></span>
      <ul style={{display: this.menduDisplay}}>
        <li>
          <Link to="/acinfo">Account Info </Link> 
        </li>
        <li>
          <Link to="/cacstatement">Account Statement </Link> 
        </li>
        <li>
          <Link to="/chipsummary">Chip Summary </Link> 
        </li>
        <li>
          <Link to="/liveevents">Live Events </Link> 
        </li>
        <li>
          <Link to="/clientpl">Client P L</Link> 
        </li>
        <li>
          <Link to="/marketpl">Market P L</Link> 
        </li>
        <li>
          <Link to="/sportspl">Sport P L</Link> 
        </li>
        <li>
          <Link to="/userpl">User P L</Link> 
        </li>
        <li>
          <Link to="/profitloss">Profit &amp; Loss</Link> 
        </li>
        <li>
          <Link to="/bethistory">Bet History</Link> 
        </li>
        {/* <li>
          <Link to="/livegame">Livegame Bet History</Link> 
        </li> */}
        <li>
          <Link to="/fancystack">Fancy Stack</Link> 
        </li>
        <li> 
          <Link onClick={()=>this.view_add_funds()}>Add Funds</Link>
        </li>
        <li> 
          <Link onClick={()=>this.view_add_news()}>Add News</Link>
        </li>
      </ul>
    </li>
  );

  blockmarket = ( 
    <li>
      <Link to="/blockmarket">Block Market</Link>
    </li>
  )
}
    
  else if(this.userDetails.Admin){
    cond = (
      <li className="has-sub">
        <Link to="#"><i className="fa fa-users" /> User </Link>
        <span class="submenu-button" onClick={(e)=>this.showchildMenu(e)}></span>
        <ul style={{display: this.menduDisplay}}>
          <li>
            <Link to="/master"> Master</Link> 
          </li>
          <li>
            <Link to="/user"> Users</Link>
          </li>
          <li>
            <Link to="/closeuser"> Close Users</Link>
          </li>
        </ul>
      </li>
    );

  report = ( 
    <li>
      <Link to="#">Report</Link>
      <span class="submenu-button" onClick={(e)=>this.showchildMenu(e)}></span>
      <ul style={{display: this.menduDisplay}}>
        <li>
          <Link to="/acinfo">Account Info </Link>
        </li>
        <li>
          <Link to="/cacstatement">Account Statement </Link>
        </li>
        <li>
          <Link to="/chipsummary">Chip Summary </Link>
        </li>
        <li>
          <Link to="/clientpl">Client P L</Link>
        </li>
        <li>
          <Link to="/marketpl">Market P L</Link>
        </li>
        <li>
          <Link to="/sportspl">Sport P L</Link>
        </li>
        <li>
          <Link to="/userpl">User P L</Link>
        </li>
        <li>
          <Link to="/profitloss">Profit &amp; Loss</Link>
        </li>
        <li>
          <Link to="/bethistory">Bet History</Link>
        </li>
        {/* <li>
          <Link to="/livegame">Livegame Bet History</Link>
        </li> */}
        <li>
          <Link to="/fancystack">Fancy Stack</Link>
        </li>
      </ul>
    </li>
  );

  blockmarket = ( 
    <li>
      <Link to="/blockmarket">Block Market</Link>
    </li>)
}
    
  else if(this.userDetails.Master){
    cond = (
      <li className="has-sub">
        <Link to="#"><i className="fa fa-users" /> User </Link>
        <span class="submenu-button" onClick={(e)=>this.showchildMenu(e)}></span>
        <ul style={{display: this.menduDisplay}}>
          <li>
            <Link to="/user"> Users</Link>
          </li>
          <li>
            <Link to="/closeuser"> Close Users</Link>
          </li>
        </ul>
      </li>
    );

  report =( 
    <li>
      <Link to="#">Report</Link>
      <span class="submenu-button" onClick={(e)=>this.showchildMenu(e)}></span>
      <ul style={{display: this.menduDisplay}}>
        <li>
          <Link to="/acinfo">Account Info </Link>
        </li>
        <li>
          <Link to="/cacstatement">Account Statement </Link>
        </li>
        <li>
          <Link to="/chipsummary">Chip Summary </Link>
        </li>
        <li>
          <Link to="/clientpl">Client P L</Link>
        </li>
        <li>
          <Link to="/marketpl">Market P L</Link>
        </li>
        <li>
          <Link to="/sportspl">Sport P L</Link>
        </li>
        <li>
          <Link to="/userpl">User P L</Link>
        </li>
        <li>
          <Link to="/profitloss">Profit &amp; Loss</Link>
        </li>
        <li>
          <Link to="/bethistory">Bet History</Link>
        </li>
        {/* <li>
          <Link to="/livegame">Livegame Bet History</Link>
        </li> */}
        <li>
          <Link to="/fancystack">Fancy Stack</Link>
        </li>
      </ul>
    </li>
  );

  blockmarket =( 
    <li>
      <Link to="/blockmarket">Block Market</Link>
    </li>)
  }
      
  else{
    report = ( 
      <li>
        <Link to="#">Report</Link>
        <span class="submenu-button" onClick={(e)=>this.showchildMenu(e)}></span>
        <ul style={{display: this.menduDisplay}}>
          <li>
            <Link to="/acinfo">Account Info </Link>
          </li>
          <li>
            <Link to="/cacstatement">Account Statement </Link> 
          </li>            
          <li>
            <Link to="/profitloss">Profit &amp; Loss</Link> 
          </li>
          <li>
            <Link to="/bethistory">Bet History</Link> 
          </li>
          {/* <li>
            <Link to="/livegame">Livegame Bet History</Link> 
          </li> */}
        </ul>
      </li>
    )
  }
      
  if (window.location.pathname === '/') {
    return null;
  }
    
  return  (
    <div className="header-section">
          <div className="top_nav">
            <div className="righttogal righttogalhide">
              <span style={{cursor: 'pointer'}} onClick={this.openNav}>☰ </span>
            </div>
            <div className="nav_menu">
              <nav className role="navigation">
                <div className="nav_title">
                  <Link to="/dashboard" className="site_title endcooki"> 
                         <img  src={mainLogo} alt="fireSpot"/>
                  </Link>
                </div>
                {/*top navigation */}
                <div id="lefttSidenav" className="left_col  sidenav">
                  <a  className="closebtn righttogalhide" onClick={this.closeNav}>×</a> 
                  <div className="left_col scroll-view">
                    <div className="clearfix" />
                    <nav id="cssmenu">
                      {/*<div className="button"></div>*/}
                      <ul className="nav">
                        <li className="hidden-xs">
                          <Link className="endcooki" to="/dashboard"><i className="fa fa-home hidden-xs" /></Link>
                        </li>
                   
                        { cond }
                            
                        {blockmarket}
                        
                        <li><Link to="#">Favorite</Link></li>
                        <li><Link to="#">My Market</Link></li>
                        
                        {report}
                      </ul>
                    </nav>
                  </div>
                  {/*sidebar menu */}
                </div>

                <div className="nav navbar-nav navbar-right">
                  <ul>
                    <li className="belance-top">
                      <Link id="Wallet">Main: <span className="mWallet">{balance}</span></Link>
                      <Link id="UserLiability">Exposure: <span className="liability">{exposure}</span></Link>
                      
                      <Link  className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-user-circle-o" />&nbsp;
                        {userName}
                        <span className=" fa fa-angle-down" />
                      </Link>
                      <ul className="dropdown-menu dropdown-usermenu">
                        <li>
                          <Link onClick={()=>this.view_change_passs()}>Change Password</Link> 
                        </li>
                        <li className="dropdown-footer">
                          <Link className="endcooki" onClick={this.logout}>Log Out</Link> 
                        </li>
                      </ul>

                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          
          <div className="marquee">
            <marquee><i className="fa fa-bell-o" />  Dear user, agar koi bhi user 1 min me bar bar khai-lagai(cheating) karta paya gya to uska soda valid nhi mana jayega...  <i className="fa fa-bell-o" /></marquee>
          </div>


          <div  id="passwordpopup" className="modal fade" role="dialog">
            <div className=" " id="changeUserPassword" role="main">
              <div className="modal-dialog">
                <div className="modal-content">   	
                  <div className="modal-header">
                    <button type="button" className="close" onClick={this.closePasswordpopup} data-dismiss="modal">×</button>
                    <h4 className="modal-title">Change Password</h4>
                  </div>
                  <div className="modal-body">
                    <div id="PassUserMsg"></div>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <form  className="form-horizontal form-label-left" method="post" accept-charset="utf-8">
                          <input type="hidden"  name="compute" value="b507c08cbda82ed93f147c8e3af45214"/>
                          <div className="item form-group">
                            <label className="control-label col-md-3 col-sm-3 col-xs-12" for="firstname">Old Password <span className="required">*</span></label>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input type="password" name="old_password" value={this.state.old_password} className="form-control col-md-7 col-xs-12" placeholder="Old Password" label="" onChange={this.handleChange} required="required" autocomplete="off"/>
                            </div>
                          </div> 
                          <div className="item form-group">
                            <label className="control-label col-md-3 col-sm-3 col-xs-12"  for="firstname">New Password <span className="required">*</span></label>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input type="password" name="newpassword" value={this.state.newpassword} className="form-control col-md-7 col-xs-12" placeholder="New Password" label="" onChange={this.handleChange} required="required" autocomplete="off"/>
                            </div>
                          </div>
      
                          <div className="item form-group">
                            <label className="control-label col-md-3 col-sm-3 col-xs-12" required for="firstname">Retype New Password <span className="required">*</span></label>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input type="password" name="Renewpassword" value={this.state.Renewpassword} className="form-control col-md-7 col-xs-12" placeholder="Retype Password" label="" onChange={this.handleChange} required="required" autocomplete="off"/>
                            </div>
                          </div> 
                      
                          <div className="ln_solid"></div>
                                
                          <div className="form-group">
                            <div className="col-md-6 col-md-offset-3">
                              <button type="reset" style={{marginTop:"5px", marginRight:"5px"}} className="btn btn-primary" onClick={this.resetForm}>Reset</button>
                              <button type="button" style={{marginTop:"5px", marginLeft:"5px"}} className="btn btn-success" onClick={this.savePass}>Submit</button>
                            </div>
                          </div>
                        </form>    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div className="modal fade" id="addFundsModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addFundsLabel">Add Funds</h5>
                  <button type="button" className="close" onClick={this.closeAddFunds}>
                    <span aria-hidden="true">×</span>
                  </button>
                  </div>
                  <div class="modal-body">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <form  className="form-horizontal form-label-left" method="post" accept-charset="utf-8">
                          <div className="item form-group">
                            <label className="control-label col-md-3 col-sm-3 col-xs-12">Current Balance</label>
                            <div className="add-funds-dialog-current-amount">{balance}</div>
                          </div>
                          <div className="item form-group">
                            <label className="control-label col-md-3 col-sm-3 col-xs-12" for="amount">Amount<span className="required">*</span></label>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" name="addFunds" value={this.state.addFunds} className="form-control col-md-7 col-xs-12" onChange={this.handleChange} placeholder="Amount" label=""  required="required" autocomplete="off"/>
                            </div>
                          </div>
                          <div className="item form-group">
                            <label className="control-label col-md-3 col-sm-3 col-xs-12">Total Balance</label>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" name="addFunds" value={balance+Number(this.state.addFunds)} disabled className="form-control col-md-7 col-xs-12" onChange={this.handleChange} placeholder="Amount" label=""  required="required" autocomplete="off"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="col-md-6 col-md-offset-3">
                              <button type="button" style={{marginTop:"5px", marginLeft:"5px"}} className="btn btn-success" onClick={this.addFundsToSuperMaster}>Save</button>
                              <button type="button" style={{marginTop:"5px", marginLeft:"5px"}} className="btn btn-primary" onClick={this.closeAddFunds}>Cancel</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal fade" id="addNewsModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addNewsLabel">Add News</h5>
                  <button type="button" className="close" onClick={this.closeAddNews}>
                    <span aria-hidden="true">×</span>
                  </button>
                  </div>
                  <div class="modal-body">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <form  className="form-horizontal form-label-left" method="post" accept-charset="utf-8">
                          <div className="item form-group">
                            <label className="control-label col-md-3 col-sm-3 col-xs-12" for="news">News:<span className="required">*</span></label>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <input type="text" name="addNews" value='' className="form-control col-md-7 col-xs-12" placeholder="News" label=""  required="required" autocomplete="off"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="col-md-6 col-md-offset-3">
                              <button type="button" style={{marginTop:"5px", marginLeft:"5px"}} className="btn btn-success">Save</button>
                              <button type="button" style={{marginTop:"5px", marginLeft:"5px"}} className="btn btn-primary" onClick={this.closeAddNews}>Cancel</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>         
          </div>          
        //   <div
        //   id="chipdeposit"
        //   class="modal fade in"
        //   role="dialog"
        //   style={{ display: "none" }}
        // >
        //   <div class=" " id="changeUserPassword" role="main">
        //     <div class="modal-dialog modal-lg">
        //       <div class="modal-content">
        //         <div class="modal-header">
        //           <button
        //             type="button"
        //             class="close"
        //             data-dismiss="modal"
        //           >
        //             ×
        //           </button>
        //           <h4 class="modal-title">
        //             <span id="tital_change">
        //               Add Balance
        //             </span>{" "}
        //           </h4>
        //         </div>

        //         <div class="modal-body">
        //           <div class="row">
        //             <div id="UpdateChipsMsg"></div>
        //             <form id="UpdateFreeChips" method="post">
        //               <span id="msg_error"></span>
        //               <span id="errmsg"></span>
        //               <div class="col-md-6">
        //                 <label> Free Chips : </label>
        //                 <input
        //                   type="text"
        //                   name="Chips"
        //                   class="form-control"
        //                   required=""
        //                 />
        //                 <span id="ChipsN" class="errmsg"></span>
        //               </div>

        //               <div class="col-md-12">
        //                 <div class="tabel_content ">
        //                   <table class="table-bordered">
        //                     <tbody>
        //                       <tr>
        //                         <td>Parant Free Chips</td>
        //                         <td class="font-bold">
        //                         </td>
        //                       </tr>

        //                       <tr>
        //                         <td>User Balance </td>
        //                         <td class="font-bold">
        //                         </td>
        //                       </tr>
        //                       <tr>
        //                         <td>Parant New Free Chips</td>
        //                         <td>
        //                           <span id="ParantNewFreeChips">
        //                           </span>{" "}
        //                         </td>
        //                       </tr>
        //                       <tr>
        //                         <td>
        //                         New Free Chips</td>
        //                         <td>
        //                           <span id="myNewFreeChips">
                                   
        //                           </span>{" "}
        //                         </td>
        //                       </tr>
        //                     </tbody>
        //                   </table>
        //                 </div>
        //               </div>
        //               <div class="col-md-12 modal-footer">
        //                 <button
        //                   type="button"
        //                   class="btn btn-success pull-right chip-inout-button"
        //                 >
        //                   Deposit
        //                 </button>
        //               </div>
        //             </form>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
)}}
export default Navbar;
import React, { Component } from "react";
import { createStore } from "redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Utilities from "./utilities";
import Users from "../Services/users";
import { Button } from "react-bootstrap";
import Footer from './footer'

export default class Master extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      name: "",
      userName: "",
      password: "",
      master: "",
      walletBalance: 0,
      parentwalletBalance: 0,
      masterUName: "",
      redirectToReferrer: false,
      changpassPopup: "none",
      username: "",
      mName: "",
      userdetails: "",
      useraction: "",
      newParentChip: "",
      newCurrChip: "",
      isDeposit: false,
      Chips: "",
      userInfo: "",
      Name: "",
      max_stake: "",
      min_stake: "",
      max_profit: "",
      max_loss: "",
      PIP: "",
      PIS: "",
      min_odds: "",
      max_odds: "",
      searchFilter: [],
      totalBalance: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.currentDate = Utilities.formatDate(new Date());
    this.updatePass = this.updatePass.bind(this);
    this.setAction = this.setAction.bind(this);
    this.update_free_chips = this.update_free_chips.bind(this);
    this.closechipDepositpopup = this.closechipDepositpopup.bind(this);
    this.closechipWithdrawalpopup = this.closechipWithdrawalpopup.bind(this);
    this.users = new Users();
  }

  addUser(name) {
    this.setState({
      masterUName: name,
    });
  }
  componentDidMount() {
    if (
      this.props.match.params.username != undefined ||
      JSON.parse(localStorage.getItem("data")).Admin
    ) {
      this.users.getmasterforSupermaster(
        this.props.match.params.username
          ? this.props.match.params.username
          : JSON.parse(localStorage.getItem("data")).userName,
        (data) => {
          this.setState({
            data: data.data,
            searchFilter: data.data,
            walletBalance: JSON.parse(localStorage.getItem("data"))
              .walletBalance,
          });
          let totalBalance = 0;
          this.state.data.map((ele) => {
            totalBalance += ele.walletBalance;
          });
          this.setState({ totalBalance });
        }
      );
    } else {
      this.users.getMastersforAdmin((data) => {
        this.setState({
          data: data.data,
          searchFilter: data.data,
          walletBalance: JSON.parse(localStorage.getItem("data")).walletBalance,
        });
        let totalBalance = 0;
        this.state.data.map((ele) => {
          totalBalance += ele.walletBalance;
        });
        this.setState({ totalBalance });
      });
    }

    // if (this.props.match.params.username != undefined || JSON.parse(localStorage.getItem("data")).Admin){
    //   // parentwalletBalance
    //   this.users.getMyprofile(
    //     {userName:this.props.match.params.username
    //     ? this.props.match.params.username
    //     : JSON.parse(localStorage.getItem("data")).userName},
    //     // { userName: this.props.match.params.username},
    //     (data) => {
    //       console.log(data.data.walletBalance)
    //       this.setState({
    //         parentwalletBalance: data.data.walletBalance,
    //       });
    //     })

    // }



  }

  update_free_chips() {
    if (this.state.isDeposit) {
      this.users.creditbyUser(
        { userid: this.state.userdetails.id, fillAmount: this.state.Chips },
        "creditAmountByAdmin",
        (pdata) => {
          this.users.getMyprofile(
            { userName: JSON.parse(localStorage.getItem("data")).userName },
            (data) => {
              localStorage.setItem("data", JSON.stringify(data.data));
              alert(pdata.data.message);
              window.location.reload();
            }
          );
        }
      );
    } else {
      this.users.debitbyUser(
        { userid: this.state.userdetails.id, fillAmount: this.state.Chips },
        "debitAmountByAdmin",
        (pdata) => {
          this.users.getMyprofile(
            { userName: JSON.parse(localStorage.getItem("data")).userName },
            (data) => {
              localStorage.setItem("data", JSON.stringify(data.data));
              alert(pdata.data.message);
              window.location.reload();
            }
          );
        }
      );
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // 
    // if(this.userDetails.superAdmin){
    //   this.account.superAdminUserPL({userName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
    //     this.setState({
    //       adminData: data.data.adminPL
    //       });
    //   });
    // }
    // else if(this.userDetails.Admin){
    //   this.account.adminUserPL({adminName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
    //     this.setState({
    //       masterData: data.data.masterPL
    //       });
    //   });
    // }

    // else if(this.userDetails.Master){
    //   this.account.userPL({masterName:this.props.match.params.username?this.props.match.params.username:JSON.parse(localStorage.getItem('data')).userName},data=>{
    //     this.setState({
    //         data: data.data
    //       });
    //       this.setState({
    //         ispl: false
    //       });

    //   }); 
    // }

    // 
    if (this.state.isDeposit) {
      this.setState({
        newParentChip:
        this.state.parentwalletBalance -
          parseInt(event.target.value),
      });
      this.setState({
        newCurrChip:
          this.state.userdetails.walletBalance + parseInt(event.target.value),
      });
    } else {
      this.setState({
        newParentChip:
        this.state.parentwalletBalance +
          parseInt(event.target.value),
      });
      this.setState({
        newCurrChip:
          this.state.userdetails.walletBalance - parseInt(event.target.value),
      });
    }
  }

  view_change_passs(userdetails) {
    this.setState({
      username: userdetails.userName,
      userdetails: userdetails,
    });
    document.getElementById("masterpasswordpopup").classList.add("in");
    document.getElementById("masterpasswordpopup").style.display = "block";
  }
  openChipDeposit(userdetails) {
    this.users.getMyprofile(
          {userName:userdetails.admin
          ? userdetails.admin
          : JSON.parse(localStorage.getItem("data")).userName},
          (data) => {
            this.setState({
              parentwalletBalance: data.data.walletBalance,
            });

          })

    this.setState({
      username: userdetails.userName,
      userdetails: userdetails,
      isDeposit: true,
    });
    document.getElementById("chipdeposit").classList.add("in");
    document.getElementById("chipdeposit").style.display = "block";
  }
  openChipWithdrawal(userdetails) {

    this.users.getMyprofile(
      {userName:userdetails.admin
      ? userdetails.admin
      : JSON.parse(localStorage.getItem("data")).userName},
      (data) => {
        this.setState({
          parentwalletBalance: data.data.walletBalance,
        });
      })
    this.setState({
      username: userdetails.userName,
      userdetails: userdetails,
      isDeposit: false,
    });
    document.getElementById("chipwithdrawal").classList.add("in");
    document.getElementById("chipwithdrawal").style.display = "block";
  }
  closePasswordpopup() {
    document.getElementById("masterpasswordpopup").style.display = "none";
    document.getElementById("masterpasswordpopup").classList.remove("in");
  }
  closechipDepositpopup() {
    document.getElementById("chipdeposit").style.display = "none";
    document.getElementById("chipdeposit").classList.remove("in");
    this.setState({
      newParentChip: "",
    });
    this.setState({
      newCurrChip: "",
    });
  }
  closechipWithdrawalpopup() {
    document.getElementById("chipwithdrawal").style.display = "none";
    document.getElementById("chipwithdrawal").classList.remove("in");
    this.setState({
      newParentChip: "",
    });
    this.setState({
      newCurrChip: "",
    });
  }
  save() {
    let data;
    let message;
    let path;
    if (this.state.masterUName) {
      data = {
        userName: this.state.userName,
        Name: this.state.name,
        password: this.state.password,
        master: this.state.masterUName,
      };
      message = "User Added Successfully";
      // window.location.reload();
      path = "user/" 
    } else {

      data = {
        userName: this.state.userName,
        Name: this.state.name,
        password: this.state.password,
        admin: JSON.parse(localStorage.getItem("data")).userName,
        Master: true,
      };
      message = "Master Added Successfully";
      path = "master";
    }

    this.users.createUser(data, (data) => {
      alert(message);
      window.location.href = path;
    });
  }
  setAction() {
    if (this.state.useraction == "mstrlock-0") {
      this.users.lockunlock({ userName: this.state.mName }, (data) => {
        alert("Master locked successfully");
        window.location.reload();
      });
    } else if (this.state.useraction == "mstrlock-1") {
      this.users.lockunlock({ userName: this.state.mName }, (data) => {
        alert("Master unlocked successfully");
        window.location.reload();
      });
    } else if (this.state.useraction == "lgnusrCloseAc-0") {
      this.users.closeuser({ userName: this.state.mName }, (data) => {
        alert("Master close successfully");
        window.location.reload();
      });
    } else if (this.state.useraction == "lgnusrlckbtng-0") {
      this.users.lockingUnlockingBetting(
        { userName: this.state.mName },
        (data) => {
          alert("Betting locked successfully");
          window.location.reload();
        }
      );
    } else if (this.state.useraction == "lgnusrlckbtng-1") {
      this.users.lockingUnlockingBetting(
        { userName: this.state.mName },
        (data) => {
          alert("Betting unlocked successfully");
          window.location.reload();
        }
      );
    }
  }
  updatePass() {
    if (this.state.username && this.state.confirm_password) {
      this.users.changePassword(
        {
          userName: this.state.username,
          password: this.state.confirm_password,
        },
        (data) => {
          document.getElementById("newPassword").value = "";
          document.getElementById("confirm_password").value = "";
          alert(data.data.message);
        }
      );
    }
  }
  submit_info() {
    this.users.updateUserSportsInfo(
      {
        id: this.state.userdetails.id,
        cricketmaxStacks: this.state.max_stake,
        cricketminStacks: this.state.min_stake,
        cricketmaxProfit: this.state.max_profit,
        cricketmaxLoss: this.state.max_loss,
        cricketPreInplayProfit: this.state.PIP,
        cricketPreInplayStack: this.state.PIS,
        cricketmaxOdds: this.state.max_odds,
        cricketminOdds: this.state.min_odds,
      },
      (data) => {
        alert("updated");
      }
    );
  }

  submit_userInfo() {
    this.users.updateMyprofile(
      { userName: this.state.userdetails.userName, Name: this.state.Name },
      (data) => {
        alert("updated");
      }
    );
  }
  view_account(user) {
    this.setState({
      userdetails: user,
    });
    document.getElementById("viewinfo").classList.add("in");
    document.getElementById("viewinfo").style.display = "block";

    this.users.userSportsInfo({ id: this.state.userdetails.id }, (data) => {
      this.setState({
        userInfo: data.data,
      });
    });
  }
  closeviewinfo() {
    document.getElementById("viewinfo").style.display = "none";
    document.getElementById("viewinfo").classList.remove("in");
  }

  handleSearch = (e) => {
    let dataArray = [...this.state.searchFilter];
    let searchUser = e.target.value.toUpperCase();
    const updateList = dataArray.filter((user) =>
      user.userName.toUpperCase().includes(searchUser)
    );
    this.setState({ data: updateList });
  };

  render() {
    var i = 0;
    let masters;
    if (this.state.data.length > 0) {
      masters = this.state.data.map((item) => {
        i = i + 1;
        return (
          <tr id="user_row_152052">
            <td>
              {i}
              <input
                type="checkbox"
                name="mName"
                onChange={this.handleChange}
                value={item.userName}
                className="select-users"
              />
            </td>
            <td className=" " style={{ paddingBottom: "0px" }}>
              <span className="m-bg">
                <a href={"/user/" + item.userName} title="View Child">
                  {" "}
                  {item.userName}
                </a>
                &nbsp;
                {item.status ? (
                  <i
                    class="fa fa-user fa_custom fa-2x"
                    title="locked"
                    aria-hidden="true"
                    style={{ color: "red" }}
                  ></i>
                ) : (
                  ""
                )}
                {item.enableBetting ? (
                  <i
                    class="fa fa-lock fa_custom fa-2x"
                    title="Betting Locked"
                    aria-hidden="true"
                    style={{ color: "red" }}
                  ></i>
                ) : (
                  ""
                )}
              </span>
            </td>
            <td>BETFUN360</td>
            <td>{item.freeChips}</td>
            <td>{item.creditGiven}</td>
            <td className=" ">{item.walletBalance}</td>
            <td className=" ">0%</td>
            <td className=" ">0%</td>
            <td className=" ">0%</td>
            <td className=" ">0.00</td>
            <td className=" ">0.00</td>
            <td className="last">
              <span className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle btn btn-xs btn-success"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  View More <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className
                      data-toggle="modal"
                      masterName={item.userName}
                      data-target="#commonpopup"
                      onClick={() => this.addUser(item.userName)}
                    >
                      <span>Add User</span>
                    </a>
                  </li>
                  <li>
                    <Link to={"/cacstatement/" + item.userName}>Statement</Link>
                  </li>
                  <li>
                    <Link to={"/profitloss/" + item.userName}>Profit Loss</Link>
                  </li>
                  <li>
                    <a
                      className
                      href="javascript:;"
                      title="View Account Info"
                      onClick={() => this.view_account(item)}
                    >
                      <span>View Info</span>
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a
                      className
                      href="javascript:;"
                      title="Change Password"
                      onClick={() => this.view_change_passs(item)}
                    >
                      <span>Change Password</span>
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a
                      className
                      href="javascript:;"
                      title="Free Chip In Out"
                      onClick={() => this.openChipDeposit(item)}
                    >
                      <span>Free Chip Deposit</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className
                      href="javascript:;"
                      title="Free Chip In Out"
                      onClick={() => this.openChipWithdrawal(item)}
                    >
                      <span>Free Chip Withdrawal</span>
                    </a>
                  </li>
                </ul>
              </span>
            </td>
          </tr>
        );
      });
    }

    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="forModal" />
        <div className="container body">
          <div className="main_container" id="sticky">
            <div id="userModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content"></div>
              </div>
            </div>
            <div className="right_col" role="main">
              <div className="col-md-12">
                <div className="title_new_at">
                  <span className="lable-user-name">Master Listing</span>
                  <select
                    className="user-select"
                    style={{ color: "black" }}
                    onchange="perPage(this.value)"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <input
                    type="hidden"
                    name="ajaxUrl"
                    id="ajaxUrl"
                    defaultValue="userList"
                  />
                  <form
                    className="usersech user-mobile"
                    id="formSubmit"
                    method="post"
                  >
                    <input
                      type="hidden"
                      name="compute"
                      defaultValue="fe6602731bf3d65605f0d8f6552a1c9f"
                    />
                    <input
                      type="hidden"
                      name="getUserType"
                      id="getUserType"
                      defaultValue={3}
                    />
                    <input
                      type="hidden"
                      name="parentID"
                      id="parentID"
                      defaultValue
                    />
                    <input type="hidden" name="formSubmit" defaultValue={1} />
                    <input type="hidden" name="perpage" id="perpage" />

                    <input
                      type="text"
                      name="mstruserid"
                      id="mstruserid"
                      
                      placeholder="Search here"
                      onChange={this.handleSearch}
                    />
                    {
                      //<button className="fa fa-search" id="submit_form_button" data-attr="submit" />
                    }
                  </form>
                  <select
                    className="user-mobile custom-user-select"
                    name="useraction"
                    id="useraction"
                    onChange={this.handleChange}
                    style={{ color: "black" }}
                  >
                    <option value>Select Action</option>
                    <option value="lgnusrlckbtng-0">Lock Betting</option>
                    <option value="lgnusrlckbtng-1">Open Betting</option>
                    <option value="mstrlock-0">Lock User</option>
                    <option value="mstrlock-1">Unlock User</option>
                    <option value="lgnusrCloseAc-0">Close User Account</option>
                  </select>
                  <button
                    className="btn btn-warning btn-xs"
                    onClick={this.setAction}
                    style={{ padding: "4px 5px", marginRight: "3px" }}
                  >
                    ACTION
                  </button>
                  {JSON.parse(localStorage.getItem('data')).Admin?(<button className="btn btn-warning btn-xs" data-toggle="modal" data-target="#exampleModal" style={{ padding: "4px 5px" }} > ADD USER </button>) :null}	

                  <button className="btn btn-warning btn-xs" onClick={()=>{this.props.history.goBack()}} style={{ padding: "4px 5px" }}> 
                      Back
                  </button>

                  {/* modal */}

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Add Master
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="row">
                            <div class="col-md-4 col-xs-6">
                              <label> Name</label>
                              <input
                                type="text"
                                name="name"
                                required
                                onChange={this.handleChange}
                                class="form-control"
                                id="left_master_name"
                                autocomplete="off"
                              />
                              <span
                                id="left_master_nameN"
                                class="errmsg"
                              ></span>
                            </div>
                            <div class="col-md-4 col-xs-6">
                              <label> Registration Data </label>
                              <input
                                type="text"
                                name="FromDate"
                                class="form-control"
                                id="Fleft_romDate"
                                autocomplete="off"
                                value="2020-07-14"
                                readonly=""
                              />
                              <span id="left_FromDateN" class="errmsg"></span>
                            </div>
                            <div class="col-md-4 col-xs-6">
                              <label> User ID </label>
                              <input
                                type="text"
                                required
                                name="userName"
                                onChange={this.handleChange}
                                class="form-control"
                                id="left_username"
                              />
                              <span id="left_usernameN"></span>
                            </div>
                            <div class="col-md-4 col-xs-6">
                              <label> Password</label>
                              <input
                                type="password"
                                required
                                name="password"
                                onChange={this.handleChange}
                                class="form-control"
                                id="left_password"
                                autocomplete="off"
                              />
                              <span id="left_passwordN" class="errmsg"></span>
                            </div>
                            <div class="col-md-4 col-xs-6">
                              <label id="partnerMAx">Partnership [ 0]</label>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <span id="less-partnership"></span>
                              <input
                                type="number"
                                required
                                name="partner"
                                class="form-control"
                                id="left_partner"
                                max="100"
                                min="0"
                                autocomplete="off"
                                value="0"
                                onkeypress="return isNumberKey(event)"
                              />
                              <span id="left_partnerN" class="errmsg"></span>
                            </div>
                            <div class="col-md-4 col-xs-6">
                              <label id="partnershipCasino">
                                partnership Casino [ 0]
                              </label>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <span id="less-partnershipCasino"></span>
                              <input
                                type="number"
                                name="partnershipCasino"
                                class="form-control"
                                id="left_partnershipCasino"
                                max="100"
                                min="0"
                                autocomplete="off"
                                value="0"
                                onkeypress="return isNumberKey(event)"
                              />
                              <span
                                id="left_partnerCasinoN"
                                class="errmsg"
                              ></span>
                            </div>
                            <div class="col-md-4 col-xs-6">
                              <label id="partnershipLiveTennPatti">
                                Partnership TeenPatti [ 0]
                              </label>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <span id="less-partnershipLiveTennPatti"></span>
                              <input
                                type="number"
                                required
                                name="partnershipLiveTennPatti"
                                class="form-control"
                                id="left_partnershipLiveTennPatti"
                                max="100"
                                min="0"
                                autocomplete="off"
                                value="0"
                                onkeypress="return isNumberKey(event)"
                              />
                              <span
                                id="left_partnerLiveTennPattiN"
                                class="errmsg"
                              ></span>
                            </div>
                            <div class="col-md-12 col-xs-6 modal-footer">
                              <button
                                type="button"
                                class="blue_button Addsuper1"
                                onClick={this.save}
                                id="child_player_add"
                              >
                                Add
                              </button>
                              <button
                                data-dismiss="modal"
                                type="button"
                                class="red_button"
                                onclick="reset_f();"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* <div className="modal-body">
             
              <input type="text" className="form-control col-4" onChange={this.handleChange} name="userName" placeholder="Enter Username" /><br />
              <input type="text" className="form-control" onChange={this.handleChange} name="password" placeholder="Enter Password" /><br />
               <input type="text" className="form-control" onChange={this.handleChange} name="master" placeholder="Enter Master" /> 
              <input type="text" name="FromDate" class="form-control" id="Fleft_romDate" autocomplete="off" value={this.currentDate} readonly=""></input>
              <br />  
              <input type="text" className="form-control" onChange={this.handleChange} name="walletBalance" placeholder="Enter Wallet Balance" /><br />  
            </div> */}
                        {/* <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.save}>Add</button>
            </div> */}
                      </div>
                    </div>
                  </div>

                  {/* modal  */}
                </div>
              </div>
              <div className="clearfix" />
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div id="divLoading" />
                  <div className="custom-scroll appendAjaxTbl">
                    <table
                      className="table table-striped jambo_table bulk_action"
                      id="datatabless"
                    >
                      <thead>
                        <tr className="headings">
                          <th>S.No.</th>
                          <th>
                            User&nbsp;ID{" "}
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-up"
                            >
                              {" "}
                            </a>
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-down"
                            />
                          </th>
                          <th>Website</th>
                          <th>Credit&nbsp;Limit</th>
                          <th>Credit&nbsp;given</th>
                          <th>
                            Balance{" "}
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-up"
                            >
                              {" "}
                            </a>
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-down"
                            />
                          </th>
                          <th>
                            Partnership{" "}
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-up"
                            >
                              {" "}
                            </a>
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-down"
                            />
                          </th>
                          <th>
                            Partnership&nbsp;Cacino{" "}
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-up"
                            >
                              {" "}
                            </a>
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-down"
                            />
                          </th>
                          <th>
                            Partnership&nbsp;TeenPatti
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-up"
                            >
                              {" "}
                            </a>
                            <a
                              href="#"
                              className="glyphicon glyphicon-arrow-down"
                            />
                          </th>
                          <th>M.comm</th> <th>S.comm</th> <th>View More</th>
                        </tr>
                      </thead>
                      <tbody>{masters}</tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={5} />
                          <td colSpan={9}>
                            Total Balance: {this.state.totalBalance}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <p className="pull-left">Showing 1 to 3 of 3 entries </p>
                    <p
                      id="paginateClick"
                      className="pull-right pagination-row dataTables_paginate paging_simple_numbers"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div id="commonpopup" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="popup_form">
                    <div className="title_popup">
                      <span>Add User</span>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        <div className="close_new">
                          <i className="fa fa-times-circle" />
                        </div>
                      </button>
                    </div>
                    <div className="content_popup">
                      <div className="popup_form_row">
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-md-4 col-xs-6">
                              <label> Name</label>
                              <input
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                                className="form-control"
                                id="left_master_name"
                                autocomplete="off"
                              />
                              <span
                                id="left_master_nameN"
                                className="errmsg"
                              ></span>
                            </div>
                            <div className="col-md-4 col-xs-6">
                              <label> Registration Data </label>
                              <input
                                type="text"
                                name="FromDate"
                                className="form-control"
                                id="Fleft_romDate"
                                autocomplete="off"
                                value={this.currentDate}
                                readonly=""
                              />
                              <span
                                id="left_FromDateN"
                                className="errmsg"
                              ></span>
                            </div>
                            <div className="col-md-4 col-xs-6">
                              <label> User ID </label>
                              <input
                                type="text"
                                name="userName"
                                onChange={this.handleChange}
                                className="form-control"
                                id="left_username"
                              />
                              <span id="left_usernameN"></span>
                            </div>
                            <div className="col-md-4 col-xs-6">
                              <label> Password</label>
                              <input
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                className="form-control"
                                id="left_password"
                                autocomplete="off"
                              />
                              <span
                                id="left_passwordN"
                                className="errmsg"
                              ></span>
                            </div>
                            <div className="col-md-12 col-xs-6 modal-footer">
                              <button  type="button" className="blue_button Addsuper1" onClick={this.save}id="child_player_add" >Add </button>
                              <button
                                data-dismiss="modal"
                                type="button"
                                className="red_button"
                                onclick="reset_f();"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="masterpasswordpopup" class="modal fade" role="dialog">
              <div class=" " id="changeUserPassword" role="main">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="close"
                        onClick={this.closePasswordpopup}
                        data-dismiss="modal"
                      >
                        ×
                      </button>
                      <h4 class="modal-title">Change Password</h4>
                    </div>
                    <div class="modal-body">
                      <div id="PassUserMsg"></div>
                      <div class="row">
                        <form
                          id="ChangePassword"
                          method="post"
                          autocomplete="off"
                        >
                          <input
                            type="hidden"
                            name="compute"
                            value="e34250a537dafd7d93f9f0827c207d74"
                          />
                          <span id="msg_error"></span>
                          <span id="errmsg"></span>
                          <input type="hidden" name="userId" value="155374" />
                          <div class="col-md-6 col-xs-6">
                            <label>New Password</label>
                            <input
                              type="password"
                              name="newPassword"
                              class="form-control"
                              onChange={this.handleChange}
                              id="newPassword"
                              autocomplete="off"
                            />
                            <span id="newPasswordN" class="errmsg"></span>
                          </div>
                          <div class="col-md-6 col-xs-6">
                            <label>Confirm Password</label>
                            <input
                              type="password"
                              name="confirm_password"
                              class="form-control"
                              onChange={this.handleChange}
                              id="confirm_password"
                              autocomplete="off"
                            />
                            <span id="confirm_passwordN" class="errmsg"></span>
                          </div>
                          <div class="col-md-12 col-xs-6 modal-footer">
                            <button
                              type="button"
                              class="blue_button"
                              onClick={this.updatePass}
                              id="change_pass"
                            >
                              Change
                            </button>
                            <button
                              data-dismiss="modal"
                              onClick={this.closePasswordpopup}
                              type="button"
                              class="red_button"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="chipdeposit"
              class="modal fade in"
              role="dialog"
              style={{ display: "none" }}
            >
              <div class=" " id="changeUserPassword" role="main">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        onClick={this.closechipDepositpopup}
                      >
                        ×
                      </button>
                      <h4 class="modal-title">
                        <span id="tital_change">
                          Free Chips In/Out {this.state.username}
                        </span>{" "}
                      </h4>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div id="UpdateChipsMsg"></div>
                        <form id="UpdateFreeChips" method="post">
                          <span id="msg_error"></span>
                          <span id="errmsg"></span>
                          <div class="col-md-6">
                            <label> Free Chips : </label>
                            <input
                              type="text"
                              name="Chips"
                              class="form-control"
                              onChange={this.handleChange}
                              required=""
                            />
                            <span id="ChipsN" class="errmsg"></span>
                          </div>
                          <div class="col-md-12">
                            <div class="tabel_content ">
                              <table class="table-bordered">
                                <tbody>
                                  <tr>
                                    <td>Parant Free Chips</td>
                                    <td class="font-bold">
                                      {this.state.parentwalletBalance}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>User Balance </td>
                                    <td class="font-bold">
                                      {this.state.userdetails.walletBalance}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Parant New Free Chips</td>
                                    <td>
                                      <span id="ParantNewFreeChips">
                                        {this.state.newParentChip}
                                      </span>{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {this.state.username} New Free Chips
                                    </td>
                                    <td>
                                      <span id="myNewFreeChips">
                                        {this.state.newCurrChip}
                                      </span>{" "}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="col-md-12 modal-footer">
                            <button
                              type="button"
                              class="btn btn-success pull-right chip-inout-button"
                              onClick={this.update_free_chips}
                            >
                              Deposit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="chipwithdrawal"
              class="modal fade in"
              role="dialog"
              style={{ display: "none" }}
            >
              <div class=" " id="changeUserPassword" role="main">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        onClick={this.closechipWithdrawalpopup}
                      >
                        ×
                      </button>
                      <h4 class="modal-title">
                        <span id="tital_change">
                          Free Chips In/Out {this.state.username}
                        </span>{" "}
                      </h4>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div id="UpdateChipsMsg"></div>
                        <form id="UpdateFreeChips" method="post">
                          <input
                            type="hidden"
                            name="compute"
                            value="931cdfb53a4885ba8f0f9fb6be92ade8"
                          />
                          <span id="msg_error"></span>
                          <span id="errmsg"></span>
                          <div class="col-md-6">
                            <label> Free Chips : </label>
                            <input
                              type="text"
                              name="Chips"
                              class="form-control"
                              onChange={this.handleChange}
                              required=""
                            />
                            <span id="ChipsN" class="errmsg"></span>
                          </div>
                          <div class="col-md-12">
                            <div class="tabel_content ">
                              <table class="table-bordered">
                                <tbody>
                                  <tr>
                                    <td>Parant Free Chips</td>
                                    <td class="font-bold">
                                      {this.state.walletBalance}{" "}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>User Balance </td>
                                    <td class="font-bold">
                                      {this.state.userdetails.walletBalance}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Parant New Free Chips</td>
                                    <td>
                                      <span id="ParantNewFreeChips">
                                        {this.state.newParentChip}
                                      </span>{" "}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {this.state.username} New Free Chips
                                    </td>
                                    <td>
                                      <span id="myNewFreeChips">
                                        {this.state.newCurrChip}
                                      </span>{" "}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="col-md-12 modal-footer">
                            <button
                              type="button"
                              class="red_button pull-right chip-inout-button"
                              onClick={this.update_free_chips}
                              style={{ background: "red", borderColor: "red" }}
                            >
                              withdrawal
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="userModal"
              class="modal fade in"
              role="dialog"
              style={{ display: "none" }}
            >
              <div class=" " id="accountView" role="main">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">
                        ×
                      </button>
                      <h4 class="modal-title">
                        <span id="tital_change">Account of gauri222 </span>
                      </h4>
                    </div>

                    <div class="modal-body">
                      <div id="InfoUserMsg"></div>
                      <span id="msg_error"></span>
                      <span id="errmsg"></span>
                      <div class="sub_heading">
                        <span id="tital_change">User </span>{" "}
                      </div>
                      <div class="row">
                        <form id="update_user" method="post">
                          <div class="col-md-4 col-xs-6">
                            <label>User ID</label>
                            <input
                              type="text"
                              name="userId"
                              class="form-control"
                              id="master_name"
                              readonly=""
                              value="gauri222"
                            />
                            <span id="master_nameN" class="errmsg"></span>
                          </div>
                          <div class="col-md-4 col-xs-6">
                            <label> User Name </label>
                            <input
                              type="text"
                              name="Name"
                              class="form-control"
                              id="FromDate"
                              value="gauri"
                              readonly=""
                            />
                            <span id="FromDateN" class="errmsg"></span>
                          </div>

                          <div class="col-md-4 col-xs-12">
                            <label>Update From General Setting</label>
                            <input
                              type="checkbox"
                              name="user[is_update_from_gen]"
                              value="1"
                              checked=""
                            />{" "}
                            <br />
                            <span
                              id="is_update_from_genN"
                              class="errmsg"
                            ></span>
                          </div>
                          <div class="col-md-12 col-xs-12 modal-footer">
                            <button
                              type="button"
                              class="blue_button submit_user_setting"
                              onclick="update_gen_setting();"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>

                      <div class="sub_heading">
                        <span id="tital_change">Cricket </span>{" "}
                      </div>
                      <div class="row">
                        <form id="4_setting" method="post">
                          <div class="col-md-4 col-xs-6">
                            <label> MIN STAKE</label>
                            <input
                              type="text"
                              name="sport[min_stake]"
                              class="form-control"
                              id="4_min_stake"
                            />
                            <span id="4_min_stakeN" class="errmsg"></span>
                          </div>
                          <div class="col-md-4 col-xs-6">
                            <label> Max STAKE </label>
                            <input
                              type="text"
                              name="sport[max_stake]"
                              class="form-control"
                              id="4_max_stake"
                              value="50000"
                            />
                            <span id="4_max_stakeN" class="errmsg"></span>
                          </div>
                          <div class="col-md-4 col-xs-6">
                            <label> MAX PROFIT </label>
                            <input
                              type="text"
                              name="sport[max_profit]"
                              class="form-control"
                              id="4_max_profit"
                              value="500000"
                            />
                            <span id="4_max_profitN" class="errmsg"></span>
                          </div>
                          <div class="col-md-4 col-xs-6">
                            <label> Max Loss </label>
                            <input
                              type="text"
                              name="sport[max_loss]"
                              class="form-control"
                              id="4_max_loss"
                              value="500000"
                            />
                            <span id="4_max_lossN" class="errmsg"></span>
                          </div>
                          <div class="col-md-4 col-xs-6">
                            <label> PRE INPLAY PROFIT</label>
                            <input
                              type="text"
                              name="sport[pre_innplay_profit]"
                              class="form-control"
                              id="4_pre_innplay_profit"
                              value="0"
                            />
                            <span
                              id="4_pre_innplay_profitN"
                              class="errmsg"
                            ></span>
                          </div>
                          <div class="col-md-4 col-xs-6">
                            <label> PRE INPLAY STAKE</label>
                            <input
                              type="text"
                              name="sport[pre_inplay_stake]"
                              class="form-control"
                              id="4_pre_inplay_stake"
                              value="1"
                            />
                            <span id="4_inplay_stakeN" class="errmsg"></span>
                          </div>

                          <div class="col-md-4 col-xs-6">
                            <label> MIN ODDS</label>
                            <input
                              type="text"
                              name="sport[min_odds]"
                              class="form-control"
                              id="4_min_odds"
                              value="1.01"
                            />
                            <span id="4_min_oddsN" class="errmsg"></span>
                          </div>
                          <div class="col-md-4 col-xs-6">
                            <label> MAX ODDS</label>
                            <input
                              type="text"
                              name="sport[max_odds]"
                              class="form-control"
                              id="4_max_odds"
                              value="100.00"
                            />
                            <span id="4_max_oddsN" class="errmsg"></span>
                          </div>
                          <div class="col-md-4 col-xs-6">
                            <label>UNMATCH BET</label>
                            <input
                              type="checkbox"
                              name="sport[is_unmatch_bet]"
                              value="1"
                            />{" "}
                            <br />
                            <span id="4_is_unmatch_betN" class="errmsg"></span>
                          </div>
                          <div class="col-md-4 col-xs-6">
                            <label> LOCK BET</label>
                            <input
                              type="checkbox"
                              name="sport[lock_bet]"
                              value="1"
                            />{" "}
                            <br />
                            <span id="4_lock_betN" class="errmsg"></span>
                          </div>
                          <div class="col-md-12 col-xs-12 modal-footer">
                            <button
                              type="button"
                              class="blue_button submit_user_setting"
                              id="update-4-setting"
                              onclick="submit_user_setting('4_setting')"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="viewinfo"
              class="modal fade"
              role="dialog"
              style={{ display: "none" }}
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="close"
                      onClick={() => this.closeviewinfo()}
                      data-dismiss="modal"
                    >
                      ×
                    </button>
                    <h4 class="modal-title">
                      <span id="tital_change">
                        Account of {this.state.userdetails.userName}{" "}
                      </span>
                    </h4>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="sub_heading">
                        <span id="tital_change">User </span>{" "}
                      </div>
                      <form>
                        <div class="col-md-4 col-xs-6">
                          <label>User ID</label>
                          <input
                            type="text"
                            class="form-control"
                            value={this.state.userdetails.userName}
                            name="userID"
                            readOnly
                          />
                        </div>
                        <div class="col-md-4 col-xs-6">
                          <label>User Name</label>
                          <input
                            type="text"
                            class="form-control"
                            name="Name"
                            defaultValue={this.state.userdetails.Name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div class="col-md-4 col-xs-12">
                          <label>Update From General Setting</label>
                          <br />

                          <input
                            type="checkbox"
                            name="usercheck"
                            value="1"
                            checked
                          />
                        </div>
                        <div class="col-md-12 col-xs-12 modal-footer">
                          <button
                            type="button"
                            class="blue_button submit_user_setting"
                            onClick={() => this.submit_userInfo()}
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="sub_heading">
                      <span id="tital_change">Cricket </span>{" "}
                    </div>
                    <div class="row">
                      <form>
                        <div class="col-md-4 col-xs-6">
                          <label> MIN STAKE</label>
                          <input
                            type="text"
                            name="min_stake"
                            defaultValue={this.state.userInfo.cricketminStacks}
                            onChange={this.handleChange}
                            class="form-control"
                            id="4_min_stake"
                          />
                        </div>
                        <div class="col-md-4 col-xs-6">
                          <label> Max STAKE </label>
                          <input
                            type="text"
                            name="max_stake"
                            defaultValue={this.state.userInfo.cricketmaxStacks}
                            onChange={this.handleChange}
                            class="form-control"
                            id="4_max_stake"
                          />
                        </div>
                        <div class="col-md-4 col-xs-6">
                          <label> MAX PROFIT </label>
                          <input
                            type="text"
                            name="max_profit"
                            defaultValue={this.state.userInfo.cricketmaxProfit}
                            onChange={this.handleChange}
                            class="form-control"
                            id="4_max_profit"
                          />
                        </div>
                        <div class="col-md-4 col-xs-6">
                          <label> Max Loss </label>
                          <input
                            type="text"
                            name="max_loss"
                            defaultValue={this.state.userInfo.cricketmaxLoss}
                            onChange={this.handleChange}
                            class="form-control"
                            id="4_max_loss"
                          />
                        </div>
                        <div class="col-md-4 col-xs-6">
                          <label> PRE INPLAY PROFIT</label>
                          <input
                            type="text"
                            name="PIP"
                            defaultValue={
                              this.state.userInfo.cricketPreInplayProfit
                            }
                            onChange={this.handleChange}
                            class="form-control"
                            id="4_pre_innplay_profit"
                          />
                        </div>
                        <div class="col-md-4 col-xs-6">
                          <label> PRE INPLAY STAKE</label>
                          <input
                            type="text"
                            name="PIS"
                            defaultValue={
                              this.state.userInfo.cricketPreInplayStack
                            }
                            onChange={this.handleChange}
                            class="form-control"
                            id="4_pre_inplay_stake"
                          />
                        </div>

                        <div class="col-md-4 col-xs-6">
                          <label> MIN ODDS</label>
                          <input
                            type="text"
                            name="min_odds"
                            defaultValue={this.state.userInfo.cricketminOdds}
                            onChange={this.handleChange}
                            class="form-control"
                            id="4_min_odds"
                          />
                        </div>
                        <div class="col-md-4 col-xs-6">
                          <label> MAX ODDS</label>
                          <input
                            type="text"
                            name="max_odds"
                            defaultValue={this.state.userInfo.cricketmaxOdds}
                            onChange={this.handleChange}
                            class="form-control"
                            id="4_max_odds"
                          />
                        </div>
                        <div class="col-md-4 col-xs-6">
                          <label>UNMATCH BET</label>
                          <input
                            type="checkbox"
                            name="sport[is_unmatch_bet]"
                          />{" "}
                          <br />
                        </div>
                        <div class="col-md-4 col-xs-6">
                          <label> LOCK BET</label>
                          <input type="checkbox" name="sport[lock_bet]" />{" "}
                          <br />
                        </div>
                        <div class="col-md-12 col-xs-12 modal-footer">
                          <button
                            type="button"
                            class="blue_button submit_user_setting"
                            id="update-4-setting"
                            onClick={() => this.submit_info()}
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

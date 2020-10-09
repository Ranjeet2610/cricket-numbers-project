import React, { Component } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Users from "../Services/users";
import { Link } from "react-router-dom";
import Footer from './footer'

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      redirectToReferrer: false,
      newPassword: "",
      confirm_password: "",
      username: "",
      usermasterName: "",
      selecteduser: "",
      useraction: "",
      userdetails: "",
      newParentChip: "",
      newCurrChip: "",
      isDeposit: false,
      Chips: "",
      masterDetails: "",
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
      parentdetails: "",
      searchFilter: [],
      totalBalance: 0,
    };
    this.users = new Users();
    this.handleChange = this.handleChange.bind(this);
    this.setAction = this.setAction.bind(this);
    this.savePass = this.savePass.bind(this);
    this.save = this.save.bind(this);
    this.update_free_chips = this.update_free_chips.bind(this);
    this.closechipDepositpopup = this.closechipDepositpopup.bind(this);
    this.closechipWithdrawalpopup = this.closechipWithdrawalpopup.bind(this);
  }
  // update_free_chips(){
  //   if(this.state.isDeposit){
  //   this.users.creditbyUser({userid:this.state.userdetails.id,fillAmount:this.state.Chips},data=>{
  //     alert(data.data.message);
  //     window.location.reload();
  //      })

  //   }
  //   else{
  //     this.users.debitbyUser({userid:this.state.userdetails.id,fillAmount:this.state.Chips},data=>{
  //       alert(data.data.message);
  //       window.location.reload();
  //       })
  //   }
  // }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });

    if (this.state.isDeposit) {
      if (!isNaN(this.state.masterDetails)) {
        this.state.masterDetails = this.state.parentdetails;
      }
      this.setState({
        newParentChip:
          this.state.masterDetails.walletBalance - parseInt(event.target.value),
      });
      this.setState({
        newCurrChip:
          this.state.userdetails.walletBalance + parseInt(event.target.value),
      });
    } else {
      if (!isNaN(this.state.masterDetails)) {
        this.state.masterDetails = this.state.parentdetails;
      }
      this.setState({
        newParentChip:
          this.state.masterDetails.walletBalance + parseInt(event.target.value),
      });
      this.setState({
        newCurrChip:
          this.state.userdetails.walletBalance - parseInt(event.target.value),
      });
    }
  }
  //  myFunction() {
  //     var input, filter, table, tr, td, i, txtValue;
  //     input = document.getElementById("myInput");
  //     filter = input.value.toUpperCase();
  //     table = document.getElementById("myTable");
  //     tr = table.getElementsByTagName("tr");
  //     for (i = 0; i < tr.length; i++) {
  //         td = tr[i].getElementsByTagName("td")[0];
  //         if (td) {
  //             txtValue = td.textContent || td.innerText;
  //             if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //                 tr[i].style.display = "";
  //             } else {
  //                 tr[i].style.display = "none";
  //             }
  //         }
  //     }
  // }

  handleSearch = (e) => {
    let dataArray = [...this.state.searchFilter];
    let searchUser = e.target.value.toUpperCase();
    const updateList = dataArray.filter((user) =>
      user.userName.toUpperCase().includes(searchUser)
    );
    this.setState({ data: updateList });
  };

  componentDidMount() {
    if (
      this.props.match.params.username ||
      JSON.parse(localStorage.getItem("data")).Master
    ) {
      this.users.getUsersforMaster(this.props.match.params.username, (data) => {
        this.setState({
          data: data.data,
          searchFilter: data.data,
        });
        let totalBalance = 0;
        this.state.data.map((ele) => {
          totalBalance += ele.walletBalance;
        });
        this.setState({ totalBalance });
      });
      this.users.getMyprofile(
        {
          userName: this.props.match.params.username
            ? this.props.match.params.username
            : JSON.parse(localStorage.getItem("data")).userName,
        },
        (data) => {
          this.setState({
            masterDetails: data.data,
          });
        }
      );
    } else {
      this.users.getAllusers((data) => {
        this.setState({
          data: data.data,
          searchFilter: data.data,
        });
        let totalBalance = 0;
        this.state.data.map((ele) => {
          totalBalance += ele.walletBalance;
        });
        this.setState({ totalBalance });
      });
    }
  }
  view_change_passs(userdetails) {
    this.setState({
      username: userdetails.userName,
      userdetails: userdetails,
    });
    document.getElementById("userpasswordpopup").classList.add("in");
    document.getElementById("userpasswordpopup").style.display = "block";
  }
  update_free_chips() {
    if (this.state.isDeposit) {
      this.users.creditbyUser(
        { userid: this.state.userdetails.id, fillAmount: this.state.Chips },
        "creditAmountByMaster",
        (Data) => {
          this.users.getMyprofile(
            { userName: JSON.parse(localStorage.getItem("data")).userName },
            (data) => {
              alert(Data.data.message);
              localStorage.setItem("data", JSON.stringify(data.data));
              window.location.reload();
            }
          );
        }
      );
    } else {
      this.users.debitbyUser(
        { userid: this.state.userdetails.id, fillAmount: this.state.Chips },
        "debitAmountByMaster",
        (Data) => {
          this.users.getMyprofile(
            { userName: JSON.parse(localStorage.getItem("data")).userName },
            (data) => {
              alert(Data.data.message);
              localStorage.setItem("data", JSON.stringify(data.data));
              window.location.reload();
            }
          );
        }
      );
    }
  }
  openChipDeposit(userdetails) {
    this.users.getMyprofile({ userName: userdetails.master }, (data) => {
      // alert("updated")
      this.setState({
        parentdetails: data.data,
      });
    });

    this.setState({
      username: userdetails.userName,
      userdetails: userdetails,
      isDeposit: true,
    });
    document.getElementById("chipdeposit").classList.add("in");
    document.getElementById("chipdeposit").style.display = "block";
  }
  openChipWithdrawal(userdetails) {
    this.users.getMyprofile({ userName: userdetails.master }, (data) => {
      // alert("updated")
      this.setState({
        parentdetails: data.data,
      });
    });
    this.setState({
      username: userdetails.userName,
      userdetails: userdetails,
      isDeposit: false,
    });
    document.getElementById("chipwithdrawal").classList.add("in");
    document.getElementById("chipwithdrawal").style.display = "block";
  }

  closePasswordpopup() {
    document.getElementById("userpasswordpopup").style.display = "none";
    document.getElementById("userpasswordpopup").classList.remove("in");
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
  savePass() {
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

  save() {
    let data;
    let message;
    let path;
    data = {
      userName: this.state.userName,
      Name: this.state.name,
      password: this.state.password,
      master: JSON.parse(localStorage.getItem("data")).userName,
    };
    message = "User Added Successfully";

    this.users.createUser(data, (data) => {
      alert(message);
      window.location.reload();
    });
  }

  setAction() {
    if (this.state.useraction == "mstrlock-0") {
      this.users.lockunlock({ userName: this.state.selecteduser }, (data) => {
        alert("User locked successfully");
        window.location.reload();
      });
    } else if (this.state.useraction == "mstrlock-1") {
      this.users.lockunlock({ userName: this.state.selecteduser }, (data) => {
        alert("User unlocked successfully");
        window.location.reload();
      });
    } else if (this.state.useraction == "lgnusrCloseAc-0") {
      this.users.closeuser({ userName: this.state.selecteduser }, (data) => {
        alert("User close successfully");
        window.location.reload();
      });
    } else if (this.state.useraction == "lgnusrlckbtng-0") {
      this.users.lockingUnlockingBetting(
        { userName: this.state.selecteduser },
        (data) => {
          alert("Betting locked successfully");
          window.location.reload();
        }
      );
    } else if (this.state.useraction == "lgnusrlckbtng-1") {
      this.users.lockingUnlockingBetting(
        { userName: this.state.selecteduser },
        (data) => {
          alert("Betting unlocked successfully");
          window.location.reload();
        }
      );
    }
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

  closeviewinfo() {
    document.getElementById("viewinfo").style.display = "none";
    document.getElementById("viewinfo").classList.remove("in");
  }
  render() {
    var i = 0;
    let users;
    if (this.state.data.length > 0) {
      users = this.state.data.map((item) => {
        i = i + 1;
        return (
          <tr id="user_row_152262">
            <td>
              {i}
              <input
                type="checkbox"
                name="selecteduser"
                onChange={this.handleChange}
                value={item.userName}
                className="select-users"
              />
            </td>
            <td className=" " style={{ paddingBottom: "0px" }}>
              <span className="m-bg">
                {item.userName} &nbsp;
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
            <td>{item.master}</td> <td className=" ">{item.profitLossChips} </td>
            <td className=" ">{item.freeChips} </td>
            <td className=" ">
              <a className="btn btn-success btn-xs" href=" #">
                {" "}
                {item.exposure}
              </a>
            </td>
            <td className=" ">{item.walletBalance} </td>
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
                  <li></li>
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
        <div className="forModal" />{" "}
        <div className="container body">
          <div className="main_container" id="sticky">
            <style
              type="text/css"
              dangerouslySetInnerHTML={{
                __html:
                  "\n  .toggle-star, .toggle-password{cursor: pointer;}\n",
              }}
            />
            <div id="userModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content"></div>
              </div>
            </div>
            <div className="right_col" role="main">
              <div className="col-md-12">
                <div className="title_new_at">
                  <span className="lable-user-name">Users Listing</span>
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
                  <div
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
                      defaultValue={4}
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
                      id="myInput"
                      style={{ marginLeft: "5px" }}
                      onChange={this.handleSearch}
                      placeholder="Search here"
                    />
                    {
                      //<button className="fa fa-search" id="submit_form_button" onclick={this.search} data-attr="submit" />
                    }
                  </div>
                  <select
                    className="user-mobile custom-user-select"
                    name="useraction"
                    id="useraction"
                    onChange={this.handleChange}
                    style={{ color: "black",margin:'2px' }}
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
                    style={{ padding: "5px", margin: "2px" }}
                  >
                    ACTION
                  </button>
                  {JSON.parse(localStorage.getItem('data')).Master?(<button className="btn btn-warning btn-xs" data-toggle="modal" data-target="#exampleModal" style={{ padding: "4px 5px" }} > ADD USER </button>):null }	

                  <button
                    className="btn btn-warning btn-xs"
                    onClick={()=>{this.props.history.goBack()}}
                    style={{ padding: "5px", marginTop: "2px" }}
                  >
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
                            Add User
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
                      id="myTable"
                    >
                      <thead>
                        <tr className="headings">
                          <th> S.No</th>
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
                          <th>Master</th>{" "}
                          <th>
                            Winnings
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
                            Credit&nbsp;Limits
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
                            Exposure
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
                          <th>Balance</th>
                          <th>M.comm</th> <th>S.comm</th> <th>View More</th>
                        </tr>
                      </thead>
                      <tbody>{users}</tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={5} />
                          <td colSpan={9}>
                            Total Balance:{this.state.totalBalance}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                    <p className="pull-left">Showing 1 to 2 of 2 entries </p>
                    <p
                      id="paginateClick"
                      className="pull-right pagination-row dataTables_paginate paging_simple_numbers"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="userpasswordpopup" class="modal fade" role="dialog">
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
                              onClick={this.savePass}
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
                                      {this.state.masterDetails.walletBalance}
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
                                      {this.state.masterDetails.walletBalance}{" "}
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

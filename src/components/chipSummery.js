import React, { Component } from "react";
import Navbar from "./Navbar";
import Account from "../Services/account";
import Users from "../Services/users";
import Footer from './footer'

export default class ChipSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      plusAccounts: "",
      minusAccounts: "",
      userInfo: "",
      displayPop: false,
      settleAmt: "",
      Value1:""
    };
    this.account = new Account();
    this.users = new Users();
    this.userDetails =
      JSON.parse(localStorage.getItem("data")) != undefined
        ? JSON.parse(localStorage.getItem("data"))
        : "";
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    if (this.userDetails.superAdmin) {
      this.users.getAllAdmin((data) => {
        this.setState({
          plusAccounts: data.data.filter((item) => item.profitLossChips > 0),
          minusAccounts: data.data.filter((item) => item.profitLossChips <= 0),
          data:data
        });
      });
    } else if (this.userDetails.Admin) {
      this.users.getmasterforSupermaster(this.userDetails.userName, (data) => {
        this.setState({
          plusAccounts: data.data.filter((item) => item.profitLossChips > 0),
          minusAccounts: data.data.filter((item) => item.profitLossChips <= 0),
        });
      });
    } else {
      this.users.getUsersforMaster(this.userDetails.userName, (data) => {
        this.setState({
          plusAccounts: data.data.filter((item) => item.profitLossChips > 0),
          minusAccounts: data.data.filter((item) => item.profitLossChips <= 0),
        });
      });
    }
  }
  submitClearChip(userData) {
    this.setState({
      displayPop: true,
      userInfo: userData,
    });
  }
  saveSettelment() {
    let type = typeof(this.state.settleAmt)
    if (this.userDetails.superAdmin) {
      this.account.fetchChipSummary(
        "chipSettlementForAdmin",
        { userid: this.state.userInfo.id, PL_Chips: this.state.settleAmt },
        (data) => {
          this.users.getMyprofile(
            { userName: this.userDetails.userName },
            (udata) => {
              localStorage.setItem("data", JSON.stringify(udata.data));
              if(this.state.settleAmt && parseInt(this.state.settleAmt)){
              alert("Chip Settled Successfully! ");
              window.location.reload();
            }
            else{
              alert("You have entered wrong number...Please Check it!")
            }
          }
          );
        }
      );
    } else if (this.userDetails.Admin) {
      this.account.fetchChipSummary(
        "chipSettlementForMaster",
        { userid: this.state.userInfo.id, PL_Chips: this.state.settleAmt },
        (data) => {
          this.users.getMyprofile(
            { userName: this.userDetails.userName },
            (udata) => {
              localStorage.setItem("data", JSON.stringify(udata.data));
              if(this.state.settleAmt && parseInt(this.state.settleAmt)){
                alert("Chip Settled Successfully! ");
                window.location.reload();
              }
              else{
                alert("You have entered wrong number...Please Check it!")
              }
            }
          );
        }
      );
    } else {
      this.account.fetchChipSummary(
        "chipSettlementForUser",
        { userid: this.state.userInfo.id, PL_Chips: this.state.settleAmt },
        (data) => {
          this.users.getMyprofile(
            { userName: this.userDetails.userName },
            (udata) => {
              localStorage.setItem("data", JSON.stringify(udata.data));
              if(this.state.settleAmt && parseInt(this.state.settleAmt)){
                alert("Chip Settled Successfully! ");
                window.location.reload();
              }
              else{
                alert("You have entered wrong number...Please Check it!")
              }
            }
          );
        }
      );
    }
  }

  closePopUp() {
    this.setState({
      displayPop: false,
    });
  }

  handleSearchFilter = () => {
    debugger
    console.log(this.state.data)
  }

  render() {
    let totalPlus = 0;
    let totalMinus = 0;
    return (
      <div>
        <Navbar />
        <div className="container body">
          <div className="main_container" id="sticky" style={{ width: "100%" }}>
            <div className="right_col" role="main">
              <div className="col-md-12">
              <div style={{color:'white',backgroundColor:'#6c1945',height:'30px',padding:'5px',paddingLeft:'15px'}}>
              <span>Chip Summary</span>
                <button style={{float:'right',paddingRight:'5px',paddingLeft:'5px', backgroundColor:'#95335c', border:'none', borderRadius:'3px'}}
                onClick={()=>{this.props.history.goBack()}}>Back</button>
              </div>
                <div className="clearfix data-background">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="popup_col_2">
                      {
                      //   <input
                      //   type="text"
                      //   name="searchTerm"
                      //   id="searchTerm"
                      //   className="form-control"
                      //   placeholder="Search by Name"
                      // />
                    }
                      <input
                        type="hidden"
                        name="userType"
                        id="userType"
                        value="2"
                      />
                      <input
                        type="hidden"
                        name="userID"
                        id="userID"
                        value="145315"
                      />
                    </div>
                    {
                      // <div className="popup_col_3">
                        // <button
                      //   type="submit"
                      //   style={{ marginRight: "5px" }}
                      //   name="submit"
                      //   id="FilterData"
                      //   className="blue_button"
                      //   onclick={this.handleSearchFilter}
                      // >
                      //   Search
                      // </button>
                      // <button
                      //   type="button"
                      //   style={{ marginLeft: "5px" }}
                      //   name="submit"
                      //   id="ClearFilterData"
                      //   className="red_button"
                      // >
                      //   Clear
                      // </button>
                      // </div>
                    }
                    <div className="popup_col_2"></div>
                  </div>

                  <div id="divLoading"></div>

                  <div className="col-md-6 col-sm-6 green_table">
                    <div className="link">PLUS ACCOUNT</div>
                    <div className="main_gre-red">
                      <table
                        className="table table-striped jambo_table bulk_action"
                        id=""
                      >
                        <thead>
                          <tr className="headings">
                            <th className="">Name</th>
                            <th className="">Account</th>
                            <th className="">Chips</th>
                            <th className=""></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.plusAccounts.length > 0
                            ? this.state.plusAccounts.map((item) => {
                                totalPlus = totalPlus + item.profitLossChips;
                                return (
                                  <tr id="user_row_152052">
                                    <td className=" ">{item.Name} </td>
                                    <td className="acco">
                                      <a
                                        href="javascript:void(0)"
                                        onclick="getuserchipp(152052,3)"
                                      >
                                        {item.userName}
                                      </a>
                                    </td>{" "}
                                    <td className=" ">
                                      {item.profitLossChips}
                                    </td>
                                    <td className=" ">
                                      <a
                                      style={{margin:'5px'}}
                                        className="btn btn-xs btn-primary"
                                        href={"cacstatement/" + item.userName}
                                      >
                                        <i aria-hidden="true">History</i>
                                      </a>
                                      <a
                                      style={{margin:'5px'}}
                                        className="btn btn-xs btn-danger"
                                        href="javascript:;"
                                        title="Close Settlement"
                                        onClick={() =>
                                          this.submitClearChip(item)
                                        }
                                      >
                                        <i aria-hidden="true">Settlement</i>
                                      </a>
                                    </td>
                                  </tr>
                                );
                              })
                            : ""}

                          <tr id="user_row_">
                            <td className=""></td>
                            <td className="acco ">Own comm</td>{" "}
                            <td className=" ">0</td>
                            <td className=" "></td>
                          </tr>
                          <tr id="user_row_">
                            <td className=""></td>
                            <td className="acco ">Cash</td>{" "}
                            <td className=" ">0</td>
                            <td className=" "></td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td> Total</td>
                            <td></td>
                            <td> {totalPlus} </td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 red_table">
                    <div className="link minus">MINUS ACCOUNT</div>
                    <div className="main_gre-red">
                      <table
                        className="table table-striped jambo_table bulk_action"
                        id=""
                      >
                        <thead>
                          <tr className="headings">
                            <th className="">Name</th>
                            <th className="">Account</th>
                            <th className="">Chips</th>
                            <th className=""></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.minusAccounts.length > 0
                            ? this.state.minusAccounts.map((item) => {
                                totalMinus = totalMinus + item.profitLossChips;
                                return (
                                  <tr id="user_row_152052">
                                    <td className=" ">{item.Name} </td>
                                    <td className="acco">
                                      <a
                                        href="javascript:void(0)"
                                        onclick="getuserchipp(152052,3)"
                                      >
                                        {item.userName}{" "}
                                      </a>
                                    </td>{" "}
                                    <td className=" ">
                                      {item.profitLossChips}{" "}
                                    </td>
                                    <td className=" ">
                                      <a
                                      style={{margin:'5px'}}
                                        className="btn btn-xs btn-primary"
                                        href={"cacstatement/" + item.userName}
                                      >
                                        <i aria-hidden="true">History</i>
                                      </a>
                                      <a
                                      style={{margin:'5px'}}

                                        className="btn btn-xs btn-danger"
                                        href="javascript:;"
                                        title="Close Settlement"
                                        onClick={() =>
                                          this.submitClearChip(item)
                                        }
                                      >
                                        <i aria-hidden="true">Settlement</i>
                                      </a>
                                    </td>
                                  </tr>
                                );
                              })
                            : ""}
                          <tr id="user_row_">
                            <td className=" "> </td>
                            <td className=" acco">Parent comm</td>{" "}
                            <td className=" ">0 </td>
                            <td className=" "></td>
                          </tr>
                          <tr id="user_row_">
                            <td className=" "> </td>
                            <td className=" acco">Parent A/C</td>{" "}
                            <td className=" ">
                              {this.userDetails.profitLossChips}{" "}
                            </td>
                            <td className=" "></td>
                          </tr>
                          <tr id="user_row_">
                            <td className=" "> </td>
                            <td className=" acco">Own</td>{" "}
                            <td className=" ">0.00 </td>
                            <td className=" "></td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td> Total</td>
                            <td></td>
                            <td> {totalMinus}</td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="settlementpopup"
              className="modal fade in"
              role="dialog"
              style={
                this.state.displayPop
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="popup_form">
                    <div className="title_popup">
                      <span id="tital_change">
                        User Name {this.state.userInfo.userName} ||{" "}
                        {this.state.userInfo.profitLossChips}
                      </span>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={() => this.closePopUp()}
                      >
                        <div className="close_new">
                          <i className="fa fa-times-circle"></i>
                        </div>
                      </button>
                    </div>
                    <div className="content_popup">
                      <div className="popup_form_row">
                        <div className="popup_col_6">
                          <label for="email">Chips :</label>
                          <input
                            type="text"
                            name="settleAmt"
                            onChange={(e) => this.handleChange(e)}
                            defaultValue={this.state.userInfo.profitLossChips}
                            className="form-control"
                            id="Chips"
                          />
                          <span id="Name1N" className="errmsg"></span>
                        </div>
                        <div className="popup_col_6">
                          <label for="pwd">Remark:</label>
                          <input
                            type="text"
                            name="Value1"
                            className="form-control"
                            id="Narration"
                            onChange={(e)=>this.handleChange(e)}
                          />
                          <span id="Value1N" className="errmsg"></span>
                        </div>
                        <div className="popup_col_12">
                          <button
                          style={{marginRight:"15px"}}
                            type="button"
                            className="btn btn-success"
                            id="saveSettelment"
                            onClick={() => this.saveSettelment()}
                          >
                            Save
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
        <Footer/>
      </div>
    );
  }
}

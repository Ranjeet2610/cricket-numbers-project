import React, { Component } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Account from "../Services/account";
import Footer from './footer'


export default class ProfitLoss extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      ispl: false,
      showbetData: '',
      from_date: '',
      to_date: '',
      searchTerm:'',
      currentDate: ''
    }
    this.account = new Account();
    this.userDetails = "";
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: [event.target.value]
    })
  }

  handleFilter =  (e) => {
    let fD =  this.state.from_date
    let tD =  this.state.to_date
    if (fD <= tD) {
      if (this.userDetails.superAdmin) {
        this.account.superAdminProfitAndLoss({ userName: this.props.match.params.username ? this.props.match.params.username : JSON.parse(localStorage.getItem('data')).userName }, data => {
          this.setState({
            data: data.data
          });
        });
      }
      else if (this.userDetails.Admin) {
        this.account.adminProfitAndLoss({ adminName: this.props.match.params.username ? this.props.match.params.username : JSON.parse(localStorage.getItem('data')).userName }, data => {
          this.setState({
            data: data.data
          });
        });
      }
      else if (this.userDetails.Master) {
        this.account.masterProfitAndLoss({ masterName: this.props.match.params.username ? this.props.match.params.username : JSON.parse(localStorage.getItem('data')).userName }, data => {
          this.setState({
            data: data.data
          });
        });
      }
      else {
        this.account.getprofitloss({ date1: fD, date2: tD, userName: this.props.match.params.username ? this.props.match.params.username : JSON.parse(localStorage.getItem('data')).userName }, data => {
          this.setState({
            data: data.data
          });
  
        });
      }
    }

  };


  componentDidMount() {
 
    var date1 = new Date();
    var res1 = date1.toISOString().substring(0, 10);
    var date2 = new Date();
    var res2 = date2.toISOString().substring(0, 10);

    // console.log(res1,res2);
    this.userDetails = JSON.parse(localStorage.getItem('data'));
    if (this.userDetails.superAdmin) {
      this.account.superAdminProfitAndLoss({date1: res1, date2: res2, userName: this.props.match.params.username ? this.props.match.params.username : JSON.parse(localStorage.getItem('data')).userName }, data => {
        this.setState({
          data: data.data
        });
      });
    }
    else if (this.userDetails.Admin) {
      this.account.adminProfitAndLoss({ date1: res1, date2: res2,adminName: this.props.match.params.username ? this.props.match.params.username : JSON.parse(localStorage.getItem('data')).userName }, data => {
        this.setState({
          data: data.data
        });
      });
    }
    else if (this.userDetails.Master) {
      this.account.masterProfitAndLoss({ date1: res1, date2: res2,masterName: this.props.match.params.username ? this.props.match.params.username : JSON.parse(localStorage.getItem('data')).userName }, data => {
        this.setState({
          data: data.data
        });
      });
    }
    else {
      this.account.getprofitloss({ date1: res1, date2: res2, userName: this.props.match.params.username ? this.props.match.params.username : JSON.parse(localStorage.getItem('data')).userName }, data => {
        console.log(this.state.data)
        this.setState({
          data: data.data
        });

      });
    }
    // }
    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substr(0,10);
   this.setState({
      currentDate:date
     }) 
  }

  goBack() {
    this.setState({
      ispl: false
    });
  }
  showBet(data) {
    this.setState({
      showbetData: data,
    });
    this.setState({
      ispl: true,
    });
  }
  render() {
    let displaydata;
    let i = 0;
    let totalPL = 0;
    let displayhistory;
    let j = 0;
    if (this.state.data.length > 0) {
      displaydata = this.state.data.map((item) => {
        totalPL += item.ProfitLoss;
        i++;
        return (
          <tr>
            <td className>{i}</td>
            <td className>{item.data[0].description}</td>
            <td className>{item.data[0].marketType}</td>
            <td className>{item.ProfitLoss}</td>
            <td className>0.0</td>
            <td className>{item.data[0].createdDate} </td>
            <td className>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => this.showBet(item.data)}
              >
                Show Bet
              </a>
            </td>
          </tr>
        );
      });
    } else {
      displaydata = (
        <tr>
          <th colspan="8">No record found</th>
        </tr>
      );
    }

    if (this.state.showbetData.length > 0) {
      displayhistory = this.state.showbetData.map((item) => {
        j++;
        return (
          <tr className="mark-back content_user_table  odd" role="row">
            <td className="sorting_1">{j}</td>
            <td className=" ">{item.clientName}</td>
            <td className=" ">
              Cricket&gt;{item.description}&gt;{item.marketType}{" "}
            </td>
            <td className=" ">{item.selection}</td>
            <td className=" ">{item.bettype} </td>
            <td className=" ">{item.odds}</td>
            <td className=" ">{item.stack}</td>
            <td className=" ">{item.createdDate}</td>
            <td className=" ">{item.P_L}</td>
            <td className=" ">{item.profit}</td>
            <td className=" ">{item.liability}</td>
            <td className=" ">{item.status}</td>
            <td className=" ">{item._id} </td>
          </tr>
        );
      });
    } else {
    }
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="container body">
          <div className="main_container" id="sticky">
            {this.state.ispl ? (
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="clearfix data-background">
                    <div className="col-md-12">
                      <div className="title_new_at">
                        {" "}
                        Show Bet History{" "}
                        <button
                          className="btn btn-xs btn-primary v float-right"
                          onClick={() => this.goBack()}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                    <div className="custom-scroll appendAjaxTbl data-background">
                      <table
                        className="table table-striped jambo_table bulk_action dataTable no-footer"
                        id="datatable"
                        role="grid"
                        aria-describedby="datatable_info"
                      >
                        <thead>
                          <tr className="headings" role="row">
                            <th
                              className="sorting_asc"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-sort="ascending"
                              aria-label="S.No. : activate to sort column descending"
                            >
                              S.No.{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="User Name : activate to sort column ascending"
                            >
                              User Name{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Description : activate to sort column ascending"
                            >
                              Description{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="selectionName : activate to sort column ascending"
                            >
                              selectionName{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Type : activate to sort column ascending"
                            >
                              Type{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Odds : activate to sort column ascending"
                            >
                              Odds{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Stack : activate to sort column ascending"
                            >
                              Stack{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Date : activate to sort column ascending"
                            >
                              Date{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="P_L : activate to sort column ascending"
                            >
                              P_L{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Profit : activate to sort column ascending"
                            >
                              Profit{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Liability : activate to sort column ascending"
                            >
                              Liability{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="STATUS : activate to sort column ascending"
                            >
                              STATUS{" "}
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Bet Code : activate to sort column ascending"
                            >
                              Bet Code{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>{displayhistory}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="right_col" role="main">
                <div className="col-md-12">
                  <div className="title_new_at">
                    {" "}
                    Profit Loss Listing
                    <select
                      style={{ color: "black", marginLeft:'2px' }}
                      onchange="perPage(this.value)"
                    >
                      <option value={10} selected>
                        10
                      </option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <button
                    style={{float:'right',paddingRight:'5px',paddingLeft:'5px', backgroundColor:'#6c1945', border:'none', borderRadius:'3px', marginTop:'3px' }}
                    onClick={()=>{this.props.history.goBack()}}>Back</button>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="filter_page data-background">
                    <input
                      type="hidden"
                      name="ajaxUrl"
                      id="ajaxUrl"
                      defaultValue="Cprofitloss"
                    />
                    <form
                      id="formSubmit"
                      className="form-horizontal form-label-left input_mask"
                    >
                      <div className="col-md-3 col-xs-6">
                        <input
                          type="hidden"
                          name="user_id"
                          defaultValue={145315}
                        />
                        <input
                          type="hidden"
                          name="perpage"
                          id="perpage"
                          defaultValue={10}
                        />
                        <select className="form-control" name="sportid">
                          <option value={5} selected>
                            All
                          </option>
                          <option value={4}>Cricket</option>
                          <option value={1}>Soccer</option>
                          <option value={2}>Tennis</option>
                          <option value={11}>Live teenpatti</option>
                          <option value={12}>Live Casino</option>
                          <option value={0}>Fancy</option>
                        </select>
                      </div>

                      <div className="col-md-2 col-xs-6">
                        <input
                          type="date"
                          onChange={this.handleChange}
                          name="from_date"
                          defaultValue={this.state.currentDate}
                          id="from-date"
                          className="form-control col-md-7 col-xs-12 has-feedback-left"
                          placeholder="From date"
                          autoComplete="off"
                        />
                      </div>
                      <div className="col-md-2 col-xs-6">
                        <input
                          type="date"
                          onChange={this.handleChange}
                          name="to_date"
                          defaultValue={this.state.currentDate}
                          id="to-date"
                          className="form-control col-md-7 col-xs-12 has-feedback-left"
                          placeholder="To date"
                          autoComplete="off"
                        />
                      </div>

                      <div className="col-md-2 col-xs-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Via event name"
                          name="searchTerm"
                          value={this.state.searchTerm}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-3 col-xs-12">
                        <button
                          type="submit"
                          className="blue_button"
                          style={{ marginRight: "5px" }}
                          id="submit_form_button"
                          value="filter"
                          onClick={this.handleFilter}
                        >
                          Filter
                        </button>
                        <button 
                          type="button" 
                          className="red_button"
                          onClick={this.handleClear}
                        >
                          Clear
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div id="divLoading"> </div>
                  {/*Loading className */}
                  <div className="custom-scroll appendAjaxTbl data-background">
                    <table className="table table-striped jambo_table bulk_action">
                      <thead>
                        <tr className="headings">
                          <th className>S.No.</th>
                          <th className>Event&nbsp;Name</th>
                          <th className>Market</th>
                          <th className>P_L</th>
                          <th className>Commission</th>
                          <th className>Created&nbsp;On</th>
                          <th className>Action</th>
                        </tr>
                      </thead>
                      <tbody>{displaydata}</tbody>
                    </table>
                    <table className="table table-striped jambo_table bulk_action">
                      <thead>
                        <tr className=" ">
                          <th className>(Total P &amp; L ) {totalPL}</th>
                          <th className>(Total Commition) 0</th>
                        </tr>
                      </thead>
                    </table>
                    <p>Showing 1 to 0 of 0 entries </p>{" "}
                    <p
                      id="paginateClick"
                      className="pagination-row dataTables_paginate paging_simple_numbers"
                    >
                      {" "}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>{" "}
        <Footer />
      </div>
    );
  }
}

import React, { Component } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./footer";
import Account from "../Services/account";
export default class Acinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      userDetails: "",
      upsDownDetails: "",
    };
    this.account = new Account();
  }

  componentDidMount() {
    this.setState({
      userDetails: JSON.parse(localStorage.getItem("data")),
    });
    if (JSON.parse(localStorage.getItem("data")).superAdmin) {
      this.account.superAdminUpDown(
        { userName: JSON.parse(localStorage.getItem("data")).userName },
        (data) => {
          this.setState({
            upsDownDetails: data.data,
          });
        }
      );
    } else if (JSON.parse(localStorage.getItem("data")).Admin) {
      this.account.adminUpDown(
        { adminName: JSON.parse(localStorage.getItem("data")).userName },
        (data) => {
          this.setState({
            upsDownDetails: data.data,
          });
        }
      );
    }
  }

  render() {
    let infoDetails;
    if (this.state.userDetails.superAdmin) {
      infoDetails = (
        <tr>
          <td className="green">{this.state.userDetails.profitLossChips}</td>
          <td className=" ">{this.state.userDetails.freeChips}</td>
          <td className=" ">{this.state.userDetails.down}</td>
          <td className=" ">{this.state.userDetails.walletBalance}</td>
          <td className=" ">{this.state.upsDownDetails.up} </td>
          <td className=" ">{this.state.upsDownDetails.down} </td>
        </tr>
      );
    } else if (this.state.userDetails.Admin) {
      infoDetails = (
        <tr>
          <td className="green">{this.state.userDetails.profitLossChips}</td>
          <td className=" ">{this.state.userDetails.freeChips}</td>
          <td className=" ">{this.state.userDetails.down}</td>
          <td className=" ">{this.state.userDetails.walletBalance}</td>
          <td className=" ">{this.state.upsDownDetails.up} </td>
          <td className=" ">{this.state.upsDownDetails.down} </td>
        </tr>
      );
    } 
    else {
      infoDetails = (
        <tr>
          <td className="green">{this.state.userDetails.profitLossChips}</td>
          <td className=" ">{this.state.userDetails.freeChips}</td>
          <td className=" ">{this.state.userDetails.exposure}</td>
          <td className=" ">{this.state.userDetails.walletBalance}</td>
          <td className=" ">0.00 </td>
          <td className=" ">0.00 </td>
        </tr>
      );
    }
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div className="forModal" />{" "}
        <div className="container body">
          <div className="main_container" id="sticky">
            <div className="right_col" role="main">
              <div className="row">
                <div className="col-md-12">
                  <div className="title_new_at"> 
                    <span>Account Info</span>
                    <button style={{float:'right', paddingRight:'5px',paddingLeft:'5px', backgroundColor:'#6c1945', border:'none', borderRadius:'3px'}} 
                    onClick={()=> {this.props.history.goBack()}}>Back</button>
                  </div>
                </div>
                <div className="col-md-12"></div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div id="divLoading"> </div>
                  {/*Loading class */}
                  <div className="table-scroll">
                    <table
                      className="table table-striped jambo_table bulk_action"
                      id=" "
                    >
                      <thead>
                        <tr className="headings">
                          <th className="text-center">Chips</th>
                          <th className="text-center">Free&nbsp;Chips</th>
                          <th className="text-center">Liability </th>
                          <th className="text-center">Wallet </th>
                          <th className="text-center">Up </th>
                          <th className="text-center">Down </th>
                        </tr>
                      </thead>
                      <tbody>{infoDetails}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <Footer />
      </div>
    );
  }
}

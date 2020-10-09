import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Utilities from "./utilities";
import Sidebar from "./Sidebar";
import Footer from "./footer";
import Service from "../Services/Service";
import Modal from 'react-bootstrap/Modal'
import LivEvents from '../Services/livevents'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      data1: "",
      name: "",
      userName: "",
      password: "",
      master: "",
      tenisData: "",
      soccerData: "",
      redirectToReferrer: false,
      odds: "",
      liveEvents: "",
      InitialOdds: {},
    };
    this.service = new Service();
    this.livevents = new LivEvents();
    this.odds = "";
  }

  componentDidMount() {
    this.service.getdashboardData("2", (data) => {
      this.setState({
        tenisData: data,
      });
    });
    this.service.getdashboardData("1", (data) => {
      this.setState({
        soccerData: data,
      });
    });
    let eveodds = [];
    this.service.getLiveEvents((data) => {
      data.data.Data.map((item) => {
        this.service.getEventInitialOdds(item.eventId, (data) => {
          eveodds.push({
            events: item,
            odds: data.data,
          });

          this.setState({
            liveEvents: eveodds,
          });
        });
      });
    });
    // this.livevents.listMarketOdds()
  }

  next(txt, name,date) {
    window.location.href =
      window.location.protocol +
      "//" +
      window.location.host +
      "/matchodds/" +
      txt;
    localStorage.setItem("matchname", JSON.stringify({name:name,date:date}));
  }



  render() {
    // console.log("ddddddddddddddddddddddd    ", this.props)
    let cricdata;
    let tenis;
    let soccer;
    let odsData;
    let eventdata;
    let eventOddsData;
    if (this.state.data.length > 0) {
      cricdata = this.state.data.map((item, i) => {
        return (
          <div id="user_row_" className="sport_row sportrow-4  matchrow-29894585" onclick="MarketSelection('1.171272881','29894585');" title="Match OODS">
            <div className="sport_name">
              <Link onClick={() => this.next(item.event.id, item.event.name)}>
                {item.event.name}{" "}
              </Link>
              <time>
                <i className="fa fa-clock-o" />
                &nbsp;{item.event.openDate}{" "}
              </time>
              <span id="fav29894585">
                <i onclick="FavFunc(29894585,'1.171272881')" className="fa fa-star-o" aria-hidden="true" />
              </span>
            </div>
            <div className="match_status">
              <span className="inplay_txt"> {this.marketCount}</span>{" "}
            </div>
            <div className="match_odds_front">
              <span className="back-cell">{this.marketCount}</span>
              <span className="lay-cell">250</span>
              <span className="back-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className="lay-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className="back-cell">0</span>
              <span className="lay-cell">1.01</span>
            </div>
          </div>
        );
      });
    }
    //Live Events
    if (this.state.liveEvents.length > 0) {
      eventdata = this.state.liveEvents.map((item) => {
        let inplay ;let eventDate;
        if(new Date(item.events.OpenDate).getTime()>new Date().getTime()){
          inplay ='GOING IN-PLAY';
        }
        else{
          inplay = 'IN-PLAY';
        }
         eventDate = Utilities.displayDateTime(item.events.OpenDate);
        return (
          <div>
          <div
            id="user_row_"
            className="sport_row sportrow-4  matchrow-29894585"
            onclick="MarketSelection('1.171272881','29894585');"
            title="Match OODS"
          >
            <div className="sport_name">
              <Link onClick={() => this.next(item.events.eventId, item.events.eventName,item.events.OpenDate) }>
                {item.events.eventName}{" "}
              </Link>
              <time>
                <i className="fa fa-clock-o" />
                &nbsp;{eventDate}{" "}
              </time>
              <span id="fav29894585">
                <i
                  onclick="FavFunc(29894585,'1.171272881')"
                  className="fa fa-star-o"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div className="match_status">
              <span className="inplay_txt"> {inplay}</span>
            </div>
            <div className="match_odds_front">
              <span className="back-cell">{item.odds.odds1}</span>
              <span className="lay-cell">{item.odds.odds2}</span>
              <span className="back-cell">{item.odds.odds3}</span>
              <span className="lay-cell">{item.odds.odds4}</span>
              <span className="back-cell">{item.odds.odds5}</span>
              <span className="lay-cell">{item.odds.odds6}</span>
            </div>
            </div>
              {
                // Modal for Add Balance
              }
              <Modal show={false} onHide={this.handleClose} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Balance
                    </Modal.Title>
                </Modal.Header>
      
                <Modal.Body>
                    <h4>Deposit Chips:</h4>
                    <input type="text" className="form control" /> 
                    <h4>Remark:</h4>
                    <textarea></textarea>
                    <h4>Total Balance:</h4>
                    <input type="text" className="form control" /> 
                </Modal.Body>
      
                <Modal.Footer>
                    <div className="d-flex">  
                        <button>Save</button>
                        <button>Cancel</button>
                    </div>
                </Modal.Footer>
            </Modal>
          </div>
        );
      });
    }
    // if (this.state.soccerData.length > 0) {
    //   soccer = this.state.soccerData.map((item) => {
    //     return (
    //       <div
    //         id="user_row_"
    //         className="sport_row sportrow-4  matchrow-29894585"
    //         onclick="MarketSelection('1.171272881','29894585');"
    //         title="Match OODS"
    //       >
    //         <div className="sport_name">
    //           <Link onClick={() => this.next(item.event.id, item.event.name)}>
    //             {item.event.name}{" "}
    //           </Link>
    //           <time>
    //             <i className="fa fa-clock-o" />
    //             &nbsp;{item.event.openDate}{" "}
    //           </time>
    //           <span id="fav29894585">
    //             <i
    //               onclick="FavFunc(29894585,'1.171272881')"
    //               className="fa fa-star-o"
    //               aria-hidden="true"
    //             />
    //           </span>
    //         </div>
    //         <div className="match_status">
    //           <span className="inplay_txt"> {this.marketCount}</span>{" "}
    //         </div>
    //         <div className="match_odds_front">
    //           <span className="back-cell">{this.marketCount}</span>
    //           <span className="lay-cell">250</span>
    //           <span className="back-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    //           <span className="lay-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    //           <span className="back-cell">0</span>
    //           <span className="lay-cell">1.01</span>
    //         </div>
    //       </div>
    //     );
    //   });
    // }
    // if (this.state.tenisData.length > 0) {
    //   tenis = this.state.tenisData.map((item) => {
    //     return (
    //       <div
    //         id="user_row_"
    //         className="sport_row sportrow-4  matchrow-29894585"
    //         onclick="MarketSelection('1.171272881','29894585');"
    //         title="Match OODS"
    //       >
    //         <div className="sport_name">
    //           <Link onClick={() => this.next(item.event.id, item.event.name)}>
    //             {item.event.name}{" "}
    //           </Link>
    //           <time>
    //             <i className="fa fa-clock-o" />
    //             &nbsp;{item.event.openDate}{" "}
    //           </time>
    //           <span id="fav29894585">
    //             <i
    //               onclick="FavFunc(29894585,'1.171272881')"
    //               className="fa fa-star-o"
    //               aria-hidden="true"
    //             />
    //           </span>
    //         </div>
    //         <div className="match_status">
    //           <span className="inplay_txt"> {this.marketCount}</span>{" "}
    //         </div>
    //         <div className="match_odds_front">
    //           <span className="back-cell">{this.marketCount}</span>
    //           <span className="lay-cell">250</span>
    //           <span className="back-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    //           <span className="lay-cell">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    //           <span className="back-cell">0</span>
    //           <span className="lay-cell">1.01</span>
    //         </div>
    //       </div>
    //     );
    //   });
    // }
    return (
      <div>
        <Navbar />
        <Sidebar />

        

        <div className="forModal" />
        <div className="container body">
          <div className="main_container" id="sticky">
            <div className="right_col" role="main">
              <div className="fullrow tile_count">
                <div className="col-md-8">
                  <div id="UpCommingData">
                    <div
                      className="sport-highlight-content tabs"
                      id="accountView"
                      role="main"
                    >
                      {/*<h2 className="header"><div className="sport-highlight-icon"></div>  <span>Sport Highlights</span> <button className="btn btn-back tbback hidden-lg"> Back</button></h2>*/}
                      <div className="casinobg">
                        <span>
                          <a href="#" className="blinking">
                            {" "}
                            Live games
                          </a>
                        </span>
                      </div>
                      <div className="sports_box hidden-lg">
                        <div className="tittle_sports">
                          <span className="item_sport">
                            {" "}
                            <img src="http://park9.bet/assets/images/trophy-ico.png" />
                          </span>
                          Live Casino Games
                        </div>
                      </div>

                      <div className="matches-all">
                        <span id="msg_error" />
                        <span id="errmsg" />
                        <div className="sports_box">
                          <div className="tittle_sports">
                            <span className="item_sport">
                              {" "}
                              <img src="http://park9.bet/assets/images/cricket-ico.png" />
                            </span>
                            Cricket
                          </div>
                          {/* {cricdata}
                            -----------Live Event-------------- */}
                          {eventdata}
                        </div>
                        {/* Tennis */}
                        <div className="sports_box">
                          <div className="tittle_sports">
                            <span className="item_sport">
                              <img src="http://park9.bet/assets/images/tennis-ico.png" />
                            </span>{" "}
                            Tennis
                          </div>
                          {tenis}
                        </div>
                        {/* Soccer */}
                        <div className="sports_box">
                          <div className="tittle_sports">
                            <span className="item_sport">
                              <img src="http://park9.bet/assets/images/soccer-ico.png" />
                            </span>{" "}
                            Soccer
                          </div>
                          {soccer}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="MatchOddInfo" />
                </div>
                <div className="col-md-4 col-xs-12">
                  <div className="other-items">
                    <div className="balance-box">
                      <div className="panel-heading">
                        <h3 className="bal-tittle">Top Casino Games </h3>
                        <span className="pull-right clickable">
                          <i className="fa fa-chevron-down"></i>
                        </span>
                      </div>
                      <div className="balance-panel-body"></div>
                    </div>
                  </div>

                  <div className="betSlipBox" style={{ display: "none" }}>
                    <div className="betslip-head">
                      <span id="tital_change" className="item">
                        Bet Slip
                      </span>
                      <a
                        href="javascript:;"
                        className="UserChipData"
                        data-toggle="modal"
                        data-target="#addUser"
                        data-backdrop="static"
                        data-keyboard="false"
                      >
                        Edit Stake
                      </a>
                    </div>
                    <div>
                      <div
                        className="betBox border-box"
                        style={{ display: "none" }}
                      >
                        <div className="block_box">
                          <span id="msg_error"></span>
                          <span id="errmsg"></span>
                          <div className="loader" style={{ display: "none" }}>
                            <div className="spinner">
                              <div className="loader-inner box1"></div>
                              <div className="loader-inner box2"></div>
                              <div className="loader-inner box3"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tab_bets">
                        <ul
                          className="nav nav-pills mb-3"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li className="nav-item betdata active-all active">
                            <a
                              className="allbet"
                              href="javascript:void(0);"
                              onclick="getDataByType(this,'4');"
                            >
                              <span className="bet-label">All Bet</span>{" "}
                              <span id="cnt_row">( )</span>
                            </a>
                          </li>
                          <li className="nav-item betdata active-unmatch">
                            <a
                              className="unmatchbet"
                              href="javascript:void(0);"
                              onclick="getDataByType(this,'2');"
                            >
                              <span className="bet-label">UnMatch Bet</span>{" "}
                              <span id="cnt_row1">( ) </span>{" "}
                            </a>
                          </li>
                          <li className="nav-item betdata">
                            <a
                              className="unmatchbet"
                              href="javascript:void(0);"
                              onclick="getDataByType(this,'3');"
                            >
                              <span className="bet-label">Fancy Bet</span>{" "}
                              <span id="cnt_row3">( ) </span>{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="" id="MatchUnMatchBetaData"></div>

                  <div className="" id="getUserPosition"></div>
                </div>
              </div>
            </div>
            {/* /page content */}
            <div id="fancyposition" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="popup_form">
                    <div className="title_popup">
                      <span> Fancy Position</span>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        <div className="close_new">
                          <i className="fa fa-times-circle" />{" "}
                        </div>
                      </button>
                    </div>
                    <div className="content_popup">
                      <div className="popup_form_row">
                        <div className="modal-body" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
            {/*commanpopup*/}
            <div id="commonpopup" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="popup_form">
                    <div className="title_popup">
                      <span>Title Popup</span>
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
                        <div className="modal-body" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*commanpopup*/}{" "}
          </div>
        </div>

       

      </div>
    );
  }
}

export default Dashboard;

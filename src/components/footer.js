import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import  mainLogo from '../betfun-logo.png';
export default class Footer extends Component {
	logout(){
		localStorage.clear();
		window.location.href ='/';
	}
    render() {
        return(  <footer>
            <ul className="menu-links">
              <li className="item"><a href="/dashboard?inplay"><img src="http://park9.bet/assets/images/games-img/inplay.png" /><span>Inplay</span></a></li>
              <li className="item"><a href="javascript:;" className="UserChipData" data-toggle="modal" data-target="#addUser" data-backdrop="static" data-keyboard="false"><img src="http://park9.bet/assets/images/games-img/edit-stake.png" /><span>Edit stake</span></a></li>
              <li className="item"><a href="/dashboard" className="site_title endcooki active"><img src="http://park9.bet/assets/images/games-img/home.png" /></a></li>
              <li className="item"><a href="/bethistory"><img src="http://park9.bet/assets/images/games-img/history.png" /><span>Bet History</span></a></li>
              <li className="item"><a onClick={this.logout}><img src="http://park9.bet/assets/images/games-img/logout.png" /><span>Logout</span></a></li>
            </ul>
          </footer>);
    }
}
import React from "react";
import { Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class AdminDashboard extends React.Component {
  render() {
    return (
      <div className="admin-dashboard">

      <h1 className="admin-dashboard-title"> ADMIN </h1>
        <NavLink to="admin/additem" >
          <button className="admin-dashboard-btn pp" >Publish Post</button>
        </NavLink>

        <NavLink to="admin/requests" >
          <button className="admin-dashboard-btn sr">See Requests</button>
        </NavLink>
        
         <NavLink to="admin/addplayer" >
          <button className="admin-dashboard-btn cp">Add Player</button>
        </NavLink>

      </div>
    );
  }
}

export default AdminDashboard;

import React from 'react';
import { NavLink } from "react-router-dom";

const PageNotFound=()=>{
    return(
        <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>404</h1>
				<h2>Page not found</h2>
			</div>
			<NavLink to='/'>Home</NavLink>
		</div>
	</div>
    )
}

export default PageNotFound;
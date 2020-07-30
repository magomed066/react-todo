import React from "react";
import "../css/app-header.css";

const Header = ({ liked, allItems }) => {
	return (
		<div className='app-header d-flex align-items-center'>
			<h1>Magomed Mamergov</h1>
			<h2>
				{allItems} записей, из них понравилось {liked}
			</h2>
		</div>
	);
};

export default Header;

import React, { Component } from "react";
import "../css/post-status-filter.css";

export default class PostStatusfilter extends Component {
	constructor(props) {
		super(props);
		this.btns = [
			{ name: "all", label: "Все" },
			{ name: "like", label: "Понравилось" },
		];
	}

	render() {
		const buttons = this.btns.map(({ name, label }) => {
			const { filter, onStatusFilter } = this.props;
			const active = filter === name;
			const clazz = active ? "btn-info" : "btn-outline-secondary";
			return (
				<button
					key={name}
					className={`btn ${clazz}`}
					onClick={() => onStatusFilter(name)}>
					{label}
				</button>
			);
		});

		return <div className='btn-group'>{buttons}</div>;
	}
}

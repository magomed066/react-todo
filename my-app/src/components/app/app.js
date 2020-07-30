import React, { Component } from "react";
import Header from "../app-header/";
import PostAddForm from "../post-add-form/";
import PostList from "../post-list/";
import PostStatusFilter from "../post-status-fiter";
import SearchPanel from "../search-panel/";

import nextId from "react-id-generator";

import "../css/app.css";
import "../css/index.css";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{
					label: "Going to learn Ract!",
					important: false,
					like: false,
					id: nextId(),
				},
				{
					label: "That's so good",
					important: false,
					like: false,
					id: nextId(),
				},
				{
					label: "I need a brake...",
					important: false,
					like: false,
					id: nextId(),
				},
			],
			term: "",
			filter: "all",
		};

		this.deletePost = this.deletePost.bind(this);
		this.onAddItem = this.onAddItem.bind(this);
		this.onToggleImportant = this.onToggleImportant.bind(this);
		this.onToggleLiked = this.onToggleLiked.bind(this);
		this.searchPosts = this.searchPosts.bind(this);
		this.onUpdateSearch = this.onUpdateSearch.bind(this);
		this.onStatusFilter = this.onStatusFilter.bind(this);
		this.onToggle = this.onToggle.bind(this);
	}

	deletePost(id) {
		this.setState(({ data }) => {
			const index = data.findIndex((item) => item.id === id);

			const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

			return {
				data: newArr,
			};
		});
	}

	onAddItem(body) {
		const newItem = {
			label: body,
			important: false,
			like: false,
			id: nextId(),
		};

		this.setState(({ data }) => {
			const newArr = [...data, newItem];

			return {
				data: newArr,
			};
		});
	}

	onToggle(data, id, option = "") {
		const index = data.findIndex((item) => item.id === id);

		const old = data[index];
		const newItem = { ...old, [option]: !old[option] };

		const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

		return newArr;
	}

	onToggleImportant(id) {
		this.setState(({ data }) => {
			const newArr = this.onToggle(data, id, "important");

			return {
				data: newArr,
			};
		});
	}

	onToggleLiked(id) {
		this.setState(({ data }) => {
			const newArr = this.onToggle(data, id, "like");

			return {
				data: newArr,
			};
		});
	}

	searchPosts(items, term) {
		if (items.length === 0) {
			return items;
		}

		return items.filter((item) => {
			return item.label.indexOf(term) > -1;
		});
	}

	filterPost(items, filter) {
		if (filter === "like") {
			return items.filter((item) => item.like);
		} else {
			return items;
		}
	}

	onUpdateSearch(term) {
		this.setState({ term });
	}

	onStatusFilter(filter) {
		this.setState({ filter });
	}

	render() {
		const { data, term, filter } = this.state;
		const liked = data.filter((item) => item.like).length;
		const allItems = data.length;

		const visabityPosts = this.filterPost(this.searchPosts(data, term), filter);

		return (
			<div className='app'>
				<Header liked={liked} allItems={allItems} />
				<div className='search-panel d-flex'>
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<PostStatusFilter
						filter={filter}
						onStatusFilter={this.onStatusFilter}
					/>
				</div>
				<PostList
					posts={visabityPosts}
					onDelete={this.deletePost}
					onToggleLiked={this.onToggleLiked}
					onToggleImportant={this.onToggleImportant}
				/>
				<PostAddForm onAddItem={this.onAddItem} />
			</div>
		);
	}
}

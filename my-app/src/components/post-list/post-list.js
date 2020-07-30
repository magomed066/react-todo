import React from "react";

import PostListItem from "../post-list-item";
import "../css/post-list.css";

const postList = ({ posts, onDelete, onToggleLiked, onToggleImportant }) => {
	const filterPosts = posts.filter(
		(item) => Object.keys(item).length !== 0 && typeof item !== "number"
	);

	const elems = filterPosts.map((item) => {
		const { id, ...itemProps } = item;

		return (
			<li key={id} className='list-group-item'>
				<PostListItem
					{...itemProps}
					onDelete={() => onDelete(id)}
					onToggleLiked={() => onToggleLiked(id)}
					onToggleImportant={() => onToggleImportant(id)}
				/>
			</li>
		);
	});

	return <ul className='app-list list-group'>{elems}</ul>;
};

export default postList;

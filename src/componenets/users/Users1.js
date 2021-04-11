import React from 'react'

export const Users1 = ({ users, loading }) => {
	if (loading) {
		return <Spiner />;
	} else {
		return (
			<div style={userStyle}>
				{users.map(user => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	}
}
Users.prototype = {
	users: PropTypes.array.isRequired, 
	loading: PropTypes.bool.isRequired, 
};
const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
};

export default Users;
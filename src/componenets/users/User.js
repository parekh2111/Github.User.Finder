import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



export class User extends Component {
	componentDidMount () {
		this.props.getUser(this.props.match.params.login);
	}
	static propTypes = {
		loading: PropTypes.bool.isRequired,
		user: PropTypes.object.isRequired,
		getUser: PropTypes.func.isRequired
	}

	render () {
		const { name, avatar_url, location, bio, blog, company, login, html_url,
			followers, following, public_repos, public_gists, hireable
		} = this.props.user;

		const { loading } = this.props;
		if (loading) return <Spinner />

		return <Fragment>
			<Link to='/' className="btn btn-light"> Back To Serch</Link>
			Hireable: {''}
			{hireable ? (<i className="fas fa-check text-success" />) : (<i className="fas fa-times-circle text-danger" />)}

			<div className="card grid-2">
				<div className="all-center">
					<img src={avatar_url} className="round-img" alt="" style={{ width: '150px' }} />
					<h1>{name}</h1>
					<p>location:{location}</p>
				</div>
				<div>
					{bio && (<Fragment>
						<h3>Bio</h3>
						<p>{bio}</p>
					</Fragment>)}
					<a href={html_url} className="btn btn-dark my-1">Visits GitHub Profile</a>
					<ul>
						<li>{login && (<Fragment>
							<strong>Username:</strong> {login}
						</Fragment>)}</li>

						<li>{company && (<Fragment>
							<strong>Company:</strong> {company}
						</Fragment>)}</li>

						<li>{blog && (<Fragment>
							<strong>Website:</strong> {blog}
						</Fragment>)}</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary"><strong>Followers: </strong>{followers}</div>
				<div className="badge badge-success"><strong>Following: </strong>{following}</div>
				<div className="badge badge-light"><strong>Public Repos: </strong>{public_repos}</div>
				<div className="badge badge-dark"><strong>Public Gists: </strong>{public_gists}</div>
			</div>
		</Fragment>;
	}
}

export default User

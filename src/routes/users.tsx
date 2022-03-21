import { getJwt } from "../service/jwt"
import { Button } from "@mui/material";
import { useState } from "react";

interface User {
	f_name: string;
	l_name: string;
	email: string;
}
interface Users {
	users: User[]
}

const Users = () => {

	const [ userItems, setUserItems] = useState([]);

	const getData = async () => {
		const url = 'http://localhost:3000/api/v1/users';
		const response = await fetch(url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		});
		const r = await response.json(); // parses JSON response into native JavaScript objects
		return r;
	};

	const handleData = async () => {
		const users = await getData();
		const components = users.map(({ f_name, l_name, email }: User)  => {
			return (
				<div key={email}>
					<p>First: {f_name}</p>
					<p>Last: {l_name}</p>
					<p>Email: {email}</p>
				</div>
			)
		})
		setUserItems(components);
	}



  
  return (
    <div>
      <Button onClick={handleData}>get user data</Button>

			{userItems.length && userItems}
    </div>
  )
}

export default Users